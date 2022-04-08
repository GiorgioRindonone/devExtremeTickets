/* 1. React import statement and standard module dependencies */
import React, { useCallback, useState, useMemo, useEffect, useRef, useReducer } from "react";
import 'whatwg-fetch';

/* 2. Standard module dependencies in brackets */
import axios from 'axios';

// import { useSidebarProvider } from "../../contexts/sidebardata.js";

/* 3. Third party dependencies */
import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from "devextreme/data/data_source";
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import 'devextreme-react/tag-box'
import 'devextreme-react/text-area';

/* 4. Third party dependencies in brackets */
import Autocomplete from "devextreme/ui/autocomplete";
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import { Switch } from 'devextreme-react/switch';
import { TagBox } from 'devextreme-react/tag-box';
import { Button } from "devextreme-react/button";
import { List } from 'devextreme-react/list';
import { TreeList, Column as TreeListColumn } from 'devextreme-react/tree-list';
import DataGrid, {
  MasterDetail, Scrolling, Pager, Paging, RemoteOperations, Column, Editing, Lookup, Texts, Selection, FilterRow, HeaderFilter, FilterPanel, FilterBuilderPopup, SearchPanel, StateStoring, Form, Toolbar,
  Item as ItemGrid,
} from 'devextreme-react/data-grid';
import TabPanel, { Item as ItemPanel } from "devextreme-react/tab-panel";
import { Drawer } from "devextreme-react/drawer";
import { GroupItem, SimpleItem, EmptyItem, Item, RequiredRule, PatternRule, Label, TabbedItem, TabPanelOptions, Tab } from "devextreme-react/form";
import { Form as FormForm } from "devextreme-react/form";
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import TextArea from "devextreme-react/text-area";
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import { SelectBox } from 'devextreme-react/select-box';
import { FieldTagbox } from "../FieldTagbox.js";
/* 5. Internal component imports */
import Sidebar from "../../components/sidebar/sidebar.js";
/* 6. Internal components in brackets */
import {
  storeCatalogues,
  storeTires,
  storeContacts,
  storeNominalRims,
  storeTreadTypes,
  storeSizes,
  storeApplications,
  storeBrands,
  storeProducts,
  storeCompanies,
  storeSampleTires,
  storeSampleTypes
} from "../../stores/storesDevextreme.js";


/* 7. Internal functions imports in brackets */

// import {URL} from "../../api/apiManager.js";
import { initPopupState, popupReducer, formRef, getForm, formRefSide, getFormSide } from "../../redux-store/reducers/popupForm.js";
import { getObject, postObject, patchObject, deleteObject, getByKeyObject, getByKeyObjects } from "../../api/apiManager.js";
import { timeConverter } from "../../utils/handler-functions.js";

/* 8. Internal global variables imports in brackets */
import SampleTiresTemplate from "./SampleTires/SampleTires.js";
/* 9. Internal components within same folder (Relative imports) */
import { getGridStructure } from "./GridStructure.js";

/* 10. Stylesheet import */
import './Tires.scss';

/* 11. Data import */
// import service from "./data.js";

const arrayTireStrength = [
  {
    id: 0,
    name: " "
  },
  {
    id: 1,
    name: "*"
  },
  {
    id: 2,
    name: "* *"
  },
  {
    id: 3,
    name: "* * *"
  },
  {
    id: 4,
    name: "* * * *"
  },
  {
    id: 5,
    name: "* * * * *"
  }
];

const storeTireStrengths = new ArrayStore({
  key: "id",
  data: arrayTireStrength
});


const arrForm = [
  {
    "id": 1,
    "LI1": 22,
    "LI2": null,
    "SS1": "22",
    "SS2": null,
    "inflationPressure1": 22,
    "inflationPressure2": null,
    "plyrate": "22",
    "tireStrength": null,
    "additionalMarking": null,
    "loadRange": null,
    "TTTL": "Tubeless",
    "note": null,
    "createdAt": "2022-04-06T17:21:07.032Z",
    "updatedAt": "2022-04-06T17:21:07.032Z",
    "SizeName": "Size 1",
    "ApplicationAcronym": "acr",
    "BrandName": "Brand",
    "ProductName": "Product",
    "NominalRimId": 11,
    "TreadTypeName": null,
    "Size": {
      "name": "Size 1",
      "createdAt": "2022-04-06T17:02:27.173Z",
      "updatedAt": "2022-04-06T17:02:27.173Z"
    },
    "Application": {
      "name": "Application 1",
      "acronym": "acr",
      "createdAt": "2022-04-06T17:02:47.447Z",
      "updatedAt": "2022-04-06T17:02:47.447Z"
    },
    "Brand": {
      "name": "Brand",
      "createdAt": "2022-04-06T17:02:56.431Z",
      "updatedAt": "2022-04-06T17:02:56.431Z"
    },
    "Product": {
      "name": "Product",
      "createdAt": "2022-04-06T17:03:02.119Z",
      "updatedAt": "2022-04-06T17:03:02.119Z"
    },
    "NominalRim": {
      "id": 11,
      "name": "qweqweqweqw",
      "createdAt": "2022-04-06T17:20:23.453Z",
      "updatedAt": "2022-04-06T17:20:23.453Z"
    },
    "TreadType": null
  },
]

