import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '34%',
        left: '34%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        border: '2px solid black',
        borderRadius: '6px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        fontFamily: '"Caveat Brush", cursive'
    },
}));

export default function DetailsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleOpen} className='modal-button'>Szczegóły</button>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.paper} style={{ width: "32%"}}  >
                    <h1 className='modalTitle'> Szczegóły: </h1>
                    <div> Nazwa: {props.name} </div>
                    <div> Kolor: {props.color} </div>
                    <div> Wartość pantone: {props.pantone}</div>
                    <div> Rok: {props.year} </div>
                </div>
            </Modal>
        </div>
    );
}
