import React, { useCallback, useState, useMemo, useEffect, useRef, useReducer } from "react";
// import { useSidebarProvider } from "../../../contexts/sidebardata.js";

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


import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';


import {
    storeSampleTires,
    storeTires,
    storeExitTypes,
    storeWarehouses,
    storeCompanies,
    storeContacts
} from "../../../stores/storesDevextreme.js";
import { getObject, postObject, patchObject, deleteObject, getByKeyObject, getByKeyObjects } from "../../../api/apiManager.js";
import { initPopupState, popupReducer, formRef, getForm, formRefSide, getFormSide } from "../../../redux-store/reducers/popupForm.js";
import { getGridStructure } from "./GridStructure.js";


export default function SampleTiresTemplate(props) {
    const [objectData, setObjectData] = useState({});
    const [selectedRowIndex, setSelectedRowIndex] = React.useState(-1);

    const [gridSelectId, setGridSelectId] = useState({});
    const [idTire, setIdTire] = useState(null);
    const [{ formData, popupVisible, popupMode }, dispatchPopup] = useReducer(popupReducer, initPopupState)
    const grid2 = useRef(null);

    // const { data, setNewSidebar, setRowIndex, index  } = useSidebarProvider();
    useEffect(() => {
        setIdTire(props.data.key);
    }, [props.data.key]);

    const selectionChangedHandler = useCallback((e) => {
        // e.selectedRowsData[0] && setId(e.selectedRowsData[0].id);
        e.selectedRowsData[0] && setObjectData(e.selectedRowsData[0]);
        setGridSelectId(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
        // console.log("row index da saturno",e.component.getRowIndexByKey(e.selectedRowKeys[0]), "row data da saturno", e.selectedRowsData[0], id);
        // e.selectedRowsData[0] && setNewSidebar(e.selectedRowsData[0])
        // setRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
        setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
        // console.log("props key", props.data.key);
        // console.log("props sel row ind", props);
        // console.log("props data", props.data);
        console.log("e.selectedRowKeys[0]", e.selectedRowKeys[0], "e.component", e.component.getRowIndexByKey());
        console.log("gridSelectId", gridSelectId);
        // console.log("context sidebar data", data);
        // console.log("context sidebar id", index);
        // console.log("props objSide", props.objectSidebarData);
        // console.log("props data", props.data);
        // console.log("props data ta", props.data.data);

        // e.selectedRowsData[0] && props.setObjectSidebarData(e.selectedRowsData[0])
        // props.setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
        // props.sidebar === 0 && props.setSidebar(500);
    }, [props]);


    const { tireid } = props.data.key;
    // const { tireID } = props.data.data;
    const { identifier } = props.data.data;
    console.log("dati del pop da saturno", props.data.data, props.data.key, identifier, tireid);


    // const selectionChangedHandler = useCallback((e) => {
    //     console.log(e.component.getRowIndexByKey(e.selectedRowKeys[0]), e.selectedRowsData[0]);
    // }, []);
    const storeSampleTiresMaster = getSampleTires(props.data.key);

    function getSampleTires(keyP) {
        console.log("key", keyP);
        return (new DataSource({
            store: storeSampleTires,
            filter: ['TireId', '=', keyP],
        }));
    }


    //! NEW GRID HANDLE

    const addRow = useCallback(() => {
        let store = storeSampleTiresMaster.store();
        store.load();
        // setEditState(false);
        grid2.current.instance.option("focusedRowIndex", -1);
        dispatchPopup({
            type: "initPopup",
            data: {
                ...formData,
                ContactId: 1,
                TireId: props.data.key,
            },
            popupMode: "Add"
        });
    }, []);

    const editRow = useCallback(() => {
        const rowData = grid2.current.instance.getSelectedRowsData()[0];
        dispatchPopup({
            type: "initPopup",
            data: rowData,
            popupMode: "Edit"
        })
        grid2.current.instance.option("focusedRowIndex", selectedRowIndex);
    }, []);

    const deleteRow = useCallback(() => {
        grid2.current.instance.deleteRow(selectedRowIndex);
        grid2.current.instance.option("focusedRowIndex", -1);
    }, []);

    //! 
    // function onToolbarPreparing(e) {
    //     let toolbarItems = e.toolbarOptions.items;
    //     // customize addRow toolbar button
    //     for (let i = 0; i < toolbarItems.length; i++) {
    //         let item = toolbarItems[i];
    //         if (item.name === "addRowButton") {
    //             item.options.onClick = addClick;
    //             break;
    //         }
    //     }
    // }

    //!
    // function editClick(e) {
    //     showPopup("Edit", { ...e.row.data });
    // }


    //!
    // function addClick(e) {
    //     showPopup("Add",
    //         {
    //             TireId: id
    //         });
    // }

    function confirmClick(e) {
        let result = getFormSide().validate();
        let store = storeSampleTiresMaster.store();
        store.insert(formData);

        if (result.isValid) {
            if (popupMode === "Add") {
                // cambio lo store con il nuovo oggetto
                store.insert(formData).then(() => {
                    grid2.current.instance.refresh(true);
                });
                dispatchPopup({ type: "hidePopup" });

            }
            else if (popupMode === "Edit") {
                store.update(formData.id, formData).then(() => {
                    grid2.current.instance.refresh(true);
                });
                dispatchPopup({ type: "hidePopup" });
            }
        }
    }

    const confirmBtnOptions = useMemo(() => {
        console.log("updated confirmbtnOptions")
        return {
            text: 'Confirm',
            type: 'success',
            stylingMode: 'contained',
            onClick: confirmClick
        }
    }, [formData]);

    // const cancelBtnOptions = useMemo(() => {
    //     return {
    //         text: 'Cancel',
    //         onClick: cancelClick
    //     }
    // }, []);

    //! 
    function cancelClick(e) {
        dispatchPopup({ type: "hidePopup" })
    }

    //!
    function showPopup(popupMode, data) {
        dispatchPopup({ type: "initPopup", data, popupMode })
    }

    //!
    function onHiding() {
        dispatchPopup({ type: "hidePopup" });
    }

    const formWarehousesOptions = {
        dataSource: storeWarehouses,
        valueExpr: 'id',
        displayExpr: 'name',
    }

    const formNominalTiresOptions = {
        dataSource: storeTires,
        valueExpr: 'id',
        displayExpr: 'identifier',
    }

    const formExitTypesOptions = {
        dataSource: storeExitTypes,
        valueExpr: 'id',
        displayExpr: 'category',
    }

    const formSampleTireIdOptions = {
        readOnly: true,
    }

    const formTireOptions = {
        dataSource: storeTires,
        valueExpr: 'id',
        displayExpr: 'identifier',
        value: { idTire },
        readOnly: false,
    }

    const formIdentifierOptions = {
        readOnly: true
    }

    const formContactOptions = {
        dataSource: storeContacts,
        valueExpr: 'id',
        displayExpr: 'firstName',
        // itemRender: renderName
    }


    return (
        <React.Fragment>
            {/* <div className="master-detail-caption">
                {`${tireID}'s Sample Tires`}
            </div> */}
            <div className={"flex-container-masterview"}>
                <Button
                    className="button-grid-masterview-header"
                    icon="plus"
                    onClick={addRow}
                />
                <Button
                    className="button-grid-masterview-header"
                    icon="edit"
                    onClick={editRow}
                    visible={objectData.id ? true : false}
                />
                {/* <Button
                    icon="trash"
                    onClick={deleteRow}
                    visible={selectedRowIndex !== undefined && selectedRowIndex !== -1}
                /> */}
            </div>

            <DataGrid
                id="grid-sample-tires"
                keyExpr="id"
                ref={grid2}
                dataSource={storeSampleTiresMaster}
                showBorders={true}
                columnAutoWidth={true}
                onSelectionChanged={selectionChangedHandler}
            // onToolbarPreparing={onToolbarPreparing}
            >
                <Editing mode="popup" allowDeleting={true}>
                    <Texts confirmDeleteMessage="are you sure to delete?" />
                </Editing>
                <Selection mode="single" />
                {
                    getGridStructure(storeCompanies, storeWarehouses, storeTires, storeExitTypes, storeContacts).data.main.map((attribute) => {
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
            <Popup
                title={objectData == false ? "Editing Sample " + objectData.number : "Add a Test Sample for " + identifier}
                showTitle={true}
                height="700"
                width="800"
                closeOnOutsideClick={true}
                visible={popupVisible}
                onHiding={onHiding}>
                <ToolbarItem
                    widget="dxButton"
                    location="after"
                    toolbar="bottom"
                    options={confirmBtnOptions}
                />
                <FormForm
                    ref={formRefSide}
                    formData={formData}
                    labelLocation="top"
                    showColonAfterLabel={true}>
                    <TabbedItem>
                        <TabPanelOptions deferRendering={false} />
                        <Tab title="General" colCount={6}>
                            {popupMode === "Edit" ? (
                                <SimpleItem dataField="identifier" editorType="dxNumberBox" editorOptions={formIdentifierOptions} colSpan={1}>
                                    <Label text={`Sample id`} />
                                </SimpleItem>
                            ) : (
                                null
                            )}
                            {popupMode === "Edit" ? (
                                <SimpleItem dataField="number" editorType="dxNumberBox" colSpan={1}>
                                    <Label text={`Sample`} />
                                </SimpleItem>

                            ) : (
                                <SimpleItem dataField="number" editorType="dxNumberBox" colSpan={2}>
                                    <Label text={`Sample`} />
                                </SimpleItem>
                            )}
                            <SimpleItem dataField="TireId" editorType="dxSelectBox" editorOptions={formTireOptions} colSpan={2}>
                                <Label text={`Tire`} />
                            </SimpleItem>
                            <SimpleItem dataField="id" colSpan={1}>
                                <Label text={`id`} />
                                <RequiredRule message="Required" />
                            </SimpleItem>

                            <SimpleItem dataField="productionDate" colSpan={1}>
                                <Label text={`Production date`} />
                                <RequiredRule message="Required" />
                            </SimpleItem>
                            <SimpleItem dataField="manufacturierCode" colSpan={2}>
                                <Label text={`Manufacturier code`} />
                            </SimpleItem>
                            <SimpleItem dataField="madeIn" colSpan={2}>
                                <Label text={`Made in`} />
                                <RequiredRule message="Required" />
                            </SimpleItem>
                            <SimpleItem dataField="weight" colSpan={1}>
                                <Label text={`Weight`} />
                                <RequiredRule message="Required" />
                            </SimpleItem>
                            <SimpleItem dataField="ECE" colSpan={1}>
                                <Label text={`ECE`} />
                            </SimpleItem>
                            <SimpleItem dataField="entryDate" editorType="dxDateBox" colSpan={2} >
                                <Label text={`Entry date`} />
                                <RequiredRule message="Required" />
                            </SimpleItem>
                            <SimpleItem dataField="exitDate" editorType="dxDateBox" colSpan={2} >
                                <Label text={`Exit date`} />
                            </SimpleItem>
                            <SimpleItem dataField="CompaniesId" editorType="dxSelectBox" colSpan={2} >
                                <Label text={`Owner`} />
                            </SimpleItem>
                            <SimpleItem colSpan={2} dataField="ExitTypeId" editorType="dxSelectBox" editorOptions={formExitTypesOptions} >
                                <Label text={`Exit type`} />
                            </SimpleItem>

                            <SimpleItem dataField="ContactId" editorType="dxSelectBox" editorOptions={formContactOptions} colSpan={2}>
                                <Label text={`User Editor`} />
                            </SimpleItem>


                            {/* <SimpleItem dataField="StorageId" editorType="dxSelectBox" colSpan={1} >
                                <Label text={`Companies`} />
                            </SimpleItem> */}

                            <SimpleItem dataField="note" editorType="dxTextArea" colSpan={4} >
                                <Label text={`Note`} />
                            </SimpleItem>
                        </Tab>
                        <Tab title="Dependencies" colCount={2}>
                            <SimpleItem colSpan={1} dataField="WarehouseId" editorType="dxSelectBox" editorOptions={formWarehousesOptions}>
                            </SimpleItem>
                        </Tab>
                    </TabbedItem>
                </FormForm>
            </Popup>


        </React.Fragment>
    );
}



