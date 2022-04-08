/* 1. React import statement and standard module dependencies */
import React, { useCallback, useState, useMemo, useEffect, useRef } from "react";
import 'whatwg-fetch';

/* 2. Standard module dependencies in brackets */
import axios from 'axios';


/* 3. Third party dependencies */
import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from "devextreme/data/data_source";
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import 'devextreme-react/tag-box'
import 'devextreme-react/text-area';

/* 4. Third party dependencies in brackets */
import { useHistory } from "react-router-dom";
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import Toolbar, { Item as ToolbarItem } from 'devextreme-react/toolbar';
import { Switch } from 'devextreme-react/switch';
import { TagBox } from 'devextreme-react/tag-box';
import { Button } from "devextreme-react/button";
import { List } from 'devextreme-react/list';
import { TreeList, Column as TreeListColumn } from 'devextreme-react/tree-list';
import DataGrid, {
    Scrolling, Pager, Paging, RemoteOperations, Column, Editing, Lookup, Texts, Selection, FilterRow, HeaderFilter, FilterPanel, FilterBuilderPopup, SearchPanel, StateStoring, Form, Popup,
} from 'devextreme-react/data-grid';
import TabPanel, { Item as ItemPanel } from "devextreme-react/tab-panel";
import { Drawer } from "devextreme-react/drawer";
import { SimpleItem, Item } from "devextreme-react/form";
import { Form as FormForm } from "devextreme-react/form";
import TextArea from "devextreme-react/text-area";
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import { SelectBox } from 'devextreme-react/select-box';

// import { FieldTagbox } from "../FieldTagbox.js";

/* 5. Internal component imports */

/* 6. Internal components in brackets */


/* 7. Internal functions imports in brackets */
// import handlerGrid from "../handlerData.js";
import { getObject, postObject, patchObject, deleteObject, getByKeyObject } from "../../api/apiManager.js";
// import TagBoxLookupTestTypes from "./TagBoxLookupTestTypes.js";

// import {URL} from "../../api/apiManager.js";

/* 8. Internal global variables imports in brackets */

/* 9. Internal components within same folder (Relative imports) */
// import { TagBoxLookup } from "./TagBoxLookupTestTypes.js";
// import { LogsInfo } from "./LogInfo.js";

/* 10. Stylesheet import */


export default function menuGridActionPanel(props) {

    const menuListActionGrid = (props) => ([
        {
            text: 'Edit',
            icon: 'pencil',
            onClick: props.editRow
        },
        {
            text: 'Delete',
            icon: 'trash',
            onClick: props.deleteRow
        }
    ]);
    
    return (
        <div className={'settings-panel'}>
            <Button
                className={'.menu-action-sidebar-grid'}
                icon="preferences"
            ></Button>
            <ContextMenu
                items={menuListActionGrid}
                target={'.menu-action-sidebar-grid'}
                showEvent={'dxclick'}
                // width={210}
                cssClass={'settings-menu'}
            // onItemClick={onClick}
            >
                <Position my={'top center'} at={'bottom center'} />
            </ContextMenu>
        </div>
    );
}
