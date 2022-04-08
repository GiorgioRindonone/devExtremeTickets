// import React, { useCallback, useState, useMemo, useEffect, useRef, useReducer } from "react";
import { getObject, postObject, patchObject, deleteObject, getByKeyObject, getByKeyObjects } from "../api/apiManager";
import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';

const arrCompanies = [
    {
        "id": 1,
        "name": "Trelleborg Tivoli",
        "businessName": null,
        "email": null,
        "phone": null,
        "vat": null,
        "fiscalCode": null,
        "sap": null,
        "defaultCostCentre": null,
        "city": null,
        "fiscalCity": null,
        "state": null,
        "fiscalState": null,
        "country": null,
        "fiscalCountry": null,
        "zipCode": null,
        "address": null,
        "fiscalAddress": null,
        "fiscalZipCode": null,
        "createdAt": "2022-04-06T14:51:31.233Z",
        "updatedAt": "2022-04-06T14:51:31.233Z"
    }
]
export const storeCompanies = new ArrayStore({
    key: "id",
    data: arrCompanies
});

// export const storeCompanies = new CustomStore({
//     key: "id",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async (key) => await getObject("companies", key),
//     update: async (key, values) => await patchObject("companies", key, values),
//     remove: async (key) => await deleteObject("companies", key),
//     insert: async (values) => await postObject("companies", values),
//     byKey: async (key) => { return await getByKeyObject("companies", key, "id") }
// });


const arrContacts = [
    {
        "id": 1,
        "firstName": "admin",
        "lastName": "admin",
        "role": null,
        "telephoneNumber": null,
        "email": "admin@admin.admin",
        "createdAt": "2022-04-06T14:51:31.356Z",
        "updatedAt": "2022-04-06T14:51:31.356Z",
        "LoginId": 1,
        "CompanyId": 1,
        "Login": {
            "id": 1,
            "password": "$argon2id$v=19$m=15360,t=2,p=1$TADdV2HwhS33RXvjN2ZSAQ$gqjp6+vnKL2O3p2x+MQw0wUYcZ3HswRLRjIA2KCr/5I",
            "admin": true,
            "createdAt": "2022-04-06T14:51:31.285Z",
            "updatedAt": "2022-04-06T14:51:31.285Z",
            "Groups": []
        },
        "Company": {
            "id": 1,
            "name": "Trelleborg Tivoli",
            "businessName": null,
            "email": null,
            "phone": null,
            "vat": null,
            "fiscalCode": null,
            "sap": null,
            "defaultCostCentre": null,
            "city": null,
            "fiscalCity": null,
            "state": null,
            "fiscalState": null,
            "country": null,
            "fiscalCountry": null,
            "zipCode": null,
            "address": null,
            "fiscalAddress": null,
            "fiscalZipCode": null,
            "createdAt": "2022-04-06T14:51:31.233Z",
            "updatedAt": "2022-04-06T14:51:31.233Z"
        }
    }
]
export const storeContacts = new ArrayStore({
    key: "id",
    data: arrContacts
});
// export const storeContacts = new CustomStore({
//     key: "id",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async () => await getObject("contacts"),
//     update: async (key, values) => await patchObject("contacts", key, values),
//     remove: async (key) => await deleteObject("contacts", key),
//     insert: async (values) => await postObject("contacts", values),
//     byKey: async (key) => { return await getByKeyObject("contacts", key, "id") }
// });

export const storeLogins = new CustomStore({
    key: "id",
    loadMode: "raw",
    cacheRawData: true,
    load: async (key) => await getObject("logins", key, "?add_pk=true"),
    update: async (key, values) => await patchObject("logins", key, values),
    remove: async (key) => await deleteObject("logins", key),
    insert: async (values) => await postObject("logins", values),
    byKey: async (key) => { return await getByKeyObject("logins", key, "id", "add_pk=true") }
});

export const storeMachineVariables = new CustomStore({
    key: "id",
    loadMode: "raw",
    cacheRawData: true,
    load: async () => await getObject("machine-variables"),
    update: async (key, values) => await patchObject("machine-variables", key, values),
    remove: async (key) => await deleteObject("machine-variables", key),
    insert: async (values) => await postObject("machine-variables", values),
    byKey: async (key) => { return await getByKeyObject("machine-variables", key, "id") }
});