const arrayTest = [
  {
    "id": 1,
    "LI1": 22,
    "LI2": null,
    "SS1": "22",
    "SS2": null,
    "inflationPressure1": 22,
    "inflationPressure2": null,
    "plyrate": "22",
    "tireStrength": null,
    "additionalMarking": null,
    "loadRange": null,
    "TTTL": "Tubeless",
    "note": null,
    "createdAt": "2022-04-06T17:21:07.032Z",
    "updatedAt": "2022-04-06T17:21:07.032Z",
    "SizeName": "Size 1",
    "ApplicationAcronym": "acr",
    "BrandName": "Brand",
    "ProductName": "Product",
    "NominalRimId": 11,
    "TreadTypeName": null,
    "Size": {
      "name": "Size 1",
      "createdAt": "2022-04-06T17:02:27.173Z",
      "updatedAt": "2022-04-06T17:02:27.173Z"
    },
    "Application": {
      "name": "Application 1",
      "acronym": "acr",
      "createdAt": "2022-04-06T17:02:47.447Z",
      "updatedAt": "2022-04-06T17:02:47.447Z"
    },
    "Brand": {
      "name": "Brand",
      "createdAt": "2022-04-06T17:02:56.431Z",
      "updatedAt": "2022-04-06T17:02:56.431Z"
    },
    "Product": {
      "name": "Product",
      "createdAt": "2022-04-06T17:03:02.119Z",
      "updatedAt": "2022-04-06T17:03:02.119Z"
    },
    "NominalRim": {
      "id": 11,
      "name": "qweqweqweqw",
      "createdAt": "2022-04-06T17:20:23.453Z",
      "updatedAt": "2022-04-06T17:20:23.453Z"
    },
    "TreadType": null
  },
  {
    "id": 2,
    "LI1": 22,
    "LI2": null,
    "SS1": "22",
    "SS2": null,
    "inflationPressure1": 22,
    "inflationPressure2": null,
    "plyrate": "22",
    "tireStrength": null,
    "additionalMarking": null,
    "loadRange": null,
    "TTTL": "Tubeless",
    "note": null,
    "createdAt": "2022-04-06T17:21:07.032Z",
    "updatedAt": "2022-04-06T17:21:07.032Z",
    "SizeName": "Size 2",
    "ApplicationAcronym": "acr",
    "BrandName": "Brand",
    "ProductName": "Product",
    "NominalRimId": 11,
    "TreadTypeName": null,
    "Size": {
      "name": "Size 1",
      "createdAt": "2022-04-06T17:02:27.173Z",
      "updatedAt": "2022-04-06T17:02:27.173Z"
    },
    "Application": {
      "name": "Application 1",
      "acronym": "acr",
      "createdAt": "2022-04-06T17:02:47.447Z",
      "updatedAt": "2022-04-06T17:02:47.447Z"
    },
    "Brand": {
      "name": "Brand",
      "createdAt": "2022-04-06T17:02:56.431Z",
      "updatedAt": "2022-04-06T17:02:56.431Z"
    },
    "Product": {
      "name": "Product",
      "createdAt": "2022-04-06T17:03:02.119Z",
      "updatedAt": "2022-04-06T17:03:02.119Z"
    },
    "NominalRim": {
      "id": 11,
      "name": "qweqweqweqw",
      "createdAt": "2022-04-06T17:20:23.453Z",
      "updatedAt": "2022-04-06T17:20:23.453Z"
    },
    "TreadType": null
  }


]

// const storeTestArray = new ArrayStore({
//   key: "id",
//   data: arrayTest
// });

function renderAutocomplete(data) {
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", data);
  return <p>{data.BrandName}</p>;
};


