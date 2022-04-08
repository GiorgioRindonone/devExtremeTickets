import React, { useCallback, useRef } from "react";
import DataGrid, {
    // MasterDetail,
    // Scrolling,
    // Pager,
    // Paging,
    // RemoteOperations,
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
    Form,
    Toolbar,
    Item,
} from
    "devextreme-react/data-grid";



// const selectionChangedHandler = useCallback((e) => {
//     e.selectedRowsData[0] && setRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
//     console.log("selectionChangedHandler", rowIndex);
// }, [rowIndex]);

// const deleteRow = useCallback(() => {
//     gridRef.deleteRow(rowIndex);
// }, []);

// const deleteOptions = {
//     icon: 'trash',
//     text: 'Delete',
//     onClick: deleteRow,
//     visible: true
// };
// create and export a grid in a const with a dataSource from props

// export const DependenciesGrid = (props) => {
//     const [rowIndex, setRowIndex] = React.useState(-1);
//     const gridRef = React.createRef();
//     const dataSource = props.dataSource;
//     const columnCaption = props.caption;
//     const columnField = props.dataField;
//     const columnDataType = props.dataType;

//     return (
//         <DataGrid
//             dataSource={dataSource}
//             ref={gridRef}
//             height={"500px"}
//             showBorders={true}
//             showRowLines={false}
//             rowAlternationEnabled={true}
//             allowColumnReordering={true}
//             columnAutoWidth={true}
//             editing={{
//                 allowAdding: true,
//                 allowDeleting: true,
//                 allowUpdating: true,
//                 mode: "form",
//                 useIcons: true,
//                 refreshMode: "full",
//             }}
//             confirmDelete={true}
//             showColumnHeaders={true}
//             virtualModeEnabled={true}
//             selection={{
//                 mode: "single",
//             }}
//             headerFilter={{
//                 allowSearch: true,
//                 visible: true,
//             }}
//             columns={[
//                 {
//                     dataField: `${columnField}`,
//                     caption: `${columnCaption}`,
//                     alignment: "left",
//                     dataType: `${columnDataType}`,
//                     allowEditing: true,
//                     allowFiltering: true,
//                     allowSorting: true,
//                 }
//             ]}
//             filterRow={{
//                 visible: false,
//             }}
//             filterPanel={{
//                 visible: false,
//             }}
//             searchPanel={{
//                 visible: true,
//                 highlightSearchText: true,
//                 placeholder: "Search...",
//             }}
//             scrolling={{
//                 mode: "virtual",
//                 columnRenderingMode: "virtual",
//                 rowRenderingMode: "virtual",

//             }}
//             stateStoring={{
//                 enabled: true,
//                 type: "localStorage",
//                 storageKey: props.gridName,
//             }}
//         />
//     );
// };

// new DataGrid({
//     accessKey: undefined,
//     activeStateEnabled: true,
//     allowColumnReordering: false,
//     allowColumnResizing: false,
//     autoNavigateToFocusedRow: true,
//     cacheEnabled: true,
//     cellHintEnabled: false,
//     columnAutoWidth: true,
//     columnChooser: {
//         allowSearch: false,
//         emptyPanelText: "Drag a column here to hide it",
//         enabled: false,
//         height: 260,
//         mode: "dragAndDrop",
//         searchTimeout: 500,
//         sortOrder: undefined,
//         title: "Column Chooser",
//         width: 250
//     },
//     columnFixing: {
//         enabled: false,
//         texts: {},
//     },
//     columnHidingEnabled: false,
//     columnMinWidth: undefined,
//     columnResizingMode: "nextColumn",
//     columns: [
//         // map trhough the columns from props and create a column for each
//         props.columns.map(column => {
//             return (
//                 {
//                     alignment: undefined,
//                     allowEditing: true,
//                     allowExporting: true,
//                     allowFiltering: true,
//                     allowFixing: false,
//                     allowGrouping: true,
//                     allowHeaderFiltering: true,
//                     allowHiding: false,
//                     allowReordering: true,
//                     allowResizing: true,
//                     allowSearch: true,
//                     allowSorting: true,
//                     autoExpandGroup: false,
//                     buttons: [
//                         {
//                             component: null,
//                             cssClass: null,
//                             disabled: false,
//                             hint: null,
//                             icon: null,
//                             name: null,
//                             onClick: null,
//                             render: null,
//                             template: null,
//                             text: null,
//                             visible: false
//                         }
//                     ],
//                     calculateCellValue: null,
//                     calculateDisplayValue: null,
//                     calculateFilterExpression: null,
//                     calculateGroupValue: null,
//                     calculateSortValue: null,
//                     caption: column.caption,
//                     cellComponent: null,
//                     cellRender: null,
//                     cellTemplate: null,
//                     columns: undefined,
//                     cssClass: undefined,
//                     customizeText: null,
//                     dataField: column.dataField,
//                     dataType: column.dataType,
//                     editCellComponent: null,
//                     editCellRender: null,
//                     editCellTemplate: null,
//                     editorOptions: null,
//                     encodeHtml: true,
//                     falseText: false,
//                     filterOperations: undefined,
//                     filterType: "include",
//                     filterValue: undefined,
//                     filterValues: undefined,
//                     fixed: false,
//                     fixedPosition: undefined,
//                     format: "",
//                     formItem: null,
//                     groupCellComponent: null,
//                     groupCellRender: null,
//                     groupCellTemplate: null,
//                     groupIndex: undefined,
//                     headerCellComponent: null,
//                     headerCellRender: null,
//                     headerCellTemplate: null,
//                     headerFilter: {
//                     },
//                     hidingPriority: undefined,
//                     isBand: undefined,
//                     lookup: {
//                         allowClearing: false,
//                         dataSource: undefined,
//                         displayExpr: undefined,
//                         valueExpr: undefined
//                     },
//                     minWidth: undefined,
//                     name: undefined,
//                     ownerBand: undefined,
//                     renderAsync: false,
//                     selectedFilterOperation: undefined,
//                     setCellValue: null,
//                     showEditorAlways: false,
//                     showInColumnChooser: true,
//                     showWhenGrouped: false,
//                     sortIndex: undefined,
//                     sortingMethod: undefined,
//                     sortOrder: undefined,
//                     trueText: true,
//                     type: null,
//                     validationRules: null,
//                     visible: true,
//                     visibleIndex: undefined,
//                     width: undefined
//                 }
//             )
//         })

