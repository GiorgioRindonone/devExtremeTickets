import './gridCRUD.scss';

//! UNCOMMENT THIS TO MAKE IT LIKE BEFORE
import {
    // machines, 
    directions,
    states,
    // testTypes, 
    logs,
    status,
    tests,
    // companies, 
    // machineVariables 
} from "../data.js";



// import { datapages } from "../structurePages.js"
import handlerGrid from "../handlerData.js";
import 'devextreme-react/tag-box'
import { useCallback, useState, useMemo } from "react";
import React from 'react';
import { Switch } from 'devextreme-react/switch';
import { TagBox } from 'devextreme-react/tag-box';
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
import { FieldTagbox } from "../FieldTagbox.js";
import CustomStore from 'devextreme/data/custom_store';

const optionDirections = ['auto', 'up', 'down'];

//setted the url cause if i put like https://192.168.1.32:8080/ it will return https://192.168.1.32:8080/machines/https://192.168.1.32:8080/machines I DON T KNOW WHY
const URL = '';
//! COMMENT THIS TO USE THE data.js
// call API
const sendRequest = (url, method = 'GET', data = {}) => {

    if (method === 'GET') {
        return fetch(url, {
            method,
            credentials: 'include',
        }).then((result) => result.json().then((json) => {
            if (result.ok) return json.data;
            throw json.Message;
        }));
    }

    const params = Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');

    return fetch(url, {
        method,
        body: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        credentials: 'include',
    }).then((result) => {
        if (result.ok) {
            return result.text().then((text) => text && JSON.parse(text));
        }
        return result.json().then((json) => {
            throw json.Message;
        });
    });
}

// machines 
// testTypes
//// tests
// companies
// machineVariables

const machines = new CustomStore({
    key: 'id',
    // loadMode: 'raw',
    load: () => sendRequest(`${URL}/machines`),
    insert: (values) => sendRequest(`${URL}/machines`, 'POST', {
        values: JSON.stringify(values),
    }),
    update: (key, values) => sendRequest(`${URL}/machines?id[eq]=${key}`, 'PUT', {
        key,
        values: JSON.stringify(values),
    }),
    remove: (key) => sendRequest(`${URL}/machines?id[eq]=${key}`, 'DELETE', {
        key,
    }),
});

// const machines = new DataSource({
//   store: machinesArray,
// });

const machineVariables = new CustomStore({
    key: 'id',
    // loadMode: 'raw',
    load: () => sendRequest(`${URL}/machine-variables`),
    insert: (values) => sendRequest(`${URL}/machine-variables`, 'POST', {
        values: JSON.stringify(values),
    }),
    update: (key, values) => sendRequest(`${URL}/machine-variables?id[eq]=${key}`, 'PUT', {
        key,
        values: JSON.stringify(values),
    }),
    remove: (key) => sendRequest(`${URL}/machine-variables?id[eq]=${key}`, 'DELETE', {
        key,
    }),
});

const testTypes = new CustomStore({
    key: 'id',
    loadMode: 'raw',
    load: () => sendRequest(`${URL}/test-types`),
    insert: (values) => sendRequest(`${URL}/test-types`, 'POST', {
        values: JSON.stringify(values),
    }),
    update: (key, values) => sendRequest(`${URL}/test-types?id[eq]=${key}`, 'PUT', {
        key,
        values: JSON.stringify(values),
    }),
    remove: (key) => sendRequest(`${URL}/test-types?id[eq]=${key}`, 'DELETE', {
        key,
    }),
});


const companies = new CustomStore({
    key: 'id',
    loadMode: 'raw',
    load: () => sendRequest(`${URL}/companies`),
    insert: (values) => sendRequest(`${URL}/companies`, 'POST', {
        values: JSON.stringify(values),
    }),
    update: (key, values) => sendRequest(`${URL}/companies?id[eq]=${key}`, 'PUT', {
        key,
        values: JSON.stringify(values),
    }),
    remove: (key) => sendRequest(`${URL}/companies?id[eq]=${key}`, 'DELETE', {
        key,
    }),
});






