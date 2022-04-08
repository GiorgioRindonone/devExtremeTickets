
export function getGridStructure (storeCompanies, storeWarehouses, storeTires, storeExitTypes, storeContacts) {
    return {
    data: {
        main: [
            {
                dataField: 'number',
                caption: 'Sample',
                visible: true,
                dataType: 'number',
                allowEditing: true,
                allowSorting: true,
            },
            {
                dataField: 'identifier',
                caption: 'Sample ID',
                visible: true,
                dataType: 'string',
                allowEditing: false,
                allowSorting: true,
            },
            {
                dataField: 'TireId',
                caption: ' Tire',
                visible: false,
                dataType: 'string',
                allowEditing: true,
                allowSorting: true,
                lookup: {
                    dataSource: storeTires,
                    valueExpr: 'id',
                    displayExpr: 'tireID',
                }
            },
            {
                dataField: 'productionDate',
                caption: 'Production date',
                visible: true,
                dataType: 'string',
                allowEditing: true,
                allowSorting: true,
            },
            {
                dataField: 'manufacturierCode',
                caption: 'Manufacturier code',
                visible: false,
                dataType: 'string',
                allowEditing: true,
                allowSorting: true,
            },
            {
                dataField: 'madeIn',
                caption: 'Made in',
                visible: true,
                dataType: 'string',
                allowEditing: true,
                allowSorting: true,
            },
            {
                dataField: 'weight',
                caption: 'Weight',
                visible: true,
                dataType: 'string',
                allowEditing: true,
                allowSorting: true,
            },
            {
                dataField: 'ECE',
                caption: 'ECE',
                visible: false,
                dataType: 'string',
                allowEditing: true,
                allowSorting: true,
            },
            {
                dataField: 'note',
                caption: 'Notes',
                visible: false,
                dataType: 'string',
                allowEditing: true,
                allowSorting: false,
            },
            {
                dataField: 'entryDate',
                caption: 'Entry date',
                visible: true,
                dataType: 'date',
                allowEditing: true,
                allowSorting: false,
            },
            {
                dataField: 'exitDate',
                caption: 'Exit Date',
                visible: true,
                dataType: 'date',
                allowEditing: true,
                allowSorting: false,
            },
            {
                dataField: 'ExitTypeId',
                caption: 'Exit type',
                visible: false,
                dataType: 'string',
                allowEditing: true,
                allowSorting: false,
                lookup: {
                    dataSource: storeExitTypes,
                    valueExpr: 'id',
                    displayExpr: 'name',
                }
            },
            {
                dataField: 'ContactId',
                caption: 'User Editor',
                visible: false,
                dataType: 'string',
                allowEditing: true,
                allowSorting: false,
                lookup: {
                    dataSource: storeContacts,
                    valueExpr: 'id',
                    displayExpr: 'name',
                }
            },
            {
                dataField: 'CompaniesId',
                caption: 'Owner',
                dataType: 'string',
                visible: true,
                allowEditing: true,
                allowSorting: true,
                lookup: {
                    dataSource: storeCompanies,
                    valueExpr: 'id',
                    displayExpr: 'name',
                },
            },
        ]
    }
}
};
