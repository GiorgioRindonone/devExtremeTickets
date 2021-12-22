import {useCallback, useState, useMemo } from "react";
import React from 'react';

function HandlerGrid (cellInfo)  {
    // metodo per visualizzare il testo da oggetti iterati nelle colonne
    console.log('ooooooooooooooooooooooooooooooooooooooo',cellInfo);
    // useCallback((cellInfo) => {   
    //     console.log('ooooooooooooooooooooooooooooooooooooooo',cellInfo);
        if (cellInfo.value) {
        
            let cellText = "";
            cellInfo.value.forEach((subject) => {
                cellText += subject.name + ',';
            })
            return cellText.slice(0, cellText.length - 1);
        }
    //     return cellInfo.valueText;
    //     }, []);
    return cellInfo.valueText;
}    

export default HandlerGrid;

