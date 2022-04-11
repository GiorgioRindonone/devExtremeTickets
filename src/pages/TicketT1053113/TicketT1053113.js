import './Machines.scss';
import { machines, directions, states, testTypes, logs } from "../data.js";
// import HandlerGrid from "../HandlerData.js";
import 'devextreme-react/tag-box'
import {useCallback, useState, useMemo } from "react";
import React from 'react';
import { Button } from "devextreme-react/button";
import TagBoxContent from "../TagBoxContent.js";
import { List } from 'devextreme-react/list';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import {
  TreeList,
  Column as TreeListColumn,
} from 'devextreme-react/tree-list';
import DataGrid, {
  Column, 
  Editing, 
  Lookup, 
  Texts, 
  Selection,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  FilterBuilderPopup,
  SearchPanel,
  StateStoring,
  Form as FormGird,  
  Popup
} from 'devextreme-react/data-grid';
import TabPanel, { Item as ItemPanel } from "devextreme-react/tab-panel";
import { Drawer } from "devextreme-react/drawer";
import Form, { SimpleItem } from "devextreme-react/form";
import TextArea from "devextreme-react/text-area";
import { Item } from 'devextreme-react/form';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import { SelectBox } from 'devextreme-react/select-box';
import { TagBox } from 'devextreme-react/tag-box';


//! toggle render ticket 
import FieldTagbox from './ToggleRender';
const optionDirections = ['auto', 'up', 'down'];

function LogsInfo(item) {
  return (
    <React.Fragment>
      
      <p><b>{item.dateandtime}</b></p>
      <p>{item.message}</p>

    </React.Fragment>
  );
}

const store = new ArrayStore({
  key: 'name',
  data: machines.TestTypes
});