// render logs per machines
function LogsInfo(item) {
    return (
        <React.Fragment>
            <div className="logs-info">
                <div className='dx-tab-text'>
                    <span><b>{item.dateandtime}</b></span>
                </div>
                <div className='log-text'>
                    <span>{item.message}</span>
                </div>

            </div>
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
    const [gridVariabili, setGridVariabili] = React.useState(null);
    const [sidebar, setSidebar] = React.useState(0);

    const selectionChangedHandler = (e) => {
        setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
        setFocusedRowKey(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
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
        return function (data) {
            return (data.TestTypes || []).indexOf(filterValue) !== -1;
        };
    }

    const testTypesEditorOptions = { dataSource: testTypes, valueExpr: 'name', displayExpr: 'Name', readOnly: true };

    const datapages = {
        machines: {
            main: [
                {
                    dataField: 'name',
                    caption: 'Name',
                    dataType: 'string',
                    visible: true,
                },
                {
                    dataField: 'year',
                    caption: 'Data di creazione',
                    dataType: 'date',
                    visible: true,
                },
                {
                    dataField: 'testId',
                    caption: 'Running Test',
                    dataType: 'string',
                    visible: false,
                },
                {
                    dataField: 'CompanyId',
                    caption: 'Vendor',
                    dataType: 'string',
                    visible: true,
                    lookup: {
                        dataSource: companies,
                        valueExpr: 'id',
                        displayExpr: 'name',
                    },
                },
                {
                    dataField: 'ip',
                    caption: 'Ip',
                    dataType: 'string',
                    visible: false,
                },
                {
                    dataField: 'port',
                    caption: 'Porta',
                    dataType: 'number',
                    visible: false,
                },
                {
                    dataField: 'kWhConsumption',
                    caption: 'Consumo kWh',
                    dataType: 'number',
                    visible: false,
                },
                {
                    dataField: 'length',
                    caption: 'Lunghezza (m)',
                    dataType: 'number',
                    visible: false,
                },
                {
                    dataField: 'width',
                    caption: 'Larghezza (m)',
                    dataType: 'number',
                    visible: false,
                },
                {
                    dataField: 'depth',
                    caption: 'Profondità (m)',
                    dataType: 'number',
                    visible: false,
                },
                {
                    dataField: 'max_tests',
                    caption: 'Sides',
                    dataType: 'number',
                    visible: false,
                },
                {
                    dataField: 'Machineriables',
                    caption: 'Variabili',
                    dataType: 'string',
                    visible: false,
                    lookup: {
                        dataSource: machineVariables,
                        valueExpr: 'id',
                        displayExpr: 'name',
                    },
                },
                {
                    dataField: 'connected',
                    caption: 'Connected',
                    dataType: 'boolean',
                    visible: true,
                },
            ]
        },
        sidebar: {
            main: [
                {
                    itemPanel: {
                        title: 'Overview',
                        form: {
                            colCount: 2,
                            FormData: objectSidebarData,
                            simpleItem: {
                                dataField: 'name',
                                colSpan: 2,
                                disabled: "true",
                            },
                            simpleItem: {
                                dataField: 'notes',
                                colSpan: 2,
                                disabled: "true",
                            },
                            simpleItem: {
                                dataField: 'year',
                                colSpan: null,
                                disabled: "true",
                            }
                        },
                        textArea: {
                            defaultValue: objectSidebarData.notes,
                            disabled: "true",
                        },
                    },
                },
                {
                    itemPanel: {
                        title: 'Stats',
                        textArea: {
                            defaultValue: objectSidebarData.notes,
                            disabled: "true",
                        },
                    },
                },
                {
                    itemPanel: {
                        title: 'Capabilities',
                        textArea: {
                            defaultValue: objectSidebarData.notes,
                            disabled: "true",
                        },
                    },
                },
                {
                    itemPanel: {
                        title: 'Logs',
                        textArea: {
                            defaultValue: objectSidebarData.notes,
                            disabled: "true",
                        },
                    },
                },

            ]
        }
    };


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
                    <div className={"content-block-sidebar-right"}>
                        <div className={"sidebar-container-machines"}>
                            <div className={"flex-container-sidebar"}>
                                <h2>{objectSidebarData.name ? objectSidebarData.name : "Select a machine"}</h2>
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

                            <TabPanel className="tabpanel-sidebar machine-container-height ">
                                <ItemPanel title="Overview" >
                                    <div className="scrollable-container-machines">
                                        {/* <TagBox
                      dataSource={companies}
                      valueExpr='id'
                      displayExpr='name'
                      readOnly={true}
                      value={objectSidebarData.CompanyId}
                    /> */}

                                        <Form colCount={2} formData={objectSidebarData}>
                                            <SimpleItem colSpan={2} dataField="name" disabled="true" />
                                            <SimpleItem colSpan={1} dataField="year" disabled="true" />
                                            <SimpleItem colSpan={1} dataField="company" disabled="true" />
                                            <SimpleItem dataField="kWh_consumption" disabled="true" />
                                            <SimpleItem dataField="max_tests" disabled="true" />
                                            <SimpleItem dataField="ip" disabled="true" />
                                            <SimpleItem dataField="port" disabled="true" />
                                            <SimpleItem colSpan={2} dataField="notes" disabled="true" />

                                        </Form>
                                    </div>
                                </ItemPanel>
                                <ItemPanel title="Variables">
                                    <div className="scrollable-container-machines">
                                        <div>
                                            {/* <div className='dx-tab-text'>
                        <span>Variables</span>
                      </div> */}
                                            <DataGrid
                                                id="gridvariabili"
                                                dataSource={machineVariables}
                                                keyExpr="id"
                                                height={450}
                                                // ref={(ref) => { setGridVariabili(ref); }}
                                                showBorders={true}
                                                focusedRowEnabled={true}
                                            >
                                                <Selection mode="single" />
                                                <SearchPanel visible={true} />

                                                <Editing mode="popup" width="300px" allowAdding={true} allowDeleting={true} allowUpdating={true}>
                                                    <Texts confirmDeleteMessage="are you sure to delete?" />
                                                </Editing>
                                                <Column
                                                    dataField="MachineId"
                                                    caption="Machines"
                                                    dataType="string">
                                                    <Lookup
                                                        dataSource={machines}
                                                        valueExpr="id"
                                                        displayExpr="name"
                                                    />
                                                </Column>
                                                <Column
                                                    dataField="name"
                                                    caption="Name"
                                                    dataType="string"
                                                    allowSorting={true}
                                                />
                                                <Column
                                                    dataField="value"
                                                    caption="Value"
                                                    allowSorting={true}
                                                    dataType="number"
                                                />

                                            </DataGrid>

                                        </div>
                                    </div>

                                </ItemPanel>
                                <ItemPanel title="Capabilities" className="dx-scrollable-content">
                                    <div >
                                        <div>
                                            <div className='dx-tab-text'>
                                                <span>Test Types</span>
                                            </div>
                                            <TagBox
                                                dataSource={testTypes}
                                                valueExpr='id'
                                                displayExpr='name'
                                                readOnly={true}
                                                value={objectSidebarData.TestTypes}
                                                fieldRender={FieldTagbox} />




                                        </div>

                                    </div>
                                </ItemPanel>
                                <ItemPanel title="Logs" badge="new" className="dx-scrollable-content">
                                    <List
                                        dataSource={logs}
                                        searchEnabled={true}
                                        height="100%"
                                        pageLoadMode="scrollBottom"
                                        searchMode="contains"
                                        searchExpr="message"
                                        itemRender={LogsInfo}>
                                    </List>

                                </ItemPanel>
                            </TabPanel>
                        </div>

                        <div className='container-padding'>
                            <div className='sidebar-footer-machines'>
                                <div className='flex-row'>
                                    {/* <Form colCount={2} formData={objectSidebarData}>
                    <SimpleItem colSpan={1} dataField="name" disabled="true" />

                  </Form> */}
                                    <div>
                                        <div className='dx-tab-text'>
                                            <span>{objectSidebarData.TestId ? "Test in progress:" : "No test in progress"}</span>
                                        </div>
                                        <TagBox
                                            dataSource={tests}
                                            valueExpr='id'
                                            displayExpr='name'
                                            readOnly={true}
                                            value={objectSidebarData.TestTypes}
                                        />
                                    </div>

                                    <div className='flex-column'>
                                        <div className="dx-tab-text"><span>{objectSidebarData.connected ? "Connected" : "Not connected"}</span></div>
                                        <div className="dx-field-value">
                                            <Switch
                                                value={objectSidebarData.connected}
                                            // readOnly={true}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
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
                            dataSource={machines}
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
                            <SearchPanel visible={true} />
                            <Selection mode="single" />
                            <Editing mode="popup" width="300px">
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
                                visible={false}>
                                <Lookup
                                    dataSource={testTypes}
                                    valueExpr="id"
                                    displayExpr="name"
                                />
                            </Column>
                            {
                                datapages.machines.main.map((attribute) => {
                                    return <Column alignment='left' dataField={attribute.dataField} caption={attribute.caption ? attribute.caption : attribute.dataField} allowSorting={attribute.allowSorting ? attribute.allowSorting : null} customizeText={attribute.customizeColumnText ? attribute.customizeColumnText : null} dataType={attribute.dataType ? attribute.dataType : null} visible={attribute.visible ? attribute.visible : null}>
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


// problem one: the API CALL is not working and the data isn't loaded
// problem two: in the tagbox in line 565 i can't unrderstand why if i pass the same  fieldRender={FieldTagbox} as in the one at 524, it doesn't work and crash...
// problem three: the back end is telling me different errors.

// [ERR_HTTP_HEADERS_SENT]: cannot remove headers after they are sent to the client... what does it means?
// another error is: unhandlepromisedrejectionwarning: unhandled promise rejection.
// the last one in console log,: uncaught (in promise) TypeError
// another one is W1011 - The "keyExpre" option is not applied when datasource is not an array -.... i've tried to check online this thing but i didn't fix
// the data structure is the same i reproduced in the file data.js  so i can't understand what's the problem... 



