import React from 'react';

import Bullet, {
    Font, Margin, Size, Tooltip,
} from 'devextreme-react/bullet';

export default function StatusCell(cellData) {
    return (
        <Bullet
            showTarget={false}
            showZeroLevel={true}
            value={4}
            startScaleValue={0}
            endScaleValue={4}
            color={(cellData.value === 2) ? `#ffc107` : (cellData.value === 2) ? `#d2604b` : (cellData.value === 2) ? `#6db099` : `#9e9e9e`}
        >
            <Size width={35} height={35} />
            <Margin top={5} bottom={0} left={5} />
            <Tooltip
                enabled={true}
                paddingTopBottom={2}
                zIndex={5}
                customizeTooltip={customizeTooltip}
            >
                <Font size={18} />
            </Tooltip>
        </Bullet>
    );
}

function customizeTooltip(data) {
    return {
        text: (data.value === 2) ? `Waiting approval` : (data.value === 2) ? `Test in progress` : (data.value === 2) ? `Archivied` : `No exit data setted`
    };
}
