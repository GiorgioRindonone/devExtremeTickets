import React, { useContext, useCallback, useEffect, useState, createContext } from "react";
// import { api } from "./api";
import { log } from "./../utils/consolelog.js";

function SidebarDataProvider(props) {
    //setto il sidebar data
    const [objectSidebarData, setObjectSidebarData] = useState({});
    //setto lo status della sidebar
    const [sidebarMain, setSidebarMain] = useState(true);

    //faccio update del dato 
    const setObjectData = useCallback((data, what) => {
        setObjectSidebarData(data, what);
        log("setObjectData from context", data, objectSidebarData);
    }, []);

    //faccio update del status della sidebar
    const setSidebarMainStatus = useCallback((data) => {
        setSidebarMain(data);
        log("setSidebarMainStatus from context", sidebarMain);
    }, []);

    return (
        <SidebarDataContext.Provider value={{ objectSidebarData, setObjectData, sidebarMain, setSidebarMainStatus }} {...props} />
    );
}

const SidebarDataContext = createContext({});
const useSidebarData = () => useContext(SidebarDataContext);

export { SidebarDataProvider, useSidebarData }
