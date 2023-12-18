import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import '../Styles/ConfirmImportTeamMemberDialog.scss';

interface ConfirmationDialogProps {
  isShow: boolean;
  message: string;
  onDialogClose: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = 
  ({isShow, message, onDialogClose}) => {
    return (
      <div className='confirmImportDialog'>
      <Modal show={isShow} onHide={onDialogClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdzenie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CheckCircleIcon fontSize='small'/>
           <p className='dialogContent'>
            {message}
          </p>
          </Modal.Body>
        <Modal.Footer>
          <button className="dialogHideBtn" onClick={onDialogClose}>
            Ukryj
          </button>
        </Modal.Footer>
      </Modal>
      </div>
  );
}

export default ConfirmationDialog;