export const storeTestTypes = new CustomStore({
    key: "id",
    loadMode: "raw",
    cacheRawData: true,
    load: async (key) => await getObject("test-types", key, "?add_pk=true"),
    update: async (key, values) => await patchObject("test-types", key, values),
    remove: async (key) => await deleteObject("test-types", key),
    insert: async (values) => await postObject("test-types", values),
    byKey: async (key) => { return await getByKeyObject("test-types", key, "id", "add_pk=true") }
});

// export const storeSizeStructures = new CustomStore({
//     key: "name",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async () => await getObject("size-structures"),
//     update: async (key, values) => await patchObject("size-structures", key, values),
//     remove: async (key) => await deleteObject("size-structures", key),
//     insert: async (values) => await postObject("size-structures", values),
//     byKey: async (key) => { return await getByKeyObject("size-structures", key, "name") }
// });

export const storeCataloguesMain = new CustomStore({
    key: "id",
    loadMode: "raw",
    cacheRawData: true,
    load: async (key) =>
        await getObject("catalogues", key),
    update: async (key, values) => {
        let prevData = await getObject("catalogues", key, "?add_pk=true", "id");
        let prevSizeId = prevData[0].id;
        // console.log(prevData[0], prevSizeId);
        let prevRimPer = await getObject("permitted-rims", key, "?add_pk=true", "CatalogueId");
        let prevLength = prevRimPer.length;
        let actualValues = values.CataloguePermittedRims;
        let actualLength = actualValues.length;
        let boolNewLength = actualLength === 0 ? false : true;
        let boolPrevLength = prevLength === 0 ? false : true;
        console.log("up values", values, "check update rims", prevRimPer, actualValues, prevLength, actualLength, boolPrevLength, boolNewLength);
        await patchObject("catalogues", key, values)

        //prima no e ora si
        if (boolPrevLength === false && boolNewLength === true) {
            // await deleteObject("permitted-rims", key, "CatalogueId");
            for (let i = 0; i < values.CataloguePermittedRims.length; i++) {
                let objectToPost = {};
                let objectNeeded = values.CataloguePermittedRims[i];
                // let testId = await getObject("test-types", SizePermittedRims, "?add_pk=true", "id");
                objectToPost = {
                    CatalogueId: key,
                    NominalRimId: objectNeeded
                };
                // console.log("objectToPost PD", objectToPost);
                await postObject("permitted-rims", objectToPost);
            }
            await patchObject("catalogues", key, values);
        } else if (boolPrevLength == true && boolNewLength === true) {
            await deleteObject("permitted-rims", key, "CatalogueId");
            for (let i = 0; i < values.CataloguePermittedRims.length; i++) {
                let objectToPost = {};
                let objectNeeded = values.CataloguePermittedRims[i];
                // let testId = await getObject("test-types", CataloguePermittedRims, "?add_pk=true", "id");
                objectToPost = {
                    CatalogueId: key,
                    NominalRimId: objectNeeded
                };
                // console.log("objectToPost PD", objectToPost);
                await postObject("permitted-rims", objectToPost);
            }
        } else if (boolPrevLength === true && boolNewLength === false) {
            await deleteObject("permitted-rims", key, "CatalogueId");
        }

    },
    remove: async (key) => await deleteObject("catalogues", key),
    insert: async (values) => {
        console.log("insert size", values);
        let postedObject = await postObject("catalogues", values);
        let key = postedObject.data.id;
        if (values.CataloguePermittedRims) {
            for (let i = 0; i < values.CataloguePermittedRims.length; i++) {
                let objectToPost = {};
                let objectNeeded = values.CataloguePermittedRims[i];
                // let testId = await getObject("test-types", CataloguePermittedRims, "?add_pk=true", "id");
                objectToPost = {
                    CatalogueId: key,
                    NominalRimId: objectNeeded
                };
                // console.log("objectToPost PD", objectToPost);
                await postObject("permitted-rims", objectToPost);
            }
        }
    },
    byKey: async (key) => { return await getByKeyObject("catalogues", key, "id") }
});

