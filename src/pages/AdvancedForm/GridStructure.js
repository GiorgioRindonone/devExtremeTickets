export function getGridStructure (storeCatalogues, storeApplications, storeNominalRims, storeSampleTypes) {
    return {
    data: {
        main: [
            {
                dataField: "identifier",
                caption: "Tire ID",
                dataType: "string",
                visible: true,
                allowEditing: false,
                allowSorting: true,
            },
            {
                dataField: "CatalogueId",
                caption: "Size",
                visible: true,
                dataType: "string",
                allowEditing: true,
                allowSorting: true,
                lookup: {
                    dataSource: storeCatalogues,
                    valueExpr: "id",
                    displayExpr: "SizeName",
                }
            },
            {
                dataField: "Catalogue.ApplicationAcronym",
                caption: "Application",
                visible: true,
                dataType: "string",
                allowEditing: true,
                allowSorting: true,
                lookup: {
                    dataSource: storeApplications,
                    valueExpr: "acronym",
                    displayExpr: "name",
                }
            },
            {
                dataField: "Catalogue.NominalRimId",
                caption: "Nominal Rim",
                visible: true,
                dataType: "string",
                allowEditing: true,
                allowSorting: true,
                lookup: {
                    dataSource: storeNominalRims,
                    valueExpr: "id",
                    displayExpr: "name",
                }
            },
            {
                dataField: "Catalogue.BrandName",
                caption: "Brand",
                dataType: "strng",
                visible: true,
                allowEditing: false,
                allowSorting: true,
            },
            {
                dataField: "Catalogue.ProductName",
                caption: "Product",
                dataType: "strng",
                visible: true,
                allowEditing: false,
                allowSorting: true,
            },
            {
                dataField: 'SampleTypeAcronym',
                caption: 'Sample type',
                visible: true,
                dataType: 'string',
                allowEditing: true,
                allowSorting: false,
                lookup: {
                    dataSource: storeSampleTypes,
                    valueExpr: 'acronym',
                    displayExpr: 'name',
                }
            },


        ]
    }
}
};
