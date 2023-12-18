import React from 'react'
import {Box, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
    {icon: <FileCopyIcon/>, name: 'Лом', id: 0},
    {icon: <SaveIcon/>, name: 'Лигатура', id: 1},
];


export default function SpeedDialComponent({addRawMaterialCard, addAdditiveCard}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            sx={{width: "65px"}}
            icon={<SpeedDialIcon/>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.id === 0 ? addRawMaterialCard : addAdditiveCard}
                />
            ))}
        </SpeedDial>
    );
}