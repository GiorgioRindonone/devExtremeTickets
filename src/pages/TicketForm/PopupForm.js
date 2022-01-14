import React, { useCallback } from 'react'
import Form, { SimpleItem, Item } from "devextreme-react/form";
import TextArea from "devextreme-react/text-area";
import { SpeedDialAction } from "devextreme-react/speed-dial-action";
import { SelectBox } from "devextreme-react/select-box";
import { TagBox } from "devextreme-react/tag-box";
import { Button } from "devextreme-react/button";
import { CustomContext } from "../../utils/editFormState.js";


function PopupForm(props) {
    let { togglePopup, objectSidebarData  } = React.useContext(CustomContext);
    return (
        <div>
            <Button name="notify" icon="menu" onClick={togglePopup}></Button>
            <Form colCount={4} formData={objectSidebarData}>
                <SimpleItem dataField="id" colSpan={1} />
                <SimpleItem dataField="name" colSpan={2} />
                <SimpleItem dataField="description" colSpan={3} />
            </Form>
            
        </div>
    )
}

export default PopupForm
