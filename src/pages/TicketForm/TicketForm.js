import { machines, directions, states, testTypes, person } from "../data.js";
import handlerGrid from "../HandlerData.js";
import "devextreme-react/tag-box";
import { useCallback, useState, useMemo } from "react";
import React from "react";

import { Button } from "devextreme-react/button";
import TagBoxContent from "../TagBoxContent.js";
import { List } from "devextreme-react/list";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import config from "devextreme/core/config";
import repaintFloatingActionButton from "devextreme/ui/speed_dial_action/repaint_floating_action_button";
import { TreeList, Column as TreeListColumn } from "devextreme-react/tree-list";
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
  Popup as PopupGrid,
} from "devextreme-react/data-grid";
import {
    Popup
  } from 'devextreme-react/popup';
import TabPanel, { Item as ItemPanel } from "devextreme-react/tab-panel";
import { Drawer } from "devextreme-react/drawer";
import Form, { SimpleItem } from "devextreme-react/form";
import TextArea from "devextreme-react/text-area";
import { Item } from "devextreme-react/form";
import { SpeedDialAction } from "devextreme-react/speed-dial-action";
import { SelectBox } from "devextreme-react/select-box";
import { TagBox } from "devextreme-react/tag-box";

function App(props) {
  const [data, setData] = React.useState(testTypes);
  const [objectSidebarData, setObjectSidebarData] = React.useState({});
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(-1);
  const [focusedRowKey, setFocusedRowKey] = React.useState(-1);
  const [grid, setGrid] = React.useState(null);
  const [sidebar, setSidebar] = React.useState(0);

  const selectionChangedHandler = (e) => {
    setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
    setFocusedRowKey(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
    sidebar === 0 && setSidebar(500);
  };

  //! POPOUP SECTION 

  const [isPopupVisible, setPopupVisibility] = useState(false);
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const popUpForm = () => {
    return (
        <div>
                    <Button name="notify" icon="menu" onClick={togglePopup}></Button>

            <Form colCount={4} formData={objectSidebarData}>
                <SimpleItem dataField="id" colSpan={1} />
                <SimpleItem dataField="name" colSpan={2} />
                <SimpleItem dataField="description" colSpan={3} />

            </Form>

        </div>
    );
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
    const noBreakSpace = "\u00A0";
    const text = (options.value || [])
      .map((element) => options.column.lookup.calculateCellValue(element))
      .join(", ");
    container.textContent = text || noBreakSpace;
    container.title = text;
  }

  const getFullName = (row) => {
    return `${row.firstName} ${row.lastName}`;
  };

  function calculateFilterExpression(
    filterValue,
    selectedFilterOperation,
    target
  ) {
    if (target === "search" && typeof filterValue === "string") {
      return [this.dataField, "contains", filterValue];
    }
    return function (data) {
      return (data.TestTypes || []).indexOf(filterValue) !== -1;
    };
  }

  const testTypesEditorOptions = {
    dataSource: testTypes,
    valueExpr: "name",
    displayExpr: "Name",
    readOnly: true,
  };

  const datapages = {
    machines: {
      main: [
        {
          dataField: "name",
          caption: "Name",
          dataType: "string",
        },
        {
          dataField: "outdoor",
          caption: "Outdoor",
          dataType: "boolean",
        },
        {
          dataField: "description",
          caption: "Descrizione",
          dataType: "string",
        },
        {
          dataField: "createdBy",
          caption: "Creato da",
          dataType: "string",
          lookup: {
            dataSource: person,
            valueExpr: "id",
            displayExpr: getFullName,
          },
        },
        {
          dataField: "enabled",
          caption: "Abilitato",
          dataType: "boolean",
        },
      ],
    },
  };

  return (
    <React.Fragment>
      <div className={"content-block flex-container"}>
        <h2>Machines</h2>
        <div className={"flex-container-row"}>
        <div className={"flex-container-column"}>
        <p> open sidebar </p>
          <Button
            icon={sidebar === 500 ? "chevronnext" : "pinright"}
            label={sidebar === 500 ? "Close sidebar" : "Open sidebar"}
            onClick={openSidebar}
          ></Button>
        </div>
        <div className={"flex-container-column"}>
        <p> add row </p>
        <Button name="Add Row" icon="plus" onClick={addRow}></Button>

        </div>
          <div className={"flex-container-column"}>
        <p> delete row</p>
        <Button name="Add Row" icon="delete" onClick={deleteRow}></Button>

        </div>
          <div className={"flex-container-column"}>
        <p> close popup </p>
        <Button name="notify" icon="menu" onClick={togglePopup}></Button>

        </div>
        <div className={"flex-container-column"}>
        <p> edit row </p>
        <Button name="Add Row" icon="edit" onClick={editRow}></Button>

        </div>


        </div>
      </div>
      <div className={"content-block content-overlay"}>
        <div className={"dx-card responsive-paddings"}>
            <div>
                <Popup
                    title="Add new test Type"
                    showTitle={true}
                    contentRender={popUpForm}
                    visible={isPopupVisible}
                    width={500}
                    // closeOnOutsideClick={true}
                />
            </div>
          <DataGrid
            id="grid"
            dataSource={data}
            keyExpr="id"
            ref={(ref) => {
              setGrid(ref);
            }}
            showBorders={true}
            focusedRowEnabled={true}
            onFocusedRowChanged={onFocusedRowChanged}
            onSelectionChanged={selectionChangedHandler}
            
          >
            <StateStoring
              enabled={true}
              type="localStorage"
              storageKey="machines_grid"
            />

            <FilterRow visible={true} />
            <FilterPanel visible={true} />
            <FilterBuilderPopup position={filterBuilderPopupPosition} />
            <HeaderFilter visible={true} />
            <SearchPanel visible={true} />
            <Selection mode="single" />
            <Editing mode="popup" maxWidth="300px" >
              <Texts confirmDeleteMessage="are you sure to delete?" />
            </Editing>            
            {datapages.machines.main.map((attribute) => {
              return (
                <Column
                  alignment="left"
                  dataField={attribute.dataField}
                  caption={
                    attribute.caption ? attribute.caption : attribute.dataField
                  }
                  allowSorting={
                    attribute.allowSorting ? attribute.allowSorting : null
                  }
                  customizeText={
                    attribute.customizeColumnText
                      ? attribute.customizeColumnText
                      : null
                  }
                  dataType={attribute.dataType ? attribute.dataType : null}
                >
                  {attribute.lookup ? (
                    <Lookup
                      dataSource={
                        attribute.lookup.dataSource
                          ? attribute.lookup.dataSource
                          : null
                      }
                      valueExpr={
                        attribute.lookup.valueExpr
                          ? attribute.lookup.valueExpr
                          : null
                      }
                      displayExpr={
                        attribute.lookup.displayExpr
                          ? attribute.lookup.displayExpr
                          : null
                      }
                    />
                  ) : null}
                </Column>
              );
            })}
          </DataGrid>
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
