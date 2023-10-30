import React, {useContext} from 'react'
import {Context} from '../logic/DataProvider'
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CustomButton from './CustomButton';

function GenericModal({children,btn_txt,btn_style,toggle,open,icon=undefined}) {
    const {GlobalState} = useContext(Context);
    
    const Modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: GlobalState.isMobile?'90%':'40%',
        bgcolor: GlobalState.darkMode?'primary.main':'background.paper',
        boxShadow: 24,
        p: 4,
        border:'none',
        borderRadius:'6px'
      };
  return (
    <>
    <CustomButton 
        variant='outlined' 
        buttonStyles={btn_style}
        clickHandler={toggle}
        text={btn_txt}
        textStyles={{color:'primary.light'}}
        icon={icon}
    />
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        >
        <Fade in={open}>
        <Box sx={Modalstyle}>
            {children}
        </Box>
        </Fade>
    </Modal>
    </>
  )
}

export default GenericModal