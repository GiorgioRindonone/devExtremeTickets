/* 1. React import statement and standard module dependencies */
import React, { useCallback, useState, useMemo, useEffect, useRef, useReducer } from "react";
import 'whatwg-fetch';

/* 2. Standard module dependencies in brackets */
import axios from 'axios';


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
import { Template } from 'devextreme-react/core/template';
import TextBox from 'devextreme-react/text-box';
import DropDownBox from 'devextreme-react/drop-down-box';
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
import { SidebarDataProvider, useSidebarData, setEditStateFormStatus, editStateForm } from "../../contexts/SidebarDataContext.js";

// import {URL} from "../../api/apiManager.js";
import { initPopupState, popupReducer, formRef, getForm, formRefSide, getFormSide } from "../../redux-store/reducers/popupForm.js";
import { getObject, postObject, patchObject, deleteObject, getByKeyObject, getByKeyObjects } from "../../api/apiManager.js";
import { timeConverter } from "../../utils/handler-functions.js";
import { log } from "../../utils/consolelog.js";

/* 8. Internal global variables imports in brackets */
import SampleTiresTemplate from "./SampleTires/SampleTires.js";
import StatusCell from "../../utils/StatusCell.js";

/* 9. Internal components within same folder (Relative imports) */
import { getGridStructure } from "./GridStructure.js";

/* 10. Stylesheet import */
import './Tires.scss';
import { logDOM } from "@testing-library/react";

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
    "NominalRimId": 1,
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
    "tireStrength": 3,
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
    "tireStrength": 2,
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

const storeTest = new ArrayStore({
  key: "id",
  data: arrayTest
});

function renderCatalogueForm(data) {
  return (
    <div className="custom-item-catalogue">
      <div className="product-name">{data.SizeName + " " + data.BrandName + " " + data.ProductName}</div>
    </div>
  );
}

function fieldCatalogueForm(data) {
  log("fieldCatalogueForm", data);
  return (
    <div className="custom-item-catalogue">
      <TextBox className="product-name"
        defaultValue={data && data.SizeName + " " + data.BrandName + " " + data.ProductName}
        readOnly={true} />
    </div>
  );
}

const SampleTiresItem = (props) => {
  // const showInfo = () => props.showInfo(props.employee);
  const [status, setStatus] = useState("Pending");
  const [type, setType] = useState("danger");
  const [exit, setExit] = useState("No exit setted");
  const enterDate = new Date(`${props.data != undefined ? props.data.createdAt : null}`).toLocaleDateString();
  const exitDate = new Date(`${props.data != undefined ? props.data.updatedAt : null}`).toLocaleDateString();

  console.log("props data sample tire", props.data);

  return (
    <React.Fragment>
      <div className="tire-item flex-col">
        <div className="tire-item-info flex-row ">
          <div className="tire-item-info-box flex-col flex-row-50">
            <p style={{ fontWeight: "bold" }}>Sample</p>
            <p style={{ fontSize: "30px", fontWeight: "bold", margin: "0" }}>{props.data !== undefined ? props.data.id : "No Id"}</p>
          </div>
          <div className="tire-item-info-box flex-col flex-row-50 ">
            <p style={{ fontWeight: "bold" }}>Status</p>
            <Button
              hoverStateEnabled={false}
              activeStateEnabled={false}
              stylingMode="contained"
              text={(props.data.status === 2) ? `Waiting approval` : (props.data.status === 2) ? `Test in progress` : (props.data.status === 2) ? `Archivied` : `No exit data setted`}
              elementAttr={{ class: (props.data.status === 2) ? `button-status2` : (props.data.status === 3) ? `button-status3` : (props.data.status === 4) ? `button-status4` : `button-status1` }}
            />
          </div>
        </div>
        <div className="tire-item-info flex-row ">
          <div className="tire-item-info-box flex-col flex-row-50">
            <p style={{ fontWeight: "bold" }}>Enter</p>
            {enterDate === "Invalid Date" ? "No date avaiable" : enterDate}
          </div>
          <div className="tire-item-info-box flex-col flex-row-50">
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

  // const [objectSidebarData, setObjectData] = React.useState({});
  const { objectSidebarData, setObjectData, sidebarMain, setSidebarMainStatus, setEditStateFormStatus, editStateForm } = useSidebarData();
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

  const [dataFormGet, setDataFormGet] = React.useState({});
  const [gridBoxValue, setGridBoxValue] = React.useState(null);
  const [isGridBoxOpened, setIsGridBoxOpened] = React.useState(false);
  const [rowClicked, setRowClicked] = React.useState(false);
  


  //grid selectbox
  const gridColumns = ['SizeName', 'BrandName'];

  let CataloguePermittedRims = [];

  const syncDataGridSelection = (e) => {
    // log("syncDataGridSelection from dropdown", e, e.value);
    setGridBoxValue(e.value);
    storeCatalogues.byKey(e.value).then(
      (dataItem) => {
        log("catalogue", dataItem);

        // let prevRimPer = getObject("permitted-rims", dataItem.id, "", "CatalogueId");
        // if (prevRimPer !== undefined) {
        //   // rowData.CataloguePermittedRims = [];
        //   for (let i = 0; i < prevRimPer.length; i++) {
        //     //push prevRimPer.NominalRimId to CataloguePermittedRims
        //     CataloguePermittedRims.push(prevRimPer[i].NominalRimId);
        //   }
        //   // console.log("permitted edit initialize", permittedRims, rowData);
        // }    
        dispatchPopup({
          type: "updateFormData",
          data: {
            ...formData,
            CatalogueId: dataItem.id,
            // CataloguePermittedRims: CataloguePermittedRims,
            SampleTypeAcronym: dataItem.SampleTypeAcronym,
            SizeName: dataItem.SizeName,
            ApplicationAcronym: dataItem.ApplicationAcronym,
            BrandName: dataItem.BrandName,
            ProductName: dataItem.ProductName,
            LI1: dataItem.LI1,
            SS1: dataItem.SS1,
            inflationPressure1: dataItem.inflationPressure1,
            plyrate: dataItem.plyrate,
            TTTL: dataItem.TTTL,
            NominalRimId: dataItem.NominalRimId,
            LI2: dataItem.LI2,
            SS2: dataItem.SS2,
            additionalMarking: dataItem.additionalMarking,
            loadRange: dataItem.loadRange,
            inflationPressure2: dataItem.inflationPressure2,
            tireStrength: dataItem.tireStrength,
            TreadTypeName: dataItem.TreadTypeName,
            noteCatalogue: dataItem.note,
          }
        });
        setDataFormGet(dataItem);

      },
      (error) => {
        log("catalogue error", error);
      }
    );
  };




  const dataGridOnSelectionChanged = (e) => {
    let value = e.selectedRowKeys[0];
    setGridBoxValue(value);
    setIsGridBoxOpened(false);
    log("dataGridOnSelectionChanged from grid", gridBoxValue);
  }

  const gridBoxDisplayExpr = (item) => {
    return item && `${item.SizeName} <Brand: ${item.BrandName} | Product: ${item.ProductName} >`;
  }

  const onGridBoxOpened = (e) => {
    if (e.name === 'opened') {
      setIsGridBoxOpened(e.value);
    }
  }


  const dataGridRender = () => {
    return (
      <>
        <DataGrid
          dataSource={storeCatalogues}
          hoverStateEnabled={true}
          selectedRowKeys={gridBoxValue}
          onSelectionChanged={dataGridOnSelectionChanged}
          height="400px">
          <Selection mode="single" />
          <Scrolling mode="virtual" />
          <FilterRow visible={true} />
          <Column dataField="SizeName" caption="Size" />
          <Column dataField="BrandName" caption="Brand" />
          <Column dataField="ProductName" caption="Product" />
          <Column dataField="ApplicationAcronym" caption="Application" >
            <Lookup dataSource={storeApplications} valueExpr="acronym" displayExpr="name" />
          </Column>
        </DataGrid>

      </>
    );
  }

  //sample tyres

  // const storeSampleTires = useCallback(() => {
  //   return getSampleTires(gridBoxValue);
  // }, [gridBoxValue]);

  // const storeSampleTiresForm = useCallback(() => {
  //   return getSampleTires(objectSidebarData.id);
  // }, [gridBoxValue, objectSidebarData]);

  // function getSampleTires(keyP) {
  //   return new DataSource({
  //     store: new CustomStore({
  //       key: "id",
  //       // loadMode: 'raw',
  //       cacheRawData: true,
  //       load: async (key) => await getObject("sample-tires", key),
  //       update: async (key, values) => await patchObject("sample-tires", key, values),
  //       remove: async (key) => await deleteObject("sample-tires", key),
  //       insert: async (values) => await postObject("sample-tires", values),
  //       byKey: async (key) => { return await getByKeyObject("sample-tires", key, "id") }
  //     }),
  //     filter: ['TireId', '=', keyP],
  //   });
  // }

  // const storeSampleTiresMaster = getSampleTires(objectSidebarData.id);
  // console.log("storesamplemaster", storeSampleTiresMaster._store._array);

  const storeSampleTiresForm = useCallback(() => {
    getSampleTires(objectSidebarData.id);
    console.log("storesamplemaster", storeSampleTiresForm);
  }, [objectSidebarData.id]);

  // console.log("storesamplemaster", storeSampleTiresForm._store._array);

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
  var selectionChangedRaised = false;

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
  }, [objectSidebarData, selectedObject, editStateForm]);


  // GESTIONE GRID
  const selectionChangedHandler = useCallback((e) => {
    e.selectedRowsData[0] && setObjectData(e.selectedRowsData[0])
    setSidebarMainStatus(false);
    setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
    sidebar === 0 && setSidebar(500);
  }, [selectedRowIndex, objectSidebarData]);

  const onFocusedRowChanged = (e) => {
    // e.row && setObjectData(e.row.data);
    console.log("focused", objectSidebarData);
  };

  const openSidebar = useCallback(() => {
    console.log(selectedRowIndex);
    sidebar === 500 ? setSidebar(0) : setSidebar(500);
  }, [sidebar, selectedRowIndex, editStateForm]);



  //! reducer edit and insert
  const addRow = useCallback(() => {
    setGridBoxValue(null);
    setSampleTiresGridDisabled(true);
    setPopUpType("form");
    setEditStateFormStatus(!editStateForm);
    dispatchPopup({
      type: "initPopup",
      data: {},
      popupMode: "Add"
    });

    grid.current.instance.option("focusedRowIndex", -1);
  }, [grid]);


  // PROBLEM HERE 1 
  // title: edit giving the data to the form
  // 1) i need to edit the form passing the data, i've tried this with dispatch cause the form it's not working properly anymore, so i need to force to read the data again
  // 2) cause the grid in the dropdown in line 1086 i think it's out of the formGroup items, i need to set its value for editing, i was thinking to use the same method as in the add
  // where when i change the selection of the grid, it will populate the fields with the data, but of course now i have all the data in the row cause i am in editing
  // 3) are you sure the method from line 629 in the right one to pass the data to the form? maybe am i doing wrong?

  const editRow = useCallback(() => {
    setSampleTiresGridDisabled(false);
    setPopUpType("form");
    setEditStateFormStatus(!editStateForm);
    const rowData = grid.current.instance.getSelectedRowsData()[0];
    setGridBoxValue(rowData.CatalogueId);
    dispatchPopup({
      type: "initPopup",
      data: {
        ...rowData,
        year: rowData.year,
        SampleTypeAcronym: rowData.SampleTypeAcronym,
        SizeName: rowData.Catalogue.SizeName,
        ApplicationAcronym: rowData.Catalogue.ApplicationAcronym,
        BrandName: rowData.Catalogue.BrandName,
        ProductName: rowData.Catalogue.ProductName,
        LI1: rowData.Catalogue.LI1,
        SS1: rowData.Catalogue.SS1,
        plyrate: rowData.Catalogue.plyrate,
        TTTL: rowData.Catalogue.TTTL,
        NominalRimId: rowData.NominalRimId,
        LI2: rowData.Catalogue.LI2,
        SS2: rowData.Catalogue.SS2,
        additionalMarking: rowData.Catalogue.additionalMarking,
        loadRange: rowData.Catalogue.loadRange,
        inflationPressure2: rowData.Catalogue.inflationPressure2,
        tireStrength: rowData.Catalogue.tireStrength,
        TreadTypeName: rowData.Catalogue.TreadTypeName,
        noteCatalogue: rowData.Catalogue.note,
      },
      popupMode: "Edit"
    })
    grid.current.instance.option("focusedRowIndex", selectedRowIndex);
  }, [grid]);

  function confirmClick(e) {


    let result = getForm().validate();
    // PROBLEM HERE 2
    // title: giving the data to the form, but the form is not working properly with the data
    // 1) i check the formData and there is nothing of the data i have inserted in the form
    console.log("form before update", formData);
    // 2) if i check the option formData there are all the infos i have in the form, how is it possible? if i check che istance of the formData there is nothing
    let option = getForm().option("formData");
    console.log("option to update", option);
    //3 ) the formData is not updated, why?
    getForm().updateData(option);
    console.log("after update form", result, formData, option);



    if (result.isValid) {
      // PROBLEM HERE 3
      // title: the popupMode is not working properly, can't take the status
      // 1) the popupMode is not updated from the buttons, but is undefned why?
      console.log("popupMode STATUS check", popupMode);
      // 2) if i do the insert here of course it works, but i have to do it using the reducer
      // i think that this problem is connected with the other one about the formData, i can't rely why but i think it is...
      // maybe am i calling the reducer in a bad way? cause since i have implemented the grid in the dropdown it started to give me problems...

      storeTires.insert(option).then(() => {
        grid.current.instance.refresh(true);
      });
      // dispatchPopup({ type: "hidePopup" });
      setSampleTiresGridDisabled(false);

      if (popupMode === "Add") {
        console.log("popupmode ADD check");
        storeTires.insert(option).then(() => {
          setSampleTiresGridDisabled(false);
          // cambio lo store con il nuovo oggetto
          grid.current.instance.refresh(true);
        });
        dispatchPopup({ type: "hidePopup" });

      }
      else if (popupMode === "Edit") {
        console.log("popupmode EDIT check")

        storeTires.update(objectSidebarData.id, option).then(() => {
          grid.current.instance.refresh(true);
          setSampleTiresGridDisabled(false);
        });
      }
      dispatchPopup({ type: "hidePopup" });

    }

    setEditStateFormStatus(!editStateForm);
  }

  function closeClick(e) {
    setSampleTiresGridDisabled(true);
    setGridBoxValue(null);
    dispatchPopup({ type: "hidePopup" });
    setGridBoxValue(null);

    setEditStateFormStatus(!editStateForm);
  }

  const confirmBtnOptions = useMemo(() => {
    return {
      text: 'Apply',
      type: 'success',
      stylingMode: 'contained',
      onClick: confirmClick
    }
  }, []);

  const closeBtnOptions = useMemo(() => {
    return {
      text: 'Confirm',
      type: 'danger',
      stylingMode: 'contained',
      onClick: closeClick
    }
  }, []);



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
    setObjectData({});
    grid.current.instance.option("focusedRowIndex", -1);
  }, [selectedRowIndex]);


  //! menu popup grid
  const openDependencies = useCallback(() => {
    setPopUpType("grid");

    setEditStateFormStatus(!editStateForm);

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

  const formDisabledOptions = {
    readOnly: true,
  }

  const formNominalRimsOptions2 = {
    dataSource: storeNominalRims,
    valueExpr: 'id',
    displayExpr: 'name',
  }


  const formNominalRimsOptions = {
    dataSource: storeNominalRims,
    valueExpr: 'id',
    displayExpr: 'name',
    searchEnabled: true,
    searchTimeout: 200,
    minSearchLength: 2,
    searchExpr: ["name"],
    placeholder: 'Type to search...',
    searchMode: 'contains',
    showClearButton: true,
  }

  const formNoteOptions = {
    stylingMode: "outlined",
    autoResizeEnabled: true
  }
  const formNoteOptions3 = {
    stylingMode: "outlined",
    autoResizeEnabled: false,
    height: "80px"
  }


  const formCataloguePermittedOptions = {
    dataSource: storeNominalRims,
    valueExpr: 'id',
    displayExpr: 'name',
    // value: CataloguePermittedRims,
    disabled: true,
  }

  const formSampleTypeOptions = {
    dataSource: storeSampleTypes,
    valueExpr: 'acronym',
    displayExpr: 'name',
    showClearButton: true
  }

  const formApplicationAcronymOptions = {
    dataSource: storeApplications,
    valueExpr: 'acronym',
    displayExpr: 'name',
    disabled: true,
  }


  const rowSelectionHandler = (e) => {
    // setRowClicked(!rowClicked);
    var dataGrid = e.component;
    var keys = dataGrid.getSelectedRowKeys();
    if (rowClicked === false && objectSidebarData.id === keys[0]) {
      setRowClicked(true);
      if (sidebar === 0) {
        setSidebar(500);
      }
    } else if (objectSidebarData.id !== keys[0]) {
      setRowClicked(false);
    } else if (rowClicked === true && objectSidebarData.id === keys[0]) {
      dataGrid.deselectRows(keys);
      if (sidebar === 500) {
        setSidebar(0);
      }
      setRowClicked(false);
    }
    console.log("rowClicked", rowClicked, "keys", keys, "objectSidebarData.id", objectSidebarData.id);
  }

  //handle the field data change in form
  const onFieldDataChanged = useCallback((e) => {
    log("onFieldDataChanged", e.value, gridBoxValue);
    if (e.dataField === "CatalogueId") {
      // log("onFieldDataChanged", e.value, gridBoxValue);
      // const catalogue = storeCatalogues.byKey(e.value);
      // // const catalogue = arrForm[0];
      // console.log("Before Dispatch", formData);
      // console.log("storeCatalogues", catalogue);
      // if (catalogue) {
      //   dispatchPopup({
      //     type: "updateFormData",
      //     data: {
      //       ...formData,            
      //       CatalogueId: e.value,
      //       SampleTypeAcronym: catalogue.SampleTypeAcronym,
      //       SizeName: catalogue.SizeName,
      //       ApplicationName: catalogue.ApplicationName,
      //       BrandName: catalogue.BrandName,
      //       ProdctName: catalogue.ProdctName,
      //       LI1: catalogue.LI1,
      //       SS1: catalogue.SS1,
      //       inflationPressure: catalogue.inflationPressure,
      //       plyrate: catalogue.plyrate,
      //       TTTL: catalogue.TTTL,
      //       NominalRimId: catalogue.NominalRimId,
      //       LI2: catalogue.LI2,
      //       SS2: catalogue.SS2,
      //       additionalMarking: catalogue.additionalMarking,
      //       loadRange: catalogue.loadRange,
      //       inflationPressure2: catalogue.inflationPressure2,
      //       tireStrength: catalogue.tireStrength,
      //       TreadTypeName: catalogue.TreadTypeName,
      //     },
      //   });
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
          // title={objectSidebarData.id ? objectSidebarData.id : "Select a Tire"}
          >
            <TabPanel className="tabpanel-sidebar">
              <ItemPanel title="General" >
                <div className="dx-scrollable-tabpanel-content">
                  <FormForm colCount={4} readOnly={true} formData={objectSidebarData}>
                    <SimpleItem dataField="identifier" colSpan={2} disabled="true" >
                      <Label text="Tire ID" />
                    </SimpleItem>
                    <SimpleItem dataField="Catalogue.Size.name" colSpan={2}>
                      <Label text={`Catalogue`} />
                    </SimpleItem>
                    <SimpleItem dataField="SampleTypeAcronym" editorType="dxSelectBox" editorOptions={formSampleTypeOptions} colSpan={2}>
                      <Label text={`Sample type`} />
                    </SimpleItem>
                    <SimpleItem dataField="inflationPressure1" colSpan={2} >
                      <Label text={`Inflation Pressure`} />
                    </SimpleItem>
                    <SimpleItem dataField="year" colSpan={2}>
                      <Label text={`Year`} />
                    </SimpleItem>
                    <SimpleItem dataField="NominalRimId" editorType="dxSelectBox" editorOptions={formNominalRimsOptions2} colSpan={2}>
                      <Label text={`Nominal rim (according ETRTO, ECE ...)`} />
                    </SimpleItem>
                    <SimpleItem dataField="Catalogue.ProductName" editorOptions={formDisabledOptions} colSpan={2}>
                    </SimpleItem>
                    <SimpleItem dataField="Catalogue.BrandName" editorOptions={formDisabledOptions} colSpan={2}>
                    </SimpleItem>

                    <SimpleItem dataField="note" editorType="dxTextArea" editorOptions={formNoteOptions3} colSpan={4} >
                      <Label text={`Note`} />
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
            showBorders={true}
            // repaintChangesOnly={true}
            // cacheEnabled={true}
            height={'100%'}
            onSelectionChanged={selectionChangedHandler}
            onRowClick={rowSelectionHandler}
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
            <Column
              dataField="status"
              caption="Status"
              // dataType="number"
              // format="step"
              alignment="left"
              allowGrouping={false}
              cellRender={StatusCell}
              // cssClass="bullet"
              allowFiltering={false}
              allowSorting={false}
              allowEditing={false}
              allowSearch={false}
            />


            <MasterDetail
              enabled={true}
              component={SampleTiresTemplate}
            // objectSidebarData={objectSidebarData}
            />
          </DataGrid>
          {popUpType === "form" ?

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
                // onFieldDataChanged={onFieldDataChanged}
                labelLocation="top"
                showColonAfterLabel={true}>
                <TabbedItem>
                  <TabPanelOptions deferRendering={false} />
                  <Tab title="General" colCount={6}>
                    <SimpleItem dataField="CatalogueId" colSpan={6}>
                      <Label text={`Catalogue`} />
                      <DropDownBox
                        value={gridBoxValue}
                        opened={isGridBoxOpened}
                        valueExpr="id"
                        deferRendering={false}
                        displayExpr={gridBoxDisplayExpr}
                        placeholder="Select a value..."
                        showClearButton={true}
                        dataSource={storeCatalogues}
                        onValueChanged={syncDataGridSelection}
                        onOptionChanged={onGridBoxOpened}
                        contentRender={dataGridRender}
                      />
                    </SimpleItem>

                    <SimpleItem dataField="SampleTypeAcronym" editorType="dxSelectBox" editorOptions={formSampleTypeOptions} colSpan={2}>
                      <RequiredRule message="Required" />
                      <Label text={`Sample type`} />
                    </SimpleItem>
                    <SimpleItem dataField="inflationPressure1" colSpan={2} >
                      <RequiredRule message="Required" />
                      <PatternRule message="Only numbers Accepted" pattern="[0-9]+" />
                      <Label text={`Inflation Pressure 1`} />
                    </SimpleItem>
                    <SimpleItem dataField="identifier" editorType="dxTextBox" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`Tire ID`} />
                    </SimpleItem>
                    <SimpleItem dataField="year" colSpan={2}>
                      <RequiredRule message="Required" />
                      <Label text={`Year`} />

                    </SimpleItem>

                    <SimpleItem dataField="NominalRimId" editorType="dxSelectBox" editorOptions={formNominalRimsOptions} colSpan={4}>
                      <RequiredRule message="Required" />

                      <Label text={`Nominal rim (according ETRTO, ECE ...)`} />
                    </SimpleItem>
                    <SimpleItem dataField="CataloguePermittedRims" editorType="dxTagBox" editorOptions={formCataloguePermittedOptions} colSpan={6}>
                      <Label text={`Permitted Rims`} />
                    </SimpleItem>
                    <SimpleItem dataField="note" editorType="dxTextArea" editorOptions={formNoteOptions} colSpan={6} >
                      <Label text={`Note`} />
                    </SimpleItem>

                  </Tab>
                  <Tab title="More Info" colCount={6}>
                    <SimpleItem dataField="SizeName" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`Size`} />
                    </SimpleItem>
                    <SimpleItem dataField="ApplicationAcronym" editorOptions={formApplicationAcronymOptions} colSpan={2}>
                      <Label text={`Application`} />
                    </SimpleItem>
                    <SimpleItem dataField="BrandName" editorOptions={formDisabledOptions} colSpan={2}>
                    </SimpleItem>
                    <SimpleItem dataField="plyrate" colSpan={1} editorOptions={formDisabledOptions} >
                      <Label text={`Ply Rate`} />
                    </SimpleItem>
                    <SimpleItem dataField="TTTL" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`TT / TL`} />
                    </SimpleItem>

                    <SimpleItem dataField="ProductName" editorOptions={formDisabledOptions} colSpan={2}>
                    </SimpleItem>
                    <SimpleItem dataField="LI1" colSpan={1} editorOptions={formDisabledOptions}  >
                      <Label text={`LI1`} />
                    </SimpleItem>
                    <SimpleItem dataField="SS1" colSpan={1} editorOptions={formDisabledOptions} >
                      <Label text={`SS1`} />
                    </SimpleItem>

                    <SimpleItem dataField="LI2" colSpan={1} editorOptions={formDisabledOptions} >
                      <PatternRule message="Only numbers from 0 to 999" pattern="^[0-9]{1,3}$" />
                      <Label text={`LI2`} />
                    </SimpleItem>
                    <SimpleItem dataField="SS2" colSpan={1} editorOptions={formDisabledOptions} >
                      <PatternRule message="Only letters and numbers maximum 2 character" pattern="^[a-zA-Z0-9]{0,2}$" />
                      <Label text={`SS2`} />
                    </SimpleItem>
                    <SimpleItem dataField="additionalMarking" colSpan={2} editorOptions={formDisabledOptions} >
                      <Label text={`Additional Marking`} />
                    </SimpleItem>
                    <SimpleItem dataField="loadRange" colSpan={1} editorOptions={formDisabledOptions} >
                      <Label text={`Load Range`} />
                    </SimpleItem>
                    <SimpleItem dataField="inflationPressure2" colSpan={2} editorOptions={formDisabledOptions} >
                      <PatternRule message="Only numbers Accepted" pattern="[0-9]+" />
                      <Label text={`Inflation Pressure 2`} />
                    </SimpleItem>
                    <SimpleItem dataField="tireStrength" editorType="dxSelectBox" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`Tire Strength`} />
                    </SimpleItem>
                    <SimpleItem dataField="TreadTypeName" editorType="dxSelectBox" editorOptions={formDisabledOptions} colSpan={2}>
                      <Label text={`Tread type`} />
                    </SimpleItem>
                    <SimpleItem dataField="noteCatalogue" editorType="dxTextArea" editorOptions={formNoteOptions3} colSpan={6} >
                      <Label text={`Catalogue's note`} />
                    </SimpleItem>

                  </Tab>

                  <Tab title="Samples" colCount={4}>
                    <div>
                      <DataGrid
                        disabled={sampleTiresGridDisabled}
                        id="formSampleTiresGrid"
                        dataSource={storeSampleTiresForm}
                        showBorders={false}
                        showRowLines={false}
                        columnAutoWidth={true}
                        rowAlternationEnabled={true}
                        virtualModeEnabled={true}
                        height={'500px'}
                        width={'100%'}
                        repaintChangesOnly={false}
                        cacheEnabled={false}
                      >
                        <StateStoring enabled={true} type="localStorage" storageKey="formSampleTiresGrid" />
                        <Scrolling mode="virtual" columnRenderingMode="virtual" />
                        <HeaderFilter visible={true} allowSearch={true} />
                        <FilterRow visible={false} />
                        <FilterPanel visible={false} />
                        <Selection mode="single" />
                        <SearchPanel visible={true} highlightSearchText={true} />
                        <Editing mode="row" allowUpdating={true} allowAdding={true} allowDeleting={true} refreshMode="full">
                          <Texts confirmDeleteMessage="Are you sure to delete?" />
                        </Editing>
                        <Selection mode="single" />
                        <Column caption="Sample id" dataField="sampleId" dataType="number" >
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
            :
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
          }

        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default App;