//ARRAY STORES ARE USED FOR THE GRID IN ADVANCEDFORM
const arrCatalogues = [
    {
        "id": 1,
        "LI1": 22,
        "LI2": null,
        "SS1": "22",
        "SS2": null,
        "inflationPressure1": 22,
        "inflationPressure2": null,
        "plyrate": "22",
        "tireStrength": null,
        "additionalMarking": null,
        "loadRange": null,
        "TTTL": "Tubeless",
        "note": null,
        "createdAt": "2022-04-06T17:21:07.032Z",
        "updatedAt": "2022-04-06T17:21:07.032Z",
        "SizeName": "Size 1",
        "ApplicationAcronym": "acr",
        "BrandName": "Brand",
        "ProductName": "Product",
        "NominalRimId": 1,
        "TreadTypeName": "Tread Type 1",
        "Size": {
            "name": "Size 1",
            "createdAt": "2022-04-06T17:02:27.173Z",
            "updatedAt": "2022-04-06T17:02:27.173Z"
        },
    },
    {
        "id": 2,
        "LI1": 5,
        "LI2": null,
        "SS1": "22",
        "SS2": null,
        "inflationPressure1": 11,
        "inflationPressure2": null,
        "plyrate": "22",
        "tireStrength": null,
        "additionalMarking": null,
        "loadRange": null,
        "TTTL": "Tube Type",
        "note": null,
        "createdAt": "2022-04-06T17:21:07.032Z",
        "updatedAt": "2022-04-06T17:21:07.032Z",
        "SizeName": "Size 2",
        "ApplicationAcronym": "acr",
        "BrandName": "Brand 2",
        "ProductName": "Product 2",
        "NominalRimId": 2,
        "TreadTypeName": "Tread Type 2",
        "Size": {
            "name": "Size 2",
            "createdAt": "2022-04-06T17:02:27.173Z",
            "updatedAt": "2022-04-06T17:02:27.173Z"
        },
    },

];

export const storeCatalogues = new ArrayStore({
    key: "id",
    data: arrCatalogues
});


// export const storeCatalogues = new CustomStore({
//     key: "id",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async (key) => await getObject("catalogues", key),
//     update: async (key, values) => await patchObject("catalogues", key, values),
//     remove: async (key) => await deleteObject("catalogues", key),
//     insert: async (values) => await postObject("catalogues", values),
//     byKey: async (key) => { return await getByKeyObject("catalogues", key, "id") }
// });


const arrNominalRims = [
    {
        "id": 1,
        "name": "Rim 1",
    },
    {
        "id": 2,
        "name": "Rim 2",
    },
    {
        "id": 3,
        "name": "Rim 3",
    },
];

export const storeNominalRims = new ArrayStore({
    key: "id",
    data: arrNominalRims
});

// export const storeNominalRims = new CustomStore({
//     key: "id",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async (key) => await getObject("nominal-rims", key),
//     update: async (key, values) => await patchObject("nominal-rims", key, values),
//     remove: async (key) => await deleteObject("nominal-rims", key, `id`),
//     insert: async (values) => await postObject("nominal-rims", values),
//     byKey: async (key) => { return await getByKeyObject("nominal-rims", key, "id") }
// });

const arrTreadTypes = [
    {
        "name": "Tread Type 1",
    },
    {
        "name": "Tread Type 2",
    },
    {
        "name": "Tread Type 3",
    },

];

export const storeTreadTypes = new ArrayStore({
    key: "name",
    data: arrTreadTypes
});

// export const storeTreadTypes = new CustomStore({
//     key: "name",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async (key) => await getObject("tread-types", "name"),
//     update: async (key, values) => await patchObject("tread-types", key, values, "name"),
//     remove: async (key) => await deleteObject("tread-types", key, `name`),
//     insert: async (values) => await postObject("tread-types", values),
//     byKey: async (key) => { return await getByKeyObject("tread-types", key, "name") }
// });

const arrSizes = [
    {
        "name": "Size 1",
    },
    {
        "name": "Size 2",
    },
];
export const storeSizes = new ArrayStore({
    key: "name",
    data: arrNominalRims
});

// export const storeSizes = new CustomStore({
//     key: "name",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async (key) => await getObject("sizes", "name"),
//     update: async (key, values) => await patchObject("sizes", key, values, "name"),
//     remove: async (key) => await deleteObject("sizes", key, `name`),
//     insert: async (values) => await postObject("sizes", values),
//     byKey: async (key) => { return await getByKeyObject("sizes", key, "name") }
// });

const arrApplications = [
    {
        "acronym": "acr",
        "name": "Application 1",
    }
]

export const storeApplications = new ArrayStore({
    key: "acronym",
    data: arrApplications
});

// export const storeApplications = new CustomStore({
//     key: "acronym",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async (key) => await getObject("applications", "name"),
//     update: async (key, values) => await patchObject("applications", key, values, "acronym"),
//     remove: async (key) => await deleteObject("applications", key, `acronym`),
//     insert: async (values) => await postObject("applications", values),
//     byKey: async (key) => { return await getByKeyObject("applications", key, "acronym") }
// });

