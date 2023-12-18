import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../Styles/AddTeamMemberDialog.scss';
import img1 from '../images/customAvatar.png';
import axios from 'axios';
import AddTeamMember from '../Interfaces/AddTeamMember';
import DownloadingIcon from '@mui/icons-material/Downloading';

interface AddTeamMemberDialogProps {
    isShow: boolean;
    onDialogClose: () => void,
    onAddMember: (teamMember: AddTeamMember) => void,
  }
  
  const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({isShow, onDialogClose, onAddMember}) => {

    const autoFillUrl = 'https://localhost:7218/TeamMember/GetRandomDto'

    const [image, setImage] : any = useState(img1);
    const [file, setFile] = useState<Blob | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [isCustomPhoto, setIsCustomPhoto] = useState<boolean>(true);

    let inputFile: any = useRef(null)

    const onPhotoClick = () => {
      inputFile.current.click();
    }

    const onFilePick = (e: any) =>{
      let file: Blob = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file));
        setFile(file);
        setIsCustomPhoto(false);
      }
    }

    const onClose = () => {
      onDialogClose();
      setImage(img1);
      setFile(null);
      setName('');
      setEmail('');
      setPhone('');
      setIsCustomPhoto(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleConfirmBtn = () => {
      if (name === '' || email === '') {
        alert("Nazwa oraz adres email nie mogą być puste");
      } else {
        const addTeamMember: AddTeamMember = {
          name: name,
          email: email,
          phoneNumber: phone,
          file: file,
          photoUrl: isCustomPhoto ? null : image
        };
        onAddMember(addTeamMember);
        onClose();
      }
    }

    const handleAutoFillBtn = () => {
      axios.get(autoFillUrl).then(response => {
        var data = response.data;
        setImage(data.photoUrl);
        setFile(null);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phoneNumber);
        setIsCustomPhoto(false);
      })
    }

    return (
        <div>
        <Modal show={isShow} onHide={onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Dodawanie nowego członka zespołu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='addMemberParagraph1'>Wypełnij wszystkie pola poniżej lub pobierz z internetu</p>
            <button onClick={handleAutoFillBtn} className='autoFillFormBtn'>
            <DownloadingIcon fontSize="small"/>
            Wypełnij formulasz automatycznie
            </button>
            <p className='addMemberParagraph2'>Uwaga ! Wszystkie pola formularza zostaną nadpisane danymi z internetu.</p>
            <div className='row'>
              <div className='col-sm-5 d-flex justify-content-center avatarSetDiv'>
                <img className='avatarImg' src={image} onClick={onPhotoClick}/>
                <input style={{display: 'none'}} type='file' accept='image/jpeg, image/png, image/jpg'
                       ref={inputFile} onChange={onFilePick}/>
              </div>
              <div className='col-sm-7'>
                <label className='addMemberLabel'>Nazwa*</label>
                <input className="addMemberInput" type="text" value={name} 
                       id="nameInput" onChange={handleInputChange}></input>
                <label className='addMemberLabel'>Adres e-mail*</label>
                <input className="addMemberInput" type="text" value={email} 
                       id="emailInput" onChange={handleInputChange}></input>
                <label className='addMemberLabel'>Numer telefonu</label>
                <input className="addMemberInput" type="text" value={phone} 
                       id="phoneInput" onChange={handleInputChange}></input>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='row'>
              <div className='col-sm-6 d-flex justify-content-cente'>
                <button onClick={onClose} className='addMemberCancelBtn'>Anuluj</button>
              </div>
              <div className='col-sm-6 d-flex justify-content-cente'>
              <button onClick={handleConfirmBtn} className='addMemberConfirmBtn'>Potwierdź</button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
        </div>
    );
}

export default AddTeamMemberDialog;