//     ],
//     columnWidth: undefined,
//     customizeColumns: null,
//     dataRowComponent: null,
//     dataRowRender: null,
//     dataRowTemplate: null,
//     dataSource: dataSource,
//     dateSerializationFormat: null,
//     disabled: false,
//     editing: {
//         allowAdding: true,
//         allowDeleting: true,
//         allowUpdating: true,
//         changes: [],
//         confirmDelete: true,
//         editColumnName: null,
//         editRowKey: null,
//         form: null,
//         mode: "form",
//         newRowPosition: "viewportTop",
//         popup: null,
//         refreshMode: "reshape",
//         selectTextOnEditStart: false,
//         startEditAction: "click",
//         texts: {
//             addRow: "Add a row",
//             cancelAllChanges: "Discard changes",
//             cancelRowChanges: "Cancel",
//             confirmDeleteMessage: "Are you sure you want to delete this record?",
//             confirmDeleteTitle: "",
//             deleteRow: "Delete",
//             editRow: "Edit",
//             saveAllChanges: "Save changes",
//             saveRowChanges: "Save",
//             undeleteRow: "Undelete",
//             validationCancelChanges: "Cancel changes"
//         },
//         useIcons: false
//     },
//     export: {
//         allowExportSelectedData: false,
//         enabled: false,
//         texts: {
//             exportAll: "Export all data",
//             exportSelectedRows: "Export selected rows",
//             exportTo: "Export"
//         },
//     },
//     filterBuilder: {},
//     filterBuilderPopup: {},
//     filterPanel: {
//         customizeText: null,
//         filterEnabled: true,
//         texts: {
//         },
//         visible: true
//     },
//     filterRow: {
//         applyFilter: "auto",
//         applyFilterText: "Apply filter",
//         betweenEndText: "End",
//         betweenStartText: "Start",
//         operationDescriptions: {
//         },
//         resetOperationText: "Reset",
//         showAllText: "",
//         showOperationChooser: true,
//         visible: false
//     },
//     filterSyncEnabled: "auto",
//     filterValue: null,
//     focusedColumnIndex: -1,
//     focusedRowEnabled: false,
//     focusedRowIndex: -1,
//     focusedRowKey: undefined,
//     focusStateEnabled: false,
//     grouping: {
//         allowCollapsing: true,
//         autoExpandAll: true,
//         contextMenuEnabled: true,
//         expandMode: "rowClick",
//         texts: {
//             groupByThisColumn: "Group by This Column",
//             groupContinuedMessage: "Continued from the previous page",
//             groupContinuesMessage: "Continues on the next page",
//             ungroup: "Ungroup",
//             ungroupAll: "Ungroup All"
//         },
//     },
//     groupPanel: {
//         allowColumnDragging: true,
//         emptyPanelText: "Drag a column header here to group by that column",
//         visible: "auto"
//     },
//     headerFilter: {
//         allowSearch: true,
//         height: 325,
//         searchTimeout: 500,
//         texts: {
//             cancel: "Cancel",
//             emptyValue: "",
//             ok: "Ok"
//         },
//         visible: true,
//         width: 300
//     },
//     height: "500px",
//     highlightChanges: false,
//     hint: undefined,
//     hoverStateEnabled: false,
//     keyboardNavigation: {
//         editOnKeyPress: false,
//         enabled: true,
//         enterKeyAction: "startEdit",
//         enterKeyDirection: "none"
//     },
//     // keyExpr: undefined,
//     loadPanel: {
//         enabled: "auto",
//         height: 90,
//         indicatorSrc: "",
//         shading: false,
//         shadingColor: "",
//         showIndicator: true,
//         showPane: true,
//         text: "Loading...",
//         width: 200
//     },
//     masterDetail: {
//         autoExpandAll: false,
//         component: null,
//         enabled: false,
//         render: null,
//         template: null
//     },
//     noDataText: "No data",
//     onAdaptiveDetailRowPreparing: null,
//     onCellClick: null,
//     onCellDblClick: null,
//     onCellHoverChanged: null,
//     onCellPrepared: null,
//     onContentReady: null,
//     onContextMenuPreparing: null,
//     onDataErrorOccurred: null,
//     onDisposing: null,
//     onEditCanceled: null,
//     onEditCanceling: null,
//     onEditingStart: null,
//     onEditorPrepared: null,
//     onEditorPreparing: null,
//     onExporting: null,
//     onFocusedCellChanged: null,
//     onFocusedCellChanging: null,
//     onFocusedRowChanged: null,
//     onFocusedRowChanging: null,
//     onInitialized: null,
//     onInitNewRow: null,
//     onKeyDown: null,
//     onOptionChanged: null,
//     onRowClick: null,
//     onRowCollapsed: null,
//     onRowCollapsing: null,
//     onRowDblClick: null,
//     onRowExpanded: null,
//     onRowExpanding: null,
//     onRowInserted: null,
//     onRowInserting: null,
//     onRowPrepared: null,
//     onRowRemoved: null,
//     onRowRemoving: null,
//     onRowUpdated: null,
//     onRowUpdating: null,
//     onRowValidating: null,
//     onSaved: null,
//     onSaving: null,
//     onSelectionChanged: null,
//     pager: {
//         allowedPageSizes: "auto",
//         displayMode: "adaptive",
//         infoText: "Page {0} of {1} ({2} items)",
//         showInfo: false,
//         showNavigationButtons: false,
//         showPageSizeSelector: false,
//         visible: "auto"
//     },
//     paging: {
//         enabled: true,
//         pageIndex: 0,
//         pageSize: 20
//     },
//     remoteOperations: {
//         filtering: false,
//         grouping: false,
//         groupPaging: false,
//         paging: false,
//         sorting: false,
//         summary: false
//     },
//     renderAsync: false,
//     repaintChangesOnly: false,
//     rowAlternationEnabled: false,
//     rowDragging: {
//         allowDropInsideItem: false,
//         allowReordering: false,
//         autoScroll: true,
//         boundary: undefined,
//         container: undefined,
//         cursorOffset: {
//         },
//         data: undefined,
//         dragComponent: null,
//         dragDirection: "both",
//         dragRender: null,
//         dragTemplate: undefined,
//         dropFeedbackMode: "indicate",
//         filter: "> *",
//         group: undefined,
//         handle: "",
//         onAdd: null,
//         onDragChange: null,
//         onDragEnd: null,
//         onDragMove: null,
//         onDragStart: null,
//         onRemove: null,
//         onReorder: null,
//         scrollSensitivity: 60,
//         scrollSpeed: 30,
//         showDragIcons: true
//     },
//     rtlEnabled: false,
//     scrolling: {
//         columnRenderingMode: "virtual",
//         mode: "virtual",
//         preloadEnabled: false,
//         renderAsync: true,
//         rowRenderingMode: "virtual",
//         scrollByContent: true,
//         scrollByThumb: false,
//         showScrollbar: "onHover",
//         useNative: "auto"
//     },
//     searchPanel: {
//         highlightCaseSensitive: false,
//         highlightSearchText: true,
//         placeholder: "Search...",
//         searchVisibleColumnsOnly: true,
//         text: "",
//         visible: true,
//         width: 100
//     },
//     selectedRowKeys: null,
//     selection: {
//         allowSelectAll: true,
//         deferred: false,
//         mode: "none",
//         selectAllMode: "allPages",
//         showCheckBoxesMode: "onClick"
//     },
//     selectionFilter: [],
//     showBorders: true,
//     showColumnHeaders: true,
//     showColumnLines: true,
//     showRowLines: true,
//     sortByGroupSummaryInfo: [
//         {
//             groupColumn: undefined,
//             sortOrder: undefined,
//             summaryItem: undefined
//         }
//     ],
//     sorting: {
//         ascendingText: "Sort Ascending",
//         clearText: "Clear Sorting",
//         descendingText: "Sort Descending",
//         mode: "single",
//         showSortIndexes: true
//     },
//     stateStoring: {
//         customLoad: null,
//         customSave: null,
//         enabled: true,
//         savingTimeout: 2000,
//         storageKey: props.gridName,
//         type: "localStorage"
//     },
//     summary: {
//         calculateCustomSummary: null
//         ,
//         groupItems: [
//             {
//                 alignByColumn: false,
//                 column: undefined,
//                 customizeText: null,
//                 displayFormat: undefined,
//                 name: undefined,
//                 showInColumn: undefined,
//                 showInGroupFooter: false,
//                 skipEmptyValues: null,
//                 summaryType: undefined,
//                 valueFormat: undefined
//             }
//         ],
//         recalculateWhileEditing: false
//         ,
//         skipEmptyValues: true
//         ,
//         texts: {
//             avg: "Avg={0}",
//             avgOtherColumn: "Avg of {1} is {0}",
//             count: "Count={0}",
//             max: "Max={0}",
//             maxOtherColumn: "Max of {1} is {0}",
//             min: "Min={0}",
//             minOtherColumn: "Min of {1} is {0}",
//             sum: "Sum={0}",
//             sumOtherColumn: "Sum of {1} is {0}"
//         },
//         totalItems: [
//             {
//                 alignment: undefined,
//                 column: undefined,
//                 cssClass: undefined,
//                 customizeText: null,
//                 displayFormat: undefined,
//                 name: undefined,
//                 showInColumn: undefined,
//                 skipEmptyValues: null,
//                 summaryType: undefined,
//                 valueFormat: undefined
//             }
//         ],
//     },
//     tabIndex: 0,
//     toolbar: {
//         disabled: false,
//         items: ["addRowButton", {
//             name: "columnChooserButton",
//             locateInMenu: "auto",
//         }]
//         ,
//         visible: true
//     },
//     twoWayBindingEnabled: true,
//     visible: true,
//     width: undefined,
//     wordWrapEnabled: false
// })

// const DependenciesGrid = (props) => {
//     return (
//         <React.Fragment>
            // <DataGrid
            //     dataSource={props.store}
            //     showBorders={true}
            //     columnAutoWidth={true}
            //     height={'100%'}>
            //     <HeaderFilter visible={true} />
            //     <FilterRow visible={true} />
            //     <FilterPanel visible={true} />
            //     <Selection mode="single" />
            //     <Paging defaultPageSize={6} />
            //     <Pager showNavigationButtons={true} />
            //     <Editing mode="cell" width="400" allowUpdating={true} allowAdding={true} allowDeleting={true}>
            //         <Texts confirmDeleteMessage="are you sure to delete?" />
            //     </Editing>
            //     <Selection mode="single" />
            //     <Column dataField="name" dataType="string" />
            //     <Toolbar>
            //         <Item name="addRowButton" showText="always" />
            //     </Toolbar>
            // </DataGrid>

//         </React.Fragment>

//     )
// }
