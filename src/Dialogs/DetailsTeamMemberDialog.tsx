import React, { useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import TeamMember from '../Interfaces/TeamMember';
import '../Styles/DetailsTeamMemberDialog.scss';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditTeamMember from '../Interfaces/EditTeamMember';

interface DetailsTeamMemberDialogProps {
    isShow: boolean;
    member: TeamMember,
    onDialogClose: () => void,
    onSaveChanges: (member: EditTeamMember) => void,
  }

const DetailsTeamMemberDialog: React.FC<DetailsTeamMemberDialogProps> = ({isShow, member, onDialogClose, onSaveChanges}) => {

    const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember>(member);
    const [name, setName] = useState<string>(currentTeamMember.name);
    const [email, setEmail] = useState<string>(currentTeamMember.email);
    const [phone, setPhone] = useState<string>(currentTeamMember.phoneNumber);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [nameIsEditMode, setNameIsEditMode] = useState<boolean>(false);
    const [emailIsEditMode, setEmailIsEditMode] = useState<boolean>(false);
    const [phoneIsEditMode, setPhoneIsEditMode] = useState<boolean>(false);

    useEffect(() => {
        setCurrentTeamMember(member)
        setName(member.name);
        setEmail(member.email);
        setPhone(member.phoneNumber);
    }, [member])

    const clearEditsMode = () => {
      setEditMode(false);
      setNameIsEditMode(false);
      setEmailIsEditMode(false);
      setPhoneIsEditMode(false);
    }

    const clearChanges = () => {
      setName(currentTeamMember.name);
      setEmail(currentTeamMember.email);
      setPhone(currentTeamMember.phoneNumber);
    }

    const onClose = () => {
        onDialogClose();
        clearEditsMode();
        clearChanges();
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.id === 'nameInput') {
        setName(e.target.value);
      }
      if (e.target.id === 'emailInput') {
        setEmail(e.target.value);
      }
      if (e.target.id === 'phoneInput') {
        setPhone(e.target.value);
      }
    }

    const handlCheckBtn = () => {
      if (name === '' || email === '') {
        alert('Imie i adres email nie mogą być puste');
      } else {
        let editTeamMember: EditTeamMember = {
          id: member.id,
          name: name,
          email: email,
          phoneNumber: phone
        };
        onSaveChanges(editTeamMember);
        clearEditsMode();
        }
      }

    return (
        <div>
        <Modal show={isShow} onHide={onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{currentTeamMember.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='row'>
            <div className='col-sm-4'>
              <img className='avatarImg' src={currentTeamMember !== null ? currentTeamMember.photoUrl : ''}/>
               {currentTeamMember.isActive ? <p className='active'>Aktywny</p> : <p className='unactive'>Blokada</p>}
            </div>
            <div className='col-sm-8'>
                       {nameIsEditMode ? 
                       <>
                       <label className='editMemberLabel'>Nazwa*</label>
                       <input className="editMemberInput" type="text" value={name} 
                       id="nameInput" onChange={(onInputChange)}></input>
                       <CheckIcon className='editMemberIcon' onClick={handlCheckBtn}/> 
                       <CloseIcon className='editMemberIcon'
                       onClick={() => { setEditMode(false); setNameIsEditMode(false); setName(currentTeamMember.name)}}/> 
                       </>
                       : 
                       <>
                       <label className='editMemberLabel'>Nazwa</label>
                       <input className="editMemberInputInactive" type="text" value={name} disabled></input>
                       {editMode ?                        
                       <EditIcon className='editMemberIconInactive'/>
                       :
                       <EditIcon className='editMemberIcon' 
                       onClick={() => { setEditMode(true); setNameIsEditMode(true);}}/> }
                       </>}
                       {emailIsEditMode ? 
                       <>
                       <label className='editMemberLabel'>Adres e-mail*</label>
                       <input className="editMemberInput" type="text" value={email} 
                       id="emailInput" onChange={onInputChange}></input>
                       <CheckIcon className='editMemberIcon' onClick={handlCheckBtn}/> 
                       <CloseIcon className='editMemberIcon'
                       onClick={() => { setEditMode(false); setEmailIsEditMode(false); setEmail(currentTeamMember.email)}}/> 
                       </>
                       :
                       <>
                       <label className='editMemberLabel'>Adres e-mail</label>
                       <input className="editMemberInputInactive" type="text" value={email} disabled></input>
                       {editMode ?
                       <EditIcon className='editMemberIconInactive'/>
                       :
                       <EditIcon className='editMemberIcon' 
                       onClick={() => { setEditMode(true); setEmailIsEditMode(true);}}/>
                       }
                       </>}
                <label className='editMemberLabel'>Numer telefonu</label>
                       {phoneIsEditMode ? 
                       <>
                      <input className="editMemberInput" type="text" value={phone} 
                       id="phoneInput" onChange={onInputChange}></input>
                       <CheckIcon className='editMemberIcon' onClick={handlCheckBtn}/> 
                       <CloseIcon className='editMemberIcon'
                       onClick={() => { setEditMode(false); setPhoneIsEditMode(false); setPhone(currentTeamMember.phoneNumber)}}/> 
                       </>
                       : 
                       <>
                       <input className="editMemberInputInactive" type="text" value={phone} disabled></input>
                       {editMode ? 
                       <EditIcon className='editMemberIconInactive'/>
                       :
                       <EditIcon className='editMemberIcon' 
                       onClick={() => {setEditMode(true); setPhoneIsEditMode(true);}}/>
                       }
                       </> 
                       }
                       <label className='editMemberLabel'>Data utworzenia</label>
                <input className="editMemberInputInactive" type="text" value={currentTeamMember.createdDate} 
                       id="createtDateInput" disabled></input>
                       </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
                <button onClick={onClose} className='editMemberCloseBtn'>Zamknij</button>
          </Modal.Footer>
        </Modal>
        </div>
    )
}

export default DetailsTeamMemberDialog;