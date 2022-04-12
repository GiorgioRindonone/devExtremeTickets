/* 1. React import statement and standard module dependencies */
import React, { useCallback, useState, useMemo, useEffect, useRef, useReducer, Component, createRef } from "react";
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
    storeSampleTypes,
    storeTestTypes,
    storeForms
} from "../../stores/storesDevextreme.js";


/* 7. Internal functions imports in brackets */
import { SidebarDataProvider, useSidebarData, setEditStateFormStatus, editStateForm } from "../../contexts/SidebarDataContext.js";

// import {URL} from "../../api/apiManager.js";
import { initPopupState, popupReducer, formRef, getForm, formRefSide, getFormSide } from "../../redux-store/reducers/popupForm.js";
import { getObject, postObject, patchObject, deleteObject, getByKeyObject, getByKeyObjects } from "../../api/apiManager.js";
import { timeConverter } from "../../utils/handler-functions.js";
import { log } from "../../utils/consolelog.js";

/* 8. Internal global variables imports in brackets */

/* 9. Internal components within same folder (Relative imports) */
import { getGridStructure } from "./GridStructure.js";


/* 10. Stylesheet import */
import './TestType.scss';
import { logDOM } from "@testing-library/react";

/* 11. Data import */
// import service from "./data.js";

// IMPLEMENTATIONS 
import { FormGrid } from "./FormGrid.js";
import $ from "jquery";
import ReactDOM from "react-dom";

window.jQuery = $;
window.$ = $;


const outdoorOptions = [
    { text: "Outdoor", value: true },
    { text: "Indoor", value: false },
];

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

    const [gridBoxValue, setGridBoxValue] = React.useState(null);
    const [isGridBoxOpened, setIsGridBoxOpened] = React.useState(false);
    const [rowClicked, setRowClicked] = React.useState(false);


    fb = createRef();
    
    //grid selectbox
    const gridColumns = ['SizeName', 'BrandName'];

    let CataloguePermittedRims = [];




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
        setPopUpType("form");
        setEditStateFormStatus(!editStateForm);
        dispatchPopup({
            type: "initPopup",
            data: {},
            popupMode: "Add"
        });

        grid.current.instance.option("focusedRowIndex", -1);
    }, [grid]);


    const editRow = useCallback(() => {
        setPopUpType("form");
        setEditStateFormStatus(!editStateForm);
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
                console.log("popupmode ADD check");
                // storeTires.insert(option).then(() => {
                //     setSampleTiresGridDisabled(false);
                //     grid.current.instance.refresh(true);
                // });
                dispatchPopup({ type: "hidePopup" });

            }
            else if (popupMode === "Edit") {
                console.log("popupmode EDIT check")
                // storeTires.update(objectSidebarData.id, option).then(() => {
                //     grid.current.instance.refresh(true);
                //     setSampleTiresGridDisabled(false);
                // });
            }
            dispatchPopup({ type: "hidePopup" });
        }
        setEditStateFormStatus(!editStateForm);
    }

    function closeClick(e) {
        setSampleTiresGridDisabled(true);
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

    }, []);

    const menuListActionGrid = useMemo(() => ([
        {
            text: "Tires's dependencies",
            icon: 'edit',
            onClick: openDependencies
        }
    ]), [popUpType]);

    //! 

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

    const formNoteOptions = {
        stylingMode: "outlined",
        autoResizeEnabled: false,
        height: "80px"
    }

    const formTireOutdoorOptions = {
        dataSource: outdoorOptions,
        valueExpr: 'value',
        displayExpr: 'text',
        placeholder: "",
        showClearButton: true
    }



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
                    <h2>Test Types</h2>
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

                    </div>
                </div>
                <div className={'content-block content-overlay'}>
                    <DataGrid
                        id="grid-tires"
                        dataSource={storeTestTypes}
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
                            getGridStructure().data.main.map((attribute) => {
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
                                        <SimpleItem dataField="name" colSpan={2} >
                                            <Label text={`Name`} />
                                        </SimpleItem>
                                        <SimpleItem dataField="outdoor" editorType="dxSelectBox" editorOptions={formTireOutdoorOptions} colSpan={2}>
                                            <Label text={`Outdoor`} />
                                        </SimpleItem>

                                        <EmptyItem colSpan={2} />
                                        <SimpleItem dataField="description" editorType="dxTextArea" editorOptions={formNoteOptions} colSpan={6} >
                                            <Label text={`Description`} />
                                        </SimpleItem>

                                        <SimpleItem dataField="complementaryNeeded" editorType="dxCheckBox" colSpan={2}>
                                            <Label text={`complementary part needed`} location="left" />
                                        </SimpleItem>
                                        <SimpleItem dataField="machineNeeded" editorType="dxCheckBox" colSpan={2}>
                                            <Label text={`complementary part needed`} location="left" />
                                        </SimpleItem>
                                        <SimpleItem dataField="allowWarehouseParts" editorType="dxCheckBox" colSpan={2}>
                                            <Label text={`allow warehouse parts`} location="left" />
                                        </SimpleItem>
                                    </Tab>
                                    <Tab title="Form" colCount={6}>
                                        <div>
                                            <DataGrid
                                                // disabled={sampleTiresGridDisabled}
                                                id="formFormsGrid"
                                                dataSource={storeForms}
                                                showBorders={true}
                                                showRowLines={false}
                                                columnAutoWidth={true}
                                                rowAlternationEnabled={true}
                                                virtualModeEnabled={true}
                                                height={'400px'}
                                                width={'100%'}
                                                repaintChangesOnly={false}
                                                cacheEnabled={false}
                                            >
                                                {/* <StateStoring enabled={true} type="localStorage" storageKey="formFormsgrid" /> */}
                                                <Scrolling mode="virtual" columnRenderingMode="virtual" />
                                                <HeaderFilter visible={true} allowSearch={true} />
                                                <FilterRow visible={false} />
                                                <FilterPanel visible={false} />
                                                <Selection mode="single" />
                                                <SearchPanel visible={true} highlightSearchText={true} />
                                                <Editing mode="popup" allowUpdating={true} allowAdding={true} allowDeleting={true} refreshMode="full">
                                                    <Texts confirmDeleteMessage="Are you sure to delete?" />
                                                    <Popup title="Form" showTitle={true} width="800" height="600" />
                                                    <Form colCount={1}>
                                                        <TabbedItem>
                                                            <TabPanelOptions deferRendering={false} />
                                                            <Tab title="General" colCount={2}>
                                                                <SimpleItem dataField="name" colSpan={2} >
                                                                    <Label text={`Name`} />
                                                                </SimpleItem>
                                                                <SimpleItem dataField="description" colSpan={2}>
                                                                    <Label text={`weqweqwewqeqw`} />
                                                                </SimpleItem>

                                                            </Tab>
                                                            <Tab title="Form" colCount={2}>

                                                            </Tab>

                                                        </TabbedItem>

                                                    </Form>

                                                </Editing>
                                                <Selection mode="single" />
                                                <Column caption="name" dataField="name" dataType="string" >
                                                    <RequiredRule message="Required" />
                                                </Column>
                                                <Column caption="description" dataField="description" dataType="string" >
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
