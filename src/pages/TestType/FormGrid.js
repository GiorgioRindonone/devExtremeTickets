/* 4. Third party dependencies in brackets */
import Autocomplete from "devextreme/ui/autocomplete";
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import { Switch } from 'devextreme-react/switch';
import { TagBox } from 'devextreme-react/tag-box';
import { Button } from "devextreme-react/button";
import { List } from 'devextreme-react/list';
import { TreeList, Column as TreeListColumn } from 'devextreme-react/tree-list';
import DataGrid, {
    MasterDetail, Scrolling, Pager, Paging, RemoteOperations, Column, Editing, Lookup, Texts, Selection, FilterRow, HeaderFilter, FilterPanel, FilterBuilderPopup, SearchPanel, StateStoring, Form, Toolbar,
    Item as ItemGrid,
} from 'devextreme-react/data-grid';
import TabPanel, { Item as ItemPanel } from "devextreme-react/tab-panel";
import { Drawer } from "devextreme-react/drawer";
import { GroupItem, SimpleItem, EmptyItem, Item, RequiredRule, PatternRule, Label, TabbedItem, TabPanelOptions, Tab } from "devextreme-react/form";
import { Form as FormForm } from "devextreme-react/form";
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import TextArea from "devextreme-react/text-area";
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import { SelectBox } from 'devextreme-react/select-box';
import { FieldTagbox } from "../FieldTagbox.js";
import { Template } from 'devextreme-react/core/template';
import TextBox from 'devextreme-react/text-box';
import DropDownBox from 'devextreme-react/drop-down-box';
/* 5. Internal component imports */


export function FormGrid(props) {
    return (
        <>
            <SimpleItem dataField="name" colSpan={2} >
                <Label text={`Name`} />
            </SimpleItem>
            <SimpleItem dataField="description" editorType="dxTextArea" editorOptions={props.formNoteOptions} colSpan={6} >
                <Label text={`Description`} />
            </SimpleItem>
        </>
    )
}