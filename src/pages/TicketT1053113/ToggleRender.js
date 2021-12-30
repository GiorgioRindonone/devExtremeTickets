
import React, { useCallback } from 'react';
import TextBox from 'devextreme-react/text-box';

function FieldTagbox(data) {
    console.log(data);    

    return (
        
        <TextBox
        id={data.id}
        readOnly={true}
        value={data.name}
        placeholder={data.name}
        onClick={(e) => {
            console.log(e.value);
        }}
    />

    );
}

export default FieldTagbox;

