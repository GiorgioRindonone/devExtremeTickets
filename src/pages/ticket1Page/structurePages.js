import { states } from "./data.js";
// import HandlerGrid from "./HandlerData.js";

export const datapages={
    machines:{
        main:[
            {
                dataField: 'name',
                caption: 'Name',
            },
            {
                dataField: 'year',
                caption: 'Data di creazione',
            },
            {
                dataField: 'testId',
                caption: 'Running Test',
            },
            {
                dataField: 'States',
                caption: 'States',
                lookup: {
                    dataSource: states,
                    valueExpr: 'ID',
                    displayExpr: 'Name',
                },
            },
            {
                dataField: 'TestTypes',
                caption: 'Test Types',
                allowSorting: 'false',
                // customizeColumnText: HandlerGrid,
            },
            {
                dataField: 'ip',
                caption: 'ip',
            }
        ]
    },
    sidebar: {

    }
};

