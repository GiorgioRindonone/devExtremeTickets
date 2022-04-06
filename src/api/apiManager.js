import axios from 'axios';
import { useCallback, useState, useMemo, useEffect } from 'react';
import notify from 'devextreme/ui/notify';
// import toast, { Toaster } from 'react-hot-toast';
export const URL = ``;

const api = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  responseType: 'json',
});

/* CRUD API */
// what is the object to call, for example machines

/* COMANDI 
!! customEndPoint options:
?add_pk=true (ritorna lista con key primaria dove ci sono più elementi)
?raw=true
!! primaryKey (è la chiave primaria utilizzata per filtrare i dati nell'URI ad esempio id, name, etc)

?? esempio di chiamata:
what = machines
customEndPoint = ?add_pk=true
primaryKey = id
key = 1
URL/${what}${customEndPoint ? customEndPoint : ''}?${primaryKey}[eq]=${key}
diventa 
URL/machines?add_pk=true?id[eq]=1
*/


export async function logOut(what) {
  return await api.get(`${URL}/${what}`)
    .then((response) => {
      // console.log("get" + " from " + `${what}`, key && key, response.data);
      // response.status == "Error: Request failed with status code 404" ? response.data = {} : 
      return response.data
    })
    .catch(error => {
      // console.log(error);
      // console.log(error.response);
      if (error) {        
        // notify(`${`${what}`+ ` ` + `${error.response.statusText}`}`, 'error', 2000);
        // toast.error(`${`${what}`+ ` ` + `${error.response.statusText}`}`);
      }  
      // console.log("get" + " from " + `${what}`, error.response);
      return [];
    })
};


//GET
export async function getObject(what, key, customEndPoint, primaryKey) {
  return await api.get(`${URL}/${what}${customEndPoint ? customEndPoint : ``}${primaryKey ? `?${primaryKey}[eq]=${key}` : ``}`)
    .then((response) => {
      // console.log("get" + " from " + `${what}`, key && key, response.data);
      // response.status == "Error: Request failed with status code 404" ? response.data = {} : 
      return response.data
    })
    .catch(error => {
      // console.log(error);
      // console.log(error.response);
      if (error) {        
        // notify(`${`${what}`+ ` ` + `${error.response.statusText}`}`, 'error', 2000);
        // toast.error(`${`${what}`+ ` ` + `${error.response.statusText}`}`);
      }  
      // console.log("get" + " from " + `${what}`, error.response);
      return [];
    })
};

//POST
export async function postObject(what, values, customEndPoint) {
  return await api.post(`${URL}/${what}${customEndPoint ? customEndPoint : ''}`, values)
    .then((response) => {
    //   toast.success(`Success insert for ${what}`);
      // console.log("post" + " from " + `${what}` + " with " + values, response.data);
      return response;
    })
    .catch(error => {
    //   toast.error(`Error insert for ${what} with error ${error.response}`);
      // console.log("Success insert" + " for " + `${what}`, error);
    })
};

//PATCH
export async function patchObject(what, key, values, focus, customEndPoint) {
  return await api.patch(`${URL}/${what}${customEndPoint ? customEndPoint : ''}?${focus ? focus : 'id'}[eq]=${key}`, values)
    .then(() => {
      // console.log("patch" + " from " + `${what}` + " with " + values);
    //   toast.success("Success patch" + " for " + `${what}` );
    })
    .catch(error => {
    //   toast.error(`${`${what}`+ ` ` + `${error.response.data}`}`);
      // console.log("patch" + " from " + `${what}`, error.response);
    })
};

//DELETE
export async function deleteObject(what, key, customObject) {
  return await api.delete(`${URL}/${what}?${customObject ? customObject : `id`}[eq]=${key}`)
    .then(() => {
    //   toast.success("Success delete" + " for " + `${what}` );
      // console.log("delete" + " from " + `${what}` + " with " + key);
    })
    .catch(error => {
    //   toast.error(`${`${what}`+ ` ` + `${error.response.data}`}`);
      // return console.log("delete" + " from " + `${what}`, error);
    })
};

//BYKEY
export async function getByKeyObject(what, key, primaryKey, customEndPoint) {
  // console.log("questa è la KEEYYYYYY", key, what);
  return await api.get(`${URL}/${what}${customEndPoint ? customEndPoint : ''}?${primaryKey}[eq]=${key}`)
    // .then((response) => {
    //   console.log("byKey" + " from " + `${what}` + " with " + key, response);})
    // .then((response)  => response.json())
    .then((response) => {
      // console.log("byKey" + " from " + `${what}` + " with " + key, response);
      return response.data[0];
    })
    .catch(error => {
      // console.log("byKey" + " from " + `${what}`, error);
      return [];
    })
};

export async function getByKeyObjects(what, key, primaryKey, customEndPoint) {
  // console.log("questa è la KEEYYYYYY", key, what);
  return await api.get(`${URL}/${what}${customEndPoint ? customEndPoint : ''}?${primaryKey}[eq]=${key}`)
    // .then((response) => {
    //   console.log("byKey" + " from " + `${what}` + " with " + key, response);})
    // .then((response)  => response.json())
    .then((response) => {
      // console.log("byKey multiple" + " from " + `${what}` + " with " + key, response);
      return response.data;
    })
    .catch(error => {
      // console.log("byKey multiple" + " from " + `${what}`, error);
      return [];
    })
};