function App(props) {
  const [data, setData] = React.useState(machines);
  const [objectSidebarData, setObjectSidebarData] = React.useState({});
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(-1); 
  const [focusedRowKey, setFocusedRowKey] = React.useState(-1);  
  const [grid, setGrid] = React.useState(null);
  const [sidebar, setSidebar] = React.useState(0);

  const selectionChangedHandler = (e) => {
    setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]) );
    setFocusedRowKey(e.component.getRowIndexByKey(e.selectedRowKeys[0]) );
    sidebar === 0 && setSidebar(500);
  };

  const onFocusedRowChanged = (e) => {
    e.row && setObjectSidebarData(e.row.data);
    // localStorage.setItem('focusedMachine', JSON.stringify(e.row.data));
    console.log(objectSidebarData);
  };

  const openSidebar = () => {
    console.log(focusedRowKey);
    sidebar === 500 ? setSidebar(0) : setSidebar(500);
  };

  const editRow = () => {
    grid.instance.editRow(focusedRowKey);
    grid.instance.deselectAll();
  };

  const deleteRow = () => {
    grid.instance.deleteRow(focusedRowKey);
    grid.instance.deselectAll();
  };

  const addRow = () => {
    grid.instance.addRow();
    grid.instance.deselectAll();
  };

  const notesEditorOptions = { height: 100 };

  function cellTemplate(container, options) {
    const noBreakSpace = '\u00A0';
    const text = (options.value || []).map((element) => options.column.lookup.calculateCellValue(element)).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
  }

  function calculateFilterExpression(filterValue, selectedFilterOperation, target) {
    if (target === 'search' && typeof (filterValue) === 'string') {
      return [this.dataField, 'contains', filterValue];
    }
    return function(data) {
      return (data.TestTypes || []).indexOf(filterValue) !== -1;
    };
  }

  const testTypesEditorOptions = {dataSource: testTypes, valueExpr: 'name', displayExpr: 'Name',  readOnly: true };

  const datapages={
    machines:{
        main:[
            {
                dataField: 'name',
                caption: 'Name',
                dataType: 'object'
            },
            {
                dataField: 'year',
                caption: 'Data di creazione',
                dataType: 'date'
            },
            {
                dataField: 'testId',
                caption: 'Running Test',
                dataType: 'string'
            },
            // {
            //     dataField: 'Location',
            //     caption: 'Location',
            //     dataType: 'string',
            //     lookup: {
            //         dataSource: states,
            //         valueExpr: 'ID',
            //         displayExpr: 'Name',
            //     },
            // },
            {
                dataField: 'ip',
                caption: 'ip',
            }
        ]
    },
    sidebar: {        
        main:[
                {
                    itemPanel: {
                        title: 'Overview',
                        form: {
                            colCount: 2,
                            FormData: objectSidebarData,
                            simpleItem: {
                                dataField: 'name',
                                colSpan: 2,
                                disabled:"true",
                            },
                            simpleItem: {
                                dataField: 'notes',
                                colSpan: 2,
                                disabled:"true",
                            },
                            simpleItem: {
                                dataField: 'year',
                                colSpan: null,
                                disabled:"true",
                            }
                        },
                        textArea: {
                            defaultValue: objectSidebarData.notes,
                            disabled:"true",
                        },
                    },
                }, 
                {
                    itemPanel: {
                        title: 'Stats',
                        textArea: {
                            defaultValue: objectSidebarData.notes,
                            disabled:"true",
                        },
                    },
                },
                {
                        itemPanel: {
                        title: 'Capabilities',
                        textArea: {
                            defaultValue: objectSidebarData.notes,
                            disabled:"true",
                        },
                    },
                },    
                {
                  itemPanel: {
                  title: 'Logs',
                  textArea: {
                      defaultValue: objectSidebarData.notes,
                      disabled:"true",
                  },
              },
          },       

        ]
    }
  };
  

  return (
    <React.Fragment>
      <Drawer
        minSize ={sidebar}
        // opened={true}
        position="right"
        height="100%"
        revealMode="expand"
        openedStateMode="shrink"
        render={() => 
        
          <div className={"content-block-sidebar"}>
          <div className={"sidebar-container"}>
          <div className={"flex-container-sidebar"}>
            <h2>{objectSidebarData.name ? objectSidebarData.name : "Select a machine" }</h2>
            <div className={" flex-container"}>
              <Button           
                icon="trash"
                label="Delete row"
                visible={selectedRowIndex !== undefined && selectedRowIndex !== -1}
                onClick={deleteRow} 
              />
              <Button           
                icon="edit"
                label="Edit row"
                index={2}
                visible={selectedRowIndex !== undefined && selectedRowIndex !== -1}
                onClick={editRow} 
              ></Button>
            </div>
          </div>
          
            <TabPanel className="tabpanel-sidebar">
              <ItemPanel title="Overview">
                <Form colCount={2} formData={objectSidebarData}>
                  <SimpleItem colSpan={2} dataField="name" disabled="true"/>
                  <SimpleItem colSpan={2} dataField="notes"  disabled="true"/>
                  <SimpleItem dataField="year" disabled="true"/>
                  <SimpleItem dataField="kWh_consumption" disabled="true"/>
                  <SimpleItem dataField="port" disabled="true" />
                </Form>
              </ItemPanel>
              <ItemPanel title="Stats">
              </ItemPanel>
              <ItemPanel title="Capabilities">    
                <TagBox dataSource={testTypes} 
                        valueExpr='id' 
                        displayExpr='name' 
                        readOnly={true} 
                        value={objectSidebarData.TestTypes} 
                        fieldRender={FieldTagbox}/>
                        
              </ItemPanel>
              <ItemPanel title="Logs" badge="new">                
                  <List
                    dataSource={logs}
                    searchEnabled={true}
                    height="700"
                    pageLoadMode="scrollBottom"
                    searchMode="contains"
                    searchExpr="message"
                    itemRender={LogsInfo}>                      
                  </List>
                
              </ItemPanel>
            </TabPanel>

            {/* <div className={"flex-container-sidebar-bottom"}> 
             <h2>{objectSidebarData.name ? objectSidebarData.name : "Select a machine" }</h2>
            </div> */}

            
            </div>
          </div>
          }
      >

        <div className={"content-block flex-container"}>
              <h2>Machines</h2>
              <div className={"flex-container"}>
                <Button           
                  icon={sidebar === 500 ? "chevronnext" : "pinright"}
                  label={sidebar === 500 ? "Close sidebar" : "Open sidebar"}
                  onClick={openSidebar} 
                  >   </Button>
                <Button name="Add Row" icon="plus" onClick={addRow}></Button>
                <Button name="notify" icon="menu"></Button>
              </div>
            </div>
            <div className={'content-block content-overlay'}>

        <div className={'dx-card responsive-paddings'}>
        <DataGrid
          id="grid"
          dataSource={data}
          keyExpr="id"
          ref={(ref) => { setGrid(ref); }}
          showBorders={true}
          focusedRowEnabled={true}
          onFocusedRowChanged={onFocusedRowChanged}
          onSelectionChanged={selectionChangedHandler}                    
          > 
                
            <StateStoring enabled={true} type="localStorage" storageKey="machines_grid" />  
            <FilterRow visible={true} />
            <FilterPanel visible={true} />
            <FilterBuilderPopup position={filterBuilderPopupPosition} />
            <HeaderFilter visible={true} />           
            {/* <SearchPanel visible={true} /> */}
            <Selection mode="single" />
            <Editing mode="popup" maxWidth="300px">
                  <Texts confirmDeleteMessage="are you sure to delete?" />            
            </Editing>  

            <Column
              dataField="TestTypes"
              caption="Test Types"
              width={200}
              allowSorting={false}
              editCellComponent={TagBoxContent}
              cellTemplate={cellTemplate}
              calculateFilterExpression={calculateFilterExpression}
              dataType="object">
            <Lookup
              dataSource={testTypes}
              valueExpr="id"
              displayExpr="name"
            />            
            </Column>
            {
              datapages.machines.main.map((attribute) => {
                return <Column alignment='left' dataField={attribute.dataField} caption={attribute.caption? attribute.caption : attribute.dataField} allowSorting={attribute.allowSorting? attribute.allowSorting : null} customizeText={attribute.customizeColumnText ? attribute.customizeColumnText : null} dataType={attribute.dataType ? attribute.dataType : null}>
                          {attribute.lookup? 
                          <Lookup 
                            dataSource={attribute.lookup.dataSource? attribute.lookup.dataSource : null} 
                            valueExpr={attribute.lookup.valueExpr? attribute.lookup.valueExpr : null} 
                            displayExpr={attribute.lookup.displayExpr? attribute.lookup.displayExpr : null}
                          /> :null}
                        </Column>                      
                }
              )
            }
          
        </DataGrid>


        </div>
      </div>

      
      </Drawer>
    </React.Fragment>
  );
}

const filterBuilderPopupPosition = {
  of: window,
  at: "top",
  my: "top",
  offset: { y: 10 },
};

export default App;





