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

import { SidebarDataProvider, useSidebarData, setEditStateFormStatus, editStateForm  } from "../../../contexts/SidebarDataContext.js";

export default function SampleTiresTemplate(props) {
    const { sidebarMain, setSidebarMainStatus, setEditStateFormStatus, editStateForm  } = useSidebarData();


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

        // PROBLEM HERE 1
        // title: I can't take the right value from the selected row
        // 1) gridSelectId it gives me always -1 when i set it with e.component.getRowIndexByKey(e.selectedRowKeys[0]) maybe am i taking in the wrong method?
        // 2) should i use e.selectedRowKeys[0] or e.component.getRowIndexByKey(e.selectedRowKeys[0]) ? cause the first give me values, but the first row is 1, is it correst?
        e.selectedRowsData[0] && setObjectData(e.selectedRowsData[0]);
        setGridSelectId(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
        setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
        console.log("check e.selectedRowKeys[0]", e.selectedRowKeys[0], "check e.component", e.component.getRowIndexByKey());
        console.log("gridSelectId", gridSelectId);
    }, [props]);


    const { tireid } = props.data.key;
    // const { tireID } = props.data.data;
    const { identifier } = props.data.data;
    console.log("data from the prop grid Tires", props.data.data, props.data.key, identifier, tireid);


    // const selectionChangedHandler = useCallback((e) => {
    //     console.log(e.component.getRowIndexByKey(e.selectedRowKeys[0]), e.selectedRowsData[0]);
    // }, []);
    const storeSampleTiresMaster = getSampleTires(props.data.key);

    function getSampleTires(keyP) {
        console.log("check of the key i am taking from the prop grid", keyP);
        return (new DataSource({
            store: storeSampleTires,
            filter: ['TireId', '=', keyP],
        }));
    }


    //! NEW GRID HANDLE

    const addRow = useCallback(() => {
        setEditStateFormStatus(!editStateForm);
        let store = storeSampleTiresMaster.store();
        store.load();
        // setEditState(false);
        grid2.current.instance.option("focusedRowIndex", -1);

        //PROBLEM HERE 2
        // am i setting the default values in the right way for the new row?
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
        setEditStateFormStatus(!editStateForm);

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

    //!


    //!

    function confirmClick(e) {
        let result = getFormSide().validate();
        let store = storeSampleTiresMaster.store();

        // PROBLEM HERE 3
        // title: i can't take the status of the popupMode from the reducer using the form      
        // 1) i can't take the popupMode anymore, i am having problem to take the popupMode from the popup reducer to do the insert and the update
        // 2) i think the reducer it's not working properly, cause i can't the the popupMode, so i can't do the insert or update
        // 3) if you check the formData, it has not all the datas i insert 


        //if i put the insert here without the control of the popupMode, it works fine, but if i put the insert here with the control of the popupMode, it doesn't work
        // comment this line 156 to check the thing
        console.log("popup mode from sampleTires", popupMode);
        console.log("form data from sampleTires", formData);
        store.insert(formData);

        if (result.isValid) {
            if (popupMode === "Add") {
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
        setEditStateFormStatus(!editStateForm);

    }

    const confirmBtnOptions = useMemo(() => {
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
        displayExpr: 'id',
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



