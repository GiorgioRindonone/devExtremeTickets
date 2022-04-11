import React from 'react';

import Bullet, {
    Font, Margin, Size, Tooltip,
} from 'devextreme-react/bullet';
import { Button } from "devextreme-react";
// PROBLEM 1 HERE
// title: render a tooltip inside a component like button
// 1) is it possible to render a different thing with the tooltip? I would like to render a circle instead of the bullet for example, but I don't know how to do it
// i am rendering a button now, how could i rendere the tooltip with it?  i am using the hint property but i would want to understand how to render a tooltip inside of it

export default function StatusCell(cellData) {
    return (
        // <Bullet
        //     showTarget={false}
        //     showZeroLevel={true}
        //     value={4}
        //     startScaleValue={0}
        //     endScaleValue={4}
        //     color={(cellData.value === 2) ? `#ffc107` : (cellData.value === 2) ? `#d2604b` : (cellData.value === 2) ? `#6db099` : `#9e9e9e`}
        // >
        //     <Size width={35} height={35} />
        //     <Margin top={5} bottom={0} left={5} />
        //     <Tooltip
        //         enabled={true}
        //         paddingTopBottom={2}
        //         zIndex={5}
        //         customizeTooltip={customizeTooltip}
        //     >
        //         <Font size={18} />
        //     </Tooltip>
        // </Bullet>
        <Button
            hoverStateEnabled={false}
            activeStateEnabled={false}
            icon="isnotblank"
            stylingMode="text"
            hint={(cellData.value === 2) ? `Waiting approval` : (cellData.value === 2) ? `Test in progress` : (cellData.value === 2) ? `Archivied` : `No exit data setted`}
            elementAttr={{ class: (cellData.value === 2) ? `button-status2` : (cellData.value === 3) ? `button-status3` : (cellData.value === 4) ? `button-status4` : `button-status1` }}
        >
            <Size width={35} height={35} />
            <Tooltip
                enabled={true}
                paddingTopBottom={2}
                zIndex={10}
                customizeTooltip={customizeTooltip}
            >
                <Font size={14} />
            </Tooltip>
        </Button>

    );
}

function customizeTooltip(data) {
    return {
        text: (data.value === 2) ? `Waiting approval` : (data.value === 2) ? `Test in progress` : (data.value === 2) ? `Archivied` : `No exit data setted`
    };
}
