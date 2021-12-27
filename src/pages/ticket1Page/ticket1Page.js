import './profile.scss';
import { machines, directions, states, testTypes } from "./data.js";
import { datapages } from "./structurePages.js"
import {useCallback, useState, useMemo } from "react";
import React from 'react';


import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
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
  StateStoring,
  Form,  
  Popup
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import { SelectBox } from 'devextreme-react/select-box';

const optionDirections = ['auto', 'up', 'down'];

const store = new ArrayStore({
  key: 'name',
  data: machines.TestTypes
});


function App(props) {
  const [data, setData] = React.useState(machines);
  const [objectSidebarDataMachines, setObjectSidebarDataMachines] = React.useState({});
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(-1); 
  const [focusedRowKey, setFocusedRowKey] = React.useState(-1);  
  const [grid, setGrid] = React.useState(null);

  const customizeColumnText = useCallback((cellInfo) => {    
    if (cellInfo.value) {
      
        let cellText = "";
        cellInfo.value.forEach((subject) => {
            cellText += subject.name + ',';
        })
        return cellText.slice(0, cellText.length - 1);
    }
    return cellInfo.valueText;
    }, []);

  const selectionChangedHandler = (e) => {
    setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]) );
    setFocusedRowKey(e.component.getRowIndexByKey(e.selectedRowKeys[0]) );
  };

  const onFocusedRowChanged = (e) => {
    e.row && setObjectSidebarDataMachines(e.row.data);
    localStorage.setItem('focusedMachine', JSON.stringify(e.row.data));
    console.log(objectSidebarDataMachines);
  };

  const openSidebar = () => {
    console.log(focusedRowKey);

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

  return (
    <React.Fragment>
      <div className={'content-block content-overlay'}>
        <div className={'dx-card responsive-paddings'}>
        <DataGrid
          id="grid"
          dataSource={data}
          keyExpr="id"
          ref={(ref) => { setGrid(ref); }}
          showBorders={true}
          // rowAlternationEnabled={true}
          focusedRowEnabled={true}
          onFocusedRowChanged={onFocusedRowChanged}
          onSelectionChanged={selectionChangedHandler}                    
          > 
                
            {/* <StateStoring enabled={true} type="localStorage" storageKey="machines_grid" />   */}
            <FilterRow visible={true} />
            <FilterPanel visible={true} />
            <FilterBuilderPopup position={filterBuilderPopupPosition} />
            <HeaderFilter visible={true} />
            <Selection mode="single" />
            <Editing mode="popup" >
                  <Texts confirmDeleteMessage="are you sure to delete?" />            
            </Editing>  


            {
              datapages.machines.main.map((attribute) => {
                return <Column alignment='left' key={attribute.key ? attribute.key : null} dataField={attribute.dataField} caption={attribute.caption? attribute.caption : attribute.dataField} allowSorting={attribute.allowSorting? attribute.allowSorting : null} customizeText={attribute.customizeColumnText ? attribute.customizeColumnText : null}>
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
            
          {/* <Column dataField="name" caption="Name"  alignment="left"  />
          <Column dataField="kWh_consumption" alignment="left"  />
          
          <Column dataField="year"  dataType="date" alignment="left"  />
          <Column dataField="StateID" caption="Position" alignment="left" >
            <Lookup dataSource={states} valueExpr="ID" displayExpr="Name"  />
          </Column>
          <Column dataField="TestTypes" caption="Test Types" allowSorting={false}  customizeText={customizeColumnText} />
          <Column dataField="ip"  dataType="ip" alignment="left"   /> */}
          
        </DataGrid>

        <SpeedDialAction
          icon="add"
          label="Add row"
          index={1}
          onClick={addRow} 
        />
          <SpeedDialAction
          icon="dashboard"
          label="Open Sidebar"
          index={4}
          visible={selectedRowIndex !== undefined && selectedRowIndex !== -1}
          onClick={openSidebar} 
        />
        <SpeedDialAction
          icon="trash"
          label="Delete row"
          index={3}
          visible={selectedRowIndex !== undefined && selectedRowIndex !== -1}
          onClick={deleteRow} 
        />        
        <SpeedDialAction
          icon="edit"
          label="Edit row"
          index={2}
          visible={selectedRowIndex !== undefined && selectedRowIndex !== -1}
          onClick={editRow} 
        />

        </div>
      </div>

      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <h6>Row index: {selectedRowIndex}</h6>
          <h6>Row focused: {focusedRowKey}</h6>
          {/* <h6>Selected item: {JSON.stringify(objectSidebarData)}</h6> */}
          <h6>{objectSidebarDataMachines.name}</h6>
          <h6>{objectSidebarDataMachines.TestTypes && objectSidebarDataMachines.TestTypes.map((item) => {
            return <p>{item.name}</p>
          })}</h6>
        </div>
      </div>
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