const SampleTiresItem = (props) => {
  // const showInfo = () => props.showInfo(props.employee);
  const [status, setStatus] = useState("Pending");
  const [type, setType] = useState("danger");
  const [exit, setExit] = useState("No exit setted");
  const enterDate = new Date(`${props.data != undefined ? props.data.createdAt : null}`).toLocaleDateString();
  const exitDate = new Date(`${props.data != undefined ? props.data.updatedAt : null}`).toLocaleDateString();
  useCallback(() => {
    console.log("props data sample tire", props.data);
  }, []);

  return (
    <React.Fragment>
      <div className="tire-item flex-col">
        <div className="tire-item-info flex-row ">
          <div className="tire-item-info-box flex-col">
            <p style={{ fontWeight: "bold" }}>Sample</p>
            <p style={{ fontSize: "30px", fontWeight: "bold", margin: "0" }}>{props.data !== undefined ? props.data.id : "No Id"}</p>
          </div>
          <div className="tire-item-info-box flex-col">
            <p style={{ fontWeight: "bold" }}>Status</p>
            <Button type={type} stylingMode="contained" color="primary" text={status} />
          </div>
        </div>
        <div className="tire-item-info flex-row">
          <div className="tire-item-info-box flex-col">
            <p style={{ fontWeight: "bold" }}>Enter</p>
            {enterDate === "Invalid Date" ? "No date avaiable" : enterDate}
          </div>
          <div className="tire-item-info-box flex-col">
            <div className="flex-row"><p style={{ fontWeight: "bold" }}>Exit</p>
              {/* <p>({props.data !== undefined ? props.data.ExitType.category : "No Category"})</p> */}
            </div>
            {exit}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function App(props) {
  // const { data, setNewSidebar, setRowIndex, index } = useSidebarProvider();

  const [objectSidebarData, setObjectSidebarData] = React.useState({});
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(-1);
  // const [focusedRowKey, setFocusedRowKey] = React.useState(-1);
  const [sidebar, setSidebar] = React.useState(0);
  const grid = useRef(null);
  const [mappedSelectedObject, setMappedSelectedObject] = React.useState(null);
  const [selectedObject, setSelectedObject] = React.useState(null);
  const [editState, setEditState] = React.useState(false);
  const [popUpType, setPopUpType] = React.useState("form");


  const [sampleTiresGridDisabled, setSampleTiresGridDisabled] = React.useState(true);

  const [{ formData, popupVisible, popupMode }, dispatchPopup] = useReducer(popupReducer, initPopupState)


  const [idFromInsert, setIdFromInsert] = React.useState(null);

  // sample tires grid filtered array

  const storeSampleTiresMaster = getSampleTires(objectSidebarData.id);
  console.log("storesamplemaster", storeSampleTiresMaster._store._array);

  function getSampleTires(keyP) {
    console.log("key", keyP);
    return (new DataSource({
      store: storeSampleTires,
      filter: ['TireId', '=', keyP],
    }));
  }

  //LOGS
  const storeLogs = new DataSource({
    key: 'id',
    load: async () => await getObject("logs", `${objectSidebarData.id}`, ``, `objectType{eq}=Tires&object`),
  });

  const logsInfo = (itemData) => {
    const userName = storeContacts.__rawData.filter(item => item.id == itemData.user);
    // console.log("datasetted", userName);
    return <div className="log-span"><p><b>{userName && userName[0].firstName} {" "} {userName && userName[0].lastName}</b>  {itemData.action === "POST" ? "Created" : itemData.action === "PATCH" ? "Modified" : null} <b> {objectSidebarData.tireID && objectSidebarData.tireID} </b></p> <p>{timeConverter(itemData.timestamp) + " "} </p></div>;
  };

  useEffect(() => {
    storeContacts.load();
  }, []);

  useEffect(() => {
    storeLogs.load();
  }, [objectSidebarData]);

  //SAMPLE TIRES
  useEffect(() => {
    const key = objectSidebarData.id;
    const storeSelected = getSampleTires(key)
    const obj = storeSelected._store._array;
    console.log("obj", obj, "storeSelected", storeSelected);

    // const obj = async (key) => await axios.get(`/sample-tires?TireId{eq}=${key}`)
    // .then((res) => {
    //   setSelectedObject(res.data);
    //   return res.data;
    // })
    // .catch(error => {
    //   console.log(`error get`, error);
    // });
    // console.log("selectedSamples", selectedObject);
    if (objectSidebarData) {
      setSelectedObject(obj);
      // setSelectedObject(obj(key));
      console.log("selectedSamples2", selectedObject);
    } else {
      setSelectedObject(null);
    }
    // console.log("selectedObject", selectedObject, typeof selectedObject);

  }, [objectSidebarData]);

  useEffect(() => {
    if (selectedObject != null && selectedObject.length > 0) {
      setMappedSelectedObject(() => (
        <div>
          {selectedObject.map((n) => {
            return (
              <li key={n.id}> <SampleTiresItem data={n} /> </li>);
          })}
        </div>)
      )
    } else {
      setMappedSelectedObject([]);
    }
  }, [objectSidebarData, selectedObject]);


  // GESTIONE GRID
  const selectionChangedHandler = useCallback((e) => {
    e.selectedRowsData[0] && setObjectSidebarData(e.selectedRowsData[0])
    setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
    sidebar === 0 && setSidebar(500);
  }, [selectedRowIndex, objectSidebarData]);

  const onFocusedRowChanged = (e) => {
    // e.row && setObjectSidebarData(e.row.data);
    console.log("focused", objectSidebarData);
  };

  const openSidebar = useCallback(() => {
    console.log(selectedRowIndex);
    sidebar === 500 ? setSidebar(0) : setSidebar(500);
  }, [sidebar, selectedRowIndex]);

  //! reducer edit and insert

  const addRow = useCallback(() => {
    setSampleTiresGridDisabled(true);
    setPopUpType("form");

    setEditState(false);
    grid.current.instance.option("focusedRowIndex", -1);
    dispatchPopup({
      type: "initPopup",
      data: {},
      popupMode: "Add"
    });
  }, [grid]);

  const editRow = useCallback(() => {
    setSampleTiresGridDisabled(false);
    setPopUpType("form");

    setEditState(true);
    const rowData = grid.current.instance.getSelectedRowsData()[0];
    dispatchPopup({
      type: "initPopup",
      data: rowData,
      popupMode: "Edit"
    })
    grid.current.instance.option("focusedRowIndex", selectedRowIndex);
  }, [grid]);

  function confirmClick(e) {
    let result = getForm().validate();
    if (result.isValid) {
      if (popupMode === "Add") {
        setSampleTiresGridDisabled(false);
        // cambio lo store con il nuovo oggetto
        storeTires.insert(formData);
        grid.current.instance.refresh(true);
        // dispatchPopup({ type: "hidePopup" });
      }
      else if (popupMode === "Edit") {
        setSampleTiresGridDisabled(false);
        storeTires.update(objectSidebarData.id, formData);
        // storeContacts.reload();
        grid.current.instance.refresh(true);
        // dispatchPopup({ type: "hidePopup" });
      }
    }
  }

  function closeClick(e) {
    setSampleTiresGridDisabled(true);
    dispatchPopup({ type: "hidePopup" });
  }

  const confirmBtnOptions = useMemo(() => {
    console.log("updated confirmbtnOptions")
    return {
      text: 'Apply',
      type: 'success',
      stylingMode: 'contained',
      onClick: confirmClick
    }
  }, []);

  const closeBtnOptions = useMemo(() => {
    console.log("updated closedbutton")
    return {
      text: 'Confirm',
      type: 'danger',
      stylingMode: 'contained',
      onClick: closeClick
    }
  }, []);


  // const cancelBtnOptions = useMemo(() => {
  //   return {
  //     text: 'Cancel',
  //     onClick: cancelClick
  //   }
  // }, []);


  function cancelClick(e) {
    dispatchPopup({ type: "hidePopup" })
  }

  function onHiding() {
    dispatchPopup({ type: "hidePopup" });
  }

  //!

  const deleteRow = useCallback(() => {
    grid.current.instance.deleteRow(selectedRowIndex);
    // grid.current.instance.deselectAll();
    setObjectSidebarData({});
    grid.current.instance.option("focusedRowIndex", -1);
  }, [selectedRowIndex]);


  //! menu popup grid
  const openDependencies = useCallback(() => {
    setPopUpType("grid");
    setEditState(false);

    storeTreadTypes.load();


    // grid.current.instance.option("focusedRowIndex", -1);
    dispatchPopup({
      type: "openGridPopup",
    });

  }, [grid]);

  const menuListActionGrid = useMemo(() => ([
    {
      text: "Tires's dependencies",
      icon: 'edit',
      onClick: openDependencies
    }
  ]), [popUpType]);

  //! 

  const formCompaniesOptions = {
    dataSource: storeCompanies,
    valueExpr: 'id',
    displayExpr: 'name',
  }

  // function renderState(data) {
  //   return <span> {data.identifier} </span>;
  // }
  // const formSizesOptions = {
  //   dataSource: storeSizes,
  //   valueExpr: 'identifier',
  //   buttons:'dropdown',
  //   itemRender: {renderState},
  //   // placeholder: "Type the identifier...",
  //   searchExpr: "identifier"
  // }

  // const formSizeStructureOptions = {
  //   dataSource: storeSizeStructures,
  //   valueExpr: 'id',
  //   displayExpr: 'name'
  // }

  const formDisabledOptions = {
    readOnly: false,
  }

  const formNominalRimsOptions = {
    dataSource: storeNominalRims,
    valueExpr: 'id',
    displayExpr: 'name',
  }

  const formNoteOptions = {
    stylingMode: "outlined",
    autoResizeEnabled: true
  }


  const formCatalogueOptions = {
    // dataSource: storeTest,
    dataSource: storeCatalogues,
    valueExpr: 'id',
    // valueExpr: 'SizeName',
    itemRender: { renderAutocomplete },
    valueChangeEvent: 'change',
    // searchTimeout: 1000,
    searchExpr: ["SizeName"],
    placeholder: "Type two symbols to search...",
    hoverStateEnabled: true,
    minSearchLength: 1,
    openOnFieldClick: false,
    showClearButton: true,
  }

  const formCataloguePermittedOptions = {
    dataSource: storeNominalRims,
    valueExpr: 'id',
    displayExpr: 'name',
    disabled: true,
  }

  const formSampleTypeOptions = {
    dataSource: storeSampleTypes,
    valueExpr: 'acronym',
    displayExpr: 'name',
    showClearButton: true
  }

  //handle the field data change in form
  const onFieldDataChanged = useCallback((e) => {
    if (e.dataField === "CatalogueId") {
      console.log("CatalogueId changed", e.value);
      const catalogue = storeCatalogues.byKey(e.value);
      //  const catalogue = arrForm[0];  i need to filter the data from the catalogue using the id of the selection from the field
      console.log("storeCatalogues", catalogue);
      console.log("before Dispatch", formData);

      // if (catalogue) {
      dispatchPopup({
        type: "updateFormData",
        data: {
          ...formData,
          SizeName: catalogue.SizeName,
          ApplicationName: catalogue.ApplicationName,
          BrandName: catalogue.BrandName,
          ProdctName: catalogue.ProdctName,
          LI1: catalogue.LI1,
          SS1: catalogue.SS1,
          inflationPressure: catalogue.inflationPressure,
          plyrate: catalogue.plyrate,
          TTTL: catalogue.TTTL,
          NominalRimId: catalogue.NominalRimId,
          LI2: catalogue.LI2,
          SS2: catalogue.SS2,
          additionalMarking: catalogue.additionalMarking,
          loadRange: catalogue.loadRange,
          inflationPressure2: catalogue.inflationPressure2,
          tireStrength: catalogue.tireStrength,
          TreadTypeName: catalogue.TreadTypeName,
        },
      });
      console.log("after dispatch", formData);

      // }
    }
  }, []);

  return (
    <React.Fragment>
      <Drawer
        minSize={sidebar}
        // opened={true}
        position="right"
        height="100%"
        revealMode="expand"
        openedStateMode="shrink"
        render={() =>
          <Sidebar
            objectSidebarData={objectSidebarData}
            selectedRowIndex={selectedRowIndex}
            editRow={editRow}
            deleteRow={deleteRow}
            title={objectSidebarData.identifier ? objectSidebarData.identifier : "Select a Tire"}
          >
            <TabPanel className="tabpanel-sidebar">
              <ItemPanel title="General" >
                <div className="dx-scrollable-tabpanel-content">
                  <FormForm colCount={4} readOnly={true} formData={objectSidebarData}>
                    <SimpleItem dataField="TireID" colSpan={4} disabled="true" >
                      <Label text="Tire ID" />
                    </SimpleItem>
                    <SimpleItem dataField="Company.name" colSpan={2} disabled="true" />
                    <SimpleItem dataField="Size.identifier" colSpan={2} disabled="true" />
                    <SimpleItem dataField="LI" disabled="true" colSpan={1} />
                    <SimpleItem dataField="LI2" disabled="true" colSpan={1} />
                    <SimpleItem dataField="SI" disabled="true" colSpan={1} />
                    <SimpleItem dataField="SI2" disabled="true" colSpan={1} />
                    <SimpleItem dataField="RC" disabled="true" colSpan={1} />
                    <SimpleItem dataField="weight" disabled="true" colSpan={1} />
                    <SimpleItem dataField="ECE" disabled="true" colSpan={1} />
                    <SimpleItem dataField="year" disabled="true" colSpan={1} />
                    <SimpleItem dataField="radialCrossPly" disabled="true" colSpan={2} />
                    <SimpleItem dataField="TireType.acronym" disabled="true" colSpan={2} >
                      <Label text="Tire Type" />
                    </SimpleItem>
                  </FormForm>
                </div>
              </ItemPanel>
              <ItemPanel title="Samples" >
                <div className="dx-scrollable-tabpanel-content">
                  <ul className="no-list-style">{mappedSelectedObject}</ul>
                </div>
              </ItemPanel>
              <ItemPanel title="Tests" >
                <div className="dx-scrollable-tabpanel-content">
                </div>
              </ItemPanel>
              <ItemPanel title="Logs" badge="">
                <div className="dx-scrollable-tabpanel-content container-list-logs">
                  <List
                    dataSource={storeLogs}
                    // searchEnabled={true}
                    height="100%"
                    activeStateEnabled={false}
                    hoverStateEnabled={false}
                    // pageLoadMode="scrollBottom"
                    // searchMode="contains"
                    searchExpr="message"
                    noDataText="No data to display"
                    itemRender={logsInfo}
                    focusStateEnabled={false}>
                  </List>
                </div>
              </ItemPanel>
            </TabPanel>
          </Sidebar>
        }
      >
        <div className={"content-block-header flex-container"}>
          <h2>Tires</h2>
          <div className={"flex-container"}>
            <Button name="Add Row" icon="plus" onClick={addRow}></Button>
            <Button name="openDependencies" icon="overflow" className={'dependencies-action-grid'}   ></Button>
            <ContextMenu
              items={menuListActionGrid}
              target={'.dependencies-action-grid'}
              showEvent={'dxclick'}
              width={210}
              cssClass={'settings-menu'}
            // onItemClick={onClick}
            >
              <Position my={'top center'} at={'bottom center'} />
            </ContextMenu>

            <Button
              icon={sidebar === 500 ? "chevronnext" : "pinright"}
              label={sidebar === 500 ? "Close sidebar" : "Open sidebar"}
              onClick={openSidebar}
            >   </Button>

            {/* <Button name="notify" icon="menu"></Button> */}
          </div>
        </div>
        <div className={'content-block content-overlay'}>
          <DataGrid
            id="grid-tires"
            dataSource={storeTires}
            ref={grid}
            remoteOperations={true}
            showBorders={true}
            repaintChangesOnly={true}
            // focusedRowEnabled={true}
            // onFocusedRowChanged={onFocusedRowChanged}
            onSelectionChanged={selectionChangedHandler}
          >
            <Scrolling rowRenderingMode='virtual'></Scrolling>
            <Paging defaultPageSize={8} />
            <Pager
              // showPageSizeSelector={true}
              // allowedPageSizes={allowedPageSizes}
              showNavigationButtons={true}
            />
            <StateStoring enabled={true} type="localStorage" storageKey="machines_grid" />
            <FilterRow visible={true} />
            <FilterPanel visible={true} />
            <FilterBuilderPopup />
            <HeaderFilter visible={true} />
            <SearchPanel visible={false} />
            <Selection mode="single" />
            <Editing mode="popup" width="400" >
              <Texts confirmDeleteMessage="are you sure to delete?" />
            </Editing>
            {
              getGridStructure(storeCatalogues, storeApplications, storeNominalRims, storeSampleTypes).data.main.map((attribute) => {
                return <Column alignment='left' dataField={attribute.dataField} caption={attribute.caption ? attribute.caption : attribute.dataField} allowSorting={attribute.allowSorting ? attribute.allowSorting : null} customizeText={attribute.customizeColumnText ? attribute.customizeColumnText : null} dataType={attribute.dataType ? attribute.dataType : null} visible={attribute.visible ? attribute.visible : null} allowEditing={attribute.allowEditing ? attribute.allowEditing : null}>
                  {attribute.lookup ?
                    <Lookup
                      dataSource={attribute.lookup.dataSource ? attribute.lookup.dataSource : null}
                      valueExpr={attribute.lookup.valueExpr ? attribute.lookup.valueExpr : null}
                      displayExpr={attribute.lookup.displayExpr ? attribute.lookup.displayExpr : null}
                    /> : null}
                </Column>
              }
              )
            }
            <MasterDetail
              enabled={true}
              component={SampleTiresTemplate}
            // objectSidebarData={objectSidebarData}
            />
          </DataGrid>
          {popUpType === "form" ? (

            <Popup
              title={editState == true ? "Editing " + objectSidebarData.tireID : "Add a Tire"}
              showTitle={true}
              height="700"
              width="800"
              className="popup-form-tires"
              closeOnOutsideClick={false}
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
                options={closeBtnOptions}
              />

              <FormForm
                ref={formRef}
                // colCount={4}
                formData={formData}
                onFieldDataChanged={onFieldDataChanged}
                labelLocation="top"
                showColonAfterLabel={true}>
                <TabbedItem>
                  <TabPanelOptions deferRendering={false} />
                  <Tab title="General" colCount={6}>
                    <SimpleItem dataField="id" editorType="dxTextBox" editorOptions={formDisabledOptions} colSpan={1}>
                      <Label text={`ID`} />
                      <RequiredRule message="Required" />
                    </SimpleItem>
                    <SimpleItem dataField="identifier" editorType="dxTextBox" editorOptions={formDisabledOptions} colSpan={1}>
                      <Label text={`Tire ID`} />
                    </SimpleItem>
                    <SimpleItem dataField="SampleTypeAcronym" editorType="dxSelectBox" editorOptions={formSampleTypeOptions} colSpan={2}>
                      <Label text={`Sample type`} />
                    </SimpleItem>
                    <SimpleItem dataField="CatalogueId" editorType="dxAutocomplete" editorOptions={formCatalogueOptions} colSpan={2}>
                      <Label text={`Catalogue`} />
                    </SimpleItem>
                    <SimpleItem dataField="SizeName" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`Size`} />
                    </SimpleItem>
                    <SimpleItem dataField="ApplicationName" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`Application`} />
                    </SimpleItem>
                    <SimpleItem dataField="BrandName" editorOptions={formDisabledOptions} colSpan={2}>
                    </SimpleItem>
                    <SimpleItem dataField="ProductName" editorOptions={formDisabledOptions} colSpan={2}>
                    </SimpleItem>
                    <SimpleItem dataField="LI1" colSpan={1} editorOptions={formDisabledOptions}  >
                      <Label text={`LI1`} />
                    </SimpleItem>
                    <SimpleItem dataField="SS1" colSpan={1} editorOptions={formDisabledOptions} >
                      <Label text={`SS1`} />
                    </SimpleItem>
                    <SimpleItem dataField="inflationPressure" colSpan={2} >
                      {/* <PatternRule message="Only numbers Accepted" pattern="[0-9]+" /> */}
                      <Label text={`Inflation Pressure 1`} />
                    </SimpleItem>
                    <SimpleItem dataField="plyrate" colSpan={1} editorOptions={formDisabledOptions} >
                      <Label text={`Ply Rate`} />
                    </SimpleItem>
                    <SimpleItem dataField="TTTL" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`TT / TL`} />
                    </SimpleItem>
                    <SimpleItem dataField="NominalRimId" editorType="dxSelectBox" editorOptions={formNominalRimsOptions} colSpan={3}>
                      <Label text={`Nominal rim (according ETRTO, ECE ...)`} />
                    </SimpleItem>
                    <SimpleItem dataField="CataloguePermittedRims" editorType="dxTagBox" editorOptions={formCataloguePermittedOptions} colSpan={6}>
                      <Label text={`Permitted Rims`} />
                    </SimpleItem>
                  </Tab>
                  <Tab title="More Info" colCount={4}>
                    <SimpleItem dataField="LI2" colSpan={1} editorOptions={formDisabledOptions} >
                      {/* <PatternRule message="Only numbers from 0 to 999" pattern="^[0-9]{1,3}$" /> */}
                      <Label text={`LI2`} />
                    </SimpleItem>
                    <SimpleItem dataField="SS2" colSpan={1} editorOptions={formDisabledOptions} >
                      {/* <PatternRule message="Only letters and numbers maximum 2 character" pattern="^[a-zA-Z0-9]{0,2}$" /> */}
                      <Label text={`SS2`} />
                    </SimpleItem>
                    <SimpleItem dataField="additionalMarking" colSpan={1} editorOptions={formDisabledOptions} >
                      <Label text={`Additional Marking`} />
                    </SimpleItem>
                    <SimpleItem dataField="loadRange" colSpan={1} editorOptions={formDisabledOptions} >
                      <Label text={`Load Range`} />
                    </SimpleItem>
                    <SimpleItem dataField="inflationPressure2" colSpan={1} editorOptions={formDisabledOptions} >
                      {/* <PatternRule message="Only numbers Accepted" pattern="[0-9]+" /> */}
                      <Label text={`Inflation Pressure 2`} />
                    </SimpleItem>
                    <SimpleItem dataField="tireStrength" editorType="dxSelectBox" editorOptions={formDisabledOptions} colSpan={1}>
                      <Label text={`Tire Strength`} />
                    </SimpleItem>
                    <SimpleItem dataField="TreadTypeName" editorType="dxSelectBox" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`Tread type`} />
                    </SimpleItem>
                    <SimpleItem dataField="note" editorType="dxTextArea" editorOptions={formNoteOptions} colSpan={4} >
                      <Label text={`Note`} />
                    </SimpleItem>
                  </Tab>

                  <Tab title="Samples" colCount={4}>
                    <div>
                      <DataGrid
                        disabled={sampleTiresGridDisabled}
                        id="formSampleTiresGrid"
                        dataSource={storeSampleTiresMaster}
                        showBorders={false}
                        showRowLines={false}
                        columnAutoWidth={true}
                        rowAlternationEnabled={true}
                        virtualModeEnabled={true}
                        height={'500px'}
                        width={'100%'}
                        repaintChangesOnly={true}
                        cacheEnabled={true}
                      >
                        <StateStoring enabled={true} type="localStorage" storageKey="formSampleTiresGrid" />
                        <Scrolling mode="virtual" columnRenderingMode="virtual" />
                        <HeaderFilter visible={true} allowSearch={true} />
                        <FilterRow visible={false} />
                        <FilterPanel visible={false} />
                        <Selection mode="single" />
                        <SearchPanel visible={true} highlightSearchText={true} />
                        <Editing mode="row" allowUpdating={true} allowAdding={true} allowDeleting={true} refreshMode="reshape">
                          <Texts confirmDeleteMessage="Are you sure to delete?" />
                        </Editing>
                        <Selection mode="single" />
                        <Column caption="Sample id" dataField="number" dataType="number" >
                          <RequiredRule message="Required" />
                        </Column>
                        <Column caption="Production date" dataField="productionDate" dataType="string" >
                          <RequiredRule message="Required" />
                        </Column>
                        <Column caption="Made in" dataField="madeIn" dataType="string" >
                          <RequiredRule message="Required" />
                        </Column>
                        <Column caption="Entry Date" dataField="entryDate" dataType="date" >
                          <RequiredRule message="Required" />
                        </Column>
                        <Column caption="Exit Date" dataField="exitDate" dataType="date" >
                          <RequiredRule message="Required" />
                        </Column>
                      </DataGrid>
                    </div>

                  </Tab>
                </TabbedItem>
              </FormForm>
            </Popup>
          ) : (
            <Popup
              title={"Tires's dependencies"}
              showTitle={true}
              height="700"
              width="800"
              closeOnOutsideClick={true}
              visible={popupVisible}
              onHiding={onHiding}>
              <FormForm>
                <TabbedItem>
                  <TabPanelOptions deferRendering={false} />
                  <Tab title="Sample Types" colCount={4}>
                    <div>
                      <DataGrid
                        id="sampleTypesGrid"
                        dataSource={storeSampleTypes}
                        showBorders={false}
                        showRowLines={false}
                        columnAutoWidth={true}
                        rowAlternationEnabled={true}
                        virtualModeEnabled={true}
                        height={'500px'}
                        width={'100%'}
                        repaintChangesOnly={true}
                        cacheEnabled={true}
                      >
                        <StateStoring enabled={true} type="localStorage" storageKey="sampleTypesGrid" />
                        <Scrolling mode="virtual" />
                        <HeaderFilter visible={true} allowSearch={true} />
                        <FilterRow visible={false} />
                        <FilterPanel visible={false} />
                        <Selection mode="single" />
                        <SearchPanel visible={true} highlightSearchText={true} />
                        <Editing mode="row" allowUpdating={false} allowAdding={true} allowDeleting={true} >
                          <Texts confirmDeleteMessage="Are you sure to delete?" />
                          <Texts addRow="Did you insert the correct value?" />
                        </Editing>
                        <Selection mode="single" />
                        <Column caption="Name" dataField="name" dataType="string" />
                        <Column caption="Acronym" dataField="acronym" dataType="string" />

                      </DataGrid>

                    </div>
                  </Tab>
                </TabbedItem>
              </FormForm>
            </Popup>
          )
          }

        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default App;