const arrProducts = [
    {
        "name": "Product",
    },
    {
        "name": "Product 2",
    },
];

export const storeProducts = new ArrayStore({
    key: "name",
    data: arrProducts
});


// export const storeProducts = new CustomStore({
//     key: "name",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async (key) => await getObject("products", "name"),
//     update: async (key, values) => await patchObject("products", key, values, "name"),
//     remove: async (key) => await deleteObject("products", key, `name`),
//     insert: async (values) => await postObject("products", values),
//     byKey: async (key) => { return await getByKeyObject("products", key, "name") }
// });

const arrBrands = [
    {
        "name": "Brand",
    },
    {
        "name": "Brand 2",
    },
];
export const storeBrands = new ArrayStore({
    key: "name",
    data: arrBrands
});

// export const storeBrands = new CustomStore({
//     key: "name",
//     loadMode: "raw",
//     cacheRawData: true,
//     load: async (key) => await getObject("brands", "name"),
//     update: async (key, values) => await patchObject("brands", key, values, "name"),
//     remove: async (key) => await deleteObject("brands", key, `name`),
//     insert: async (values) => await postObject("brands", values),
//     byKey: async (key) => { return await getByKeyObject("brands", key, "name") }
// });

//? TIRES 

const arrTires = [
    {
        "id": 1,
        "identifier": "identifier Test",
        "inflationPressure": "inflationPressure",
        "NominalRimId": 1,
        "note": null,
        "createdAt": "2022-04-06T14:51:31.233Z",
        "updatedAt": "2022-04-06T14:51:31.233Z",
        "CatalogueId": 1,
        "SampleTypeAcronym": "acr type 1",
        "Catalogue": {
            "id": 1,
            "LI1": 22,
            "LI2": null,
            "SS1": "22",
            "SS2": null,
            "inflationPressure1": 22,
            "inflationPressure2": null,
            "plyrate": "22",
            "tireStrength": null,
            "additionalMarking": null,
            "loadRange": null,
            "TTTL": "Tubeless",
            "note": null,
            "createdAt": "2022-04-06T17:21:07.032Z",
            "updatedAt": "2022-04-06T17:21:07.032Z",
            "SizeName": "Size 1",
            "ApplicationAcronym": "acr",
            "BrandName": "Brand",
            "ProductName": "Product",
            "NominalRimId": 1,
            "TreadTypeName": "Tread Type 1",
            "Size": {
                "name": "Size 1",
                "createdAt": "2022-04-06T17:02:27.173Z",
                "updatedAt": "2022-04-06T17:02:27.173Z"
            },
        },
        "NominalRim": {
            "id": 1,
            "name": "Rim 1"
        },
    }
];

export const storeTires = new ArrayStore({
    key: "id",
    data: arrTires
});


// export const storeTires = new CustomStore({
//     key: "id",
//     loadMode: 'raw',
//     cacheRawData: true,
//     load: async (key) => await getObject("tires", key),
//     update: async (key, values) => await patchObject("tires", key, values),
//     remove: async (key) => await deleteObject("tires", key),
//     insert: async (values) => await postObject("tires", values),
//     byKey: async (key) => { return await getByKeyObject("tires", key, "id") }
// });

export const storeTireTypes = new CustomStore({
    key: "name",
    loadMode: 'raw',
    cacheRawData: true,
    load: async (key) => await getObject("tire-types", key),
    update: async (key, values) => await patchObject("tire-types", key, values, "name"),
    remove: async (key) => await deleteObject("tire-types", key, `name`),
    insert: async (values) => await postObject("tire-types", values),
    byKey: async (key) => { return await getByKeyObject("tire-types", key, "name") }
});

