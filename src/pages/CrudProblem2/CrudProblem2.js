import './CrudProblem2.scss';

import handlerGrid from "../handlerData.js";
import axios from 'axios';

import 'devextreme-react/tag-box'
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Switch } from 'devextreme-react/switch';
import { TagBox } from 'devextreme-react/tag-box';
import { Button } from "devextreme-react/button";
import TagBoxContent from "../TagBoxContent.js";
import { List } from 'devextreme-react/list';
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import {
  TreeList,
  Column as TreeListColumn,
} from 'devextreme-react/tree-list';

import DataGrid, {
  Scrolling, Pager, Paging,
  RemoteOperations,
  Column,
  Editing,
  Lookup,
  Texts,
  Selection,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  FilterBuilderPopup,
  SearchPanel,
  StateStoring,
  Form,
  Popup,
} from 'devextreme-react/data-grid';
import TabPanel, { Item as ItemPanel } from "devextreme-react/tab-panel";
import { Drawer } from "devextreme-react/drawer";
import { SimpleItem, Item } from "devextreme-react/form";
import { Form as FormForm } from "devextreme-react/form";
import TextArea from "devextreme-react/text-area";
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import { SelectBox } from 'devextreme-react/select-box';
import { FieldTagbox } from "../FieldTagbox.js";
import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from "devextreme/data/data_source";
import 'whatwg-fetch';
import 'devextreme-react/text-area';




function App (props) {

}

export default App;
