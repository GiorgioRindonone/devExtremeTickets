export function getGridStructure (storeCatalogues, storeApplications, storeNominalRims, storeSampleTypes) {
    return {
    data: {
        main: [
            {
                dataField: "name",
                caption: "Name",
                dataType: "string",
                visible: true,
                allowEditing: true,
                allowSorting: true,
            },
            {
                dataField: "outdoor",
                caption: "Outdoor",
                dataType: "boolean",
                visible: true,
                allowEditing: true,
                allowSorting: true,
            },

            // {
            //     dataField: "CatalogueId",
            //     caption: "Size",
            //     visible: true,
            //     dataType: "string",
            //     allowEditing: true,
            //     allowSorting: true,
            //     lookup: {
            //         dataSource: storeCatalogues,
            //         valueExpr: "id",
            //         displayExpr: "SizeName",
            //     }
            // },


        ]
    }
}
};
