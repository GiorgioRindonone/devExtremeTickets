import { states } from "./data.js";
import handlerGrid from "./handlerData.js";

export const datapages={
    machines:{
        main:[
            {
                key: "id",
                dataField: 'name',
                caption: 'Name',
            },
            {
                key: "id",
                dataField: 'year',
                caption: 'Data di creazione',
            },
            {
                key: "id",
                dataField: 'testId',
                caption: 'Running Test',
            },
            {
                key: "id",
                dataField: 'States',
                caption: 'States',
                lookup: {
                    dataSource: states,
                    valueExpr: 'ID',
                    displayExpr: 'Name',
                },
            },
            {
                key: "id",
                dataField: 'TestTypes',
                caption: 'Test Types',
                allowSorting: 'false',
                customizeColumnText: handlerGrid,
            },
            {
                key: "id",
                dataField: 'ip',
                caption: 'ip',
            }
        ]
    },
    sidebar: {

    }
};

