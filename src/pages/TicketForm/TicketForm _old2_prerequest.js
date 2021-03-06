import React, { useMemo, useReducer, useCallback, useState, } from 'react';

import { machines, directions, states, testTypes, person } from "../data.js";

// import handlerGrid from "../handlerData.js";
import "devextreme-react/tag-box";
import { Button } from "devextreme-react/button";
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

//UPDATES 
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import { Form, SimpleItem } from 'devextreme-react/form';
import { RequiredRule, } from 'devextreme-react/validator';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

//! FORM PERSONALIZED UPDATE
// import PopupForm from "./PopupForm.js";

//! REDUCER AND CONTEXT UPDATE
import { CustomContext, editDataReducer } from "../../utils/editFormState.js";

//! POP UP NEW TEST


// UPDATE CREATESTORE SECTION
const key = "id";
const customerStore = new ArrayStore({
  data: person,
  key: key
}),
  gridSource = new DataSource({
    store: customerStore
  })

// UPDATE REF FORM SECTION
const formRef = React.createRef(),
  getForm = () => {
    return formRef.current.instance;
  }

const initPopupState = {
  formData: {},
  popupVisible: false,
  popupMode: ""
}

const testTypesEditorOptions = {
  dataSource: testTypes,
  valueExpr: "name",
  displayExpr: "Name",
  readOnly: true,
};

// Function to get the full name of the person in column
const getFullName = (row) => {
  return `${row.firstName} ${row.lastName}`;
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

function App(props) {

  const [data, setData] = React.useState(testTypes);
  const [objectSidebarData, setObjectSidebarData] = React.useReducer(editDataReducer, {});
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(-1);
  // const [focusedRowKey, setFocusedRowKey] = React.useState(-1);
  const [grid, setGrid] = React.useState(null);
  const [sidebar, setSidebar] = React.useState(0);

  // REDUCER POPUP UPDATE
  const [{ formData, popupVisible, popupMode }, dispatchPopup] = useReducer(popupReducer, initPopupState);


  // SELECTION HANDLERS
  const selectionChangedHandler = useCallback((e) => {
    setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
    sidebar === 0 && setSidebar(500);
  }, [setSelectedRowIndex, sidebar]);

  const onFocusedRowChanged = useCallback((e) => {
    e.row && setObjectSidebarData({ value: e.row.data, type: 'change' });
    // localStorage.setItem('focusedMachine', JSON.stringify(e.row.data));
    console.log(objectSidebarData);
  }, [objectSidebarData, setObjectSidebarData]);




  // POPOUP SECTION 
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = useCallback(() => {
    setPopupVisibility(!isPopupVisible);
  }, [isPopupVisible]);

  const initialState = {
    objectSidebarData,
    selectedRowIndex,
    togglePopup,
    setObjectSidebarData
  }

  // UPDATE POPUP 
  function cancelClick(e) {
    dispatchPopup({ type: "hidePopup" })
  }

  function showPopup(popupMode, data) {
    dispatchPopup({ type: "initPopup", data, popupMode })
  }

  function onHiding() {
    dispatchPopup({ type: "hidePopup" });
  }

  function confirmClick(e) {
    let result = getForm().validate();
    if (result.isValid) {
      if (popupMode === "Add")
        customerStore.push([{ type: "insert", data: formData }]);
      else if (popupMode === "Edit")
        customerStore.push([{ type: "update", data: formData, key: formData[key] }]);

      dispatchPopup({ type: "hidePopup" })
      gridSource.reload();
    }
  }

  const confirmBtnOptions = useMemo(() => {
    console.log("updated confirmbtnOptions")
    return {
      text: 'Confirm',
      type: 'success',
      onClick: confirmClick
    }
  }, [formData]);

  const cancelBtnOptions = useMemo(() => {
    return {
      text: 'Cancel',
      onClick: cancelClick
    }
  }, []);


  // CRUD grid buttons
  const openSidebar = () => {
    console.log(selectedRowIndex);
    sidebar === 500 ? setSidebar(0) : setSidebar(500);
  };

  const editRow = () => {
    grid.instance.editRow(selectedRowIndex);
    grid.instance.deselectAll();
  };

  const deleteRow = () => {
    grid.instance.deleteRow(selectedRowIndex);
    grid.instance.deselectAll();
  };

  const addRow = () => {
    grid.instance.addRow();
    grid.instance.deselectAll();
  };

  return (
    <React.Fragment>
      <div className={"content-block flex-container"}>
        <h2>Machines</h2>
        <div className={"flex-container-row"}>
          <div className={"flex-container-column"}>
            <p> add row </p>
            <Button name="Add Row" icon="plus" onClick={addRow}></Button>

          </div>
          <div className={"flex-container-column"}>
            <p> delete row</p>
            <Button name="Add Row" icon="delete" onClick={deleteRow}></Button>

          </div>
          <div className={"flex-container-column"}>
            <p> Open\close popup </p>
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
          <CustomContext.Provider value={initialState} >
            <div>
              {/* OLD POPUP */}
              {/* <Popup
                title="Add new test Type"
                showTitle={true}
                contentComponent={PopupForm}
                visible={isPopupVisible}
                width={500}
              /> */}
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
              <Editing 
                mode="popup"
                maxWidth="300px" 
                // allowUpdating={true}
                // allowAdding={true}
                // allowDeleting={true}
                useIcons={true}
              >
                <Texts confirmDeleteMessage="are you sure to delete?" />
              </Editing>
              {datapages.machines.main.map((attribute, index) => {
                return (
                  <Column
                    alignment="left"
                    key={attribute.dataField ? attribute.dataField : `key_${index}`}
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
            <Popup
              title={popupMode}
              closeOnOutsideClick={true}
              visible={popupVisible}
              onHiding={onHiding}>
              <ToolbarItem
                widget="dxButton"
                location="after"
                toolbar="bottom"
                options={confirmBtnOptions}
              />
              <ToolbarItem
                widget="dxButton"
                location="after"
                toolbar="bottom"
                options={cancelBtnOptions}
              />
              <Form
                ref={formRef}
                formData={formData}
                labelLocation="top"
                showColonAfterLabel={true}
              // colCountByScreen={colCountByScreen}
              >
                <SimpleItem dataField="id">
                  <RequiredRule />
                </SimpleItem>
                <SimpleItem dataField="name">
                  <RequiredRule />
                </SimpleItem>
                <SimpleItem dataField="description">
                  <RequiredRule />
                </SimpleItem>
              </Form>
            </Popup>
          </CustomContext.Provider>
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

function popupReducer(state, action) {
  switch (action.type) {
    case "initPopup":
      return {
        formData: action.data,
        popupVisible: true,
        popupMode: action.popupMode
      }
    case "hidePopup":
      return {
        popupVisible: false
      }
    default:
      break;
  }
}

export default App;


