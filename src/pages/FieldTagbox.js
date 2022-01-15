
import React, { useCallback } from 'react';
import TextBox from 'devextreme-react/text-box';

// function component handling external data source and rendering a list of text in TagBox

export function FieldTagbox(data) {
        return (
        <React.Fragment>
            <div>                
                {
                    data.map((item, id) => {
                        return (
                            <TextBox
                                stylingMode={'filled'}
                                key={id}
                                id={item.id}
                                readOnly={true}
                                value={item.name}
                                placeholder={data.name}
                                label={item.name}
                            />
                        )
                    }
                    )
                }
            </div>
        </React.Fragment>
    );
};

function FieldTagbox2(data) {    
    return (
        <React.Fragment>
            <div>                
                {
                    data.map((item, id) => {
                        return (
                            <TextBox
                                stylingMode={'filled'}
                                key={id}
                                id={item.id}
                                readOnly={true}
                                value={item.name}
                                placeholder={data.name}
                                label={item.name}
                            />
                        )
                    }
                    )
                }
            </div>
        </React.Fragment>
    );
  };
  
  