const arrSampleTires = [
    {
        "id": 1,
        "TireId": 1,
        "identifier": "identifier Tire",
        "number": 1,
        "productionDate": "2023",
        "manufacturierCode": "manufacturierCode",
        "madeIn": "China",
        "weight": 234,
        "ECE": "ECE",
        "note": null,
        "entryDate": "2022-04-06T14:51:31.233Z",
        "exitDate": "2022-04-06T14:51:31.233Z",
        "CompaniesId": 1,
        "ExitTypeId": 1,
        "ContactId": 1,
        "Company": {
            "id": 1,
            "name": "Trelleborg Tivoli",
            "businessName": null,
            "email": null,
            "phone": null,
            "vat": null,
            "fiscalCode": null,
            "sap": null,
            "defaultCostCentre": null,
            "city": null,
            "fiscalCity": null,
            "state": null,
            "fiscalState": null,
            "country": null,
            "fiscalCountry": null,
            "zipCode": null,
            "address": null,
            "fiscalAddress": null,
            "fiscalZipCode": null,
            "createdAt": "2022-04-06T14:51:31.233Z",
            "updatedAt": "2022-04-06T14:51:31.233Z"
        },
        "ExitType": {
            "id": 1,
            "name": "Wharehouse",
        },
        "Contact": {
            "id": 1,
            "firstName": "admin",
            "lastName": "admin",
            "role": null,
            "telephoneNumber": null,
            "email": "admin@admin.admin",
            "createdAt": "2022-04-06T14:51:31.356Z",
            "updatedAt": "2022-04-06T14:51:31.356Z",
            "LoginId": 1,
            "CompanyId": 1,
            "Login": {
                "id": 1,
                "password": "$argon2id$v=19$m=15360,t=2,p=1$TADdV2HwhS33RXvjN2ZSAQ$gqjp6+vnKL2O3p2x+MQw0wUYcZ3HswRLRjIA2KCr/5I",
                "admin": true,
                "createdAt": "2022-04-06T14:51:31.285Z",
                "updatedAt": "2022-04-06T14:51:31.285Z",
                "Groups": []
            },
            "Company": {
                "id": 1,
                "name": "Trelleborg Tivoli",
                "businessName": null,
                "email": null,
                "phone": null,
                "vat": null,
                "fiscalCode": null,
                "sap": null,
                "defaultCostCentre": null,
                "city": null,
                "fiscalCity": null,
                "state": null,
                "fiscalState": null,
                "country": null,
                "fiscalCountry": null,
                "zipCode": null,
                "address": null,
                "fiscalAddress": null,
                "fiscalZipCode": null,
                "createdAt": "2022-04-06T14:51:31.233Z",
                "updatedAt": "2022-04-06T14:51:31.233Z"
            }
        }
    },
];

export const storeSampleTires = new ArrayStore({
    key: "id",
    data: arrSampleTires
});

// export const storeSampleTires = new CustomStore({
//             key: "id",
//             loadMode: 'raw',
//             cacheRawData: true,
//             load: async (key) => await getObject("sample-tires", key),
//             update: async (key, values) => await patchObject("sample-tires", key, values, "id"),
//             remove: async (key) => await deleteObject("sample-tires", key),
//             insert: async (values) => await postObject("sample-tires", values),
//             byKey: async (key) => { return await getByKeyObject("sample-tires", key, "id") }
//         });

const arrSampleTypes = [
    {
        "acronym": "acr type 1",
        "name": "Sample Type 1",
    },
    {
        "acronym": "acr type 2",
        "name": "Sample Type 2",
    }
]
export const storeSampleTypes = new ArrayStore({
    key: "acronym",
    data: arrSampleTypes
});

// export const storeSampleTypes = new CustomStore({
//     key: "acronym",
//     loadMode: 'raw',
//     cacheRawData: true,
//     load: async (key) => await getObject("sample-types", key),
//     update: async (key, values) => await patchObject("sample-types", key, values, "acronym"),
//     remove: async (key) => await deleteObject("sample-types", key, `acronym`),
//     insert: async (values) => await postObject("sample-types", values),
//     byKey: async (key) => { return await getByKeyObject("sample-types", key, "acronym") }
// });


const arrExitTypes = [
    {
        "id": 1,
        "name": "Wharehouse",
    },
];

export const storeExitTypes = new ArrayStore({
    key: "id",
    data: arrExitTypes
});

// export const storeExitTypes = new CustomStore({
//     key: "id",
//     loadMode: 'raw',
//     // cacheRawData: true,
//     load: async (key) => await getObject("exit-types", key),
//     update: async (key, values) => await patchObject("exit-types", key, values),
//     remove: async (key) => await deleteObject("exit-types", key),
//     insert: async (values) => await postObject("exit-types", values),
//     byKey: async (key) => { return await getByKeyObject("exit-types", key, "id") }
// });

export const storeWarehouses = new CustomStore({
    key: "id",
    loadMode: 'raw',
    // cacheRawData: true,
    load: async (key) => await getObject("warehouses"),
    update: async (key, values) => await patchObject("warehouses", key, values),
    remove: async (key) => await deleteObject("warehouses", key),
    insert: async (values) => await postObject("warehouses", values),
    byKey: async (key) => { return await getByKeyObject("warehouses", key, "id") }
});
