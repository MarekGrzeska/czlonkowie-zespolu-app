import { useState } from 'react';
import './App.scss';
import TeamMemberTable from './Components/TeamMemberTable';
import TopPanel from './Components/TopPanel';
import ConfirmationDialog from './Dialogs/ConfirmationDialog';
import AddTeamMemberDialog from './Dialogs/AddTeamMemberDialog';
import DetailsTeamMemberDialog from './Dialogs/DetailsTeamMemberDialog';
import useGetAllTeamMembers from './CustomHooks/useGetAllTeamMembers';
import axios from 'axios';
import AddTeamMember from './Interfaces/AddTeamMember';
import EditTeamMember from './Interfaces/EditTeamMember';
import TeamMember from './Interfaces/TeamMember';

function App() {
  const getAllTeamMembersUrl = 'https://localhost:7218/TeamMember/GetAll';
  const importRandomTeamMemberUrl = 'https://localhost:7218/TeamMember/AddRandom';
  const changeStatusTeamMembeUrl = 'https://localhost:7218/TeamMember/ChangeStatus/';
  const getTeamMemberByIdUrl = 'https://localhost:7218/TeamMember/GetById/'
  const addTeamMemberUrl = 'https://localhost:7218/TeamMember/AddMember';
  const editTeamMemberUrl = 'https://localhost:7218/TeamMember/EditMember';

  const {data, refresh } = useGetAllTeamMembers(getAllTeamMembersUrl);

  const [confirmDialogIsShow, setConfirmDialog] = useState<boolean>(false);
  const [confirmDialogText, setConfirmDialogText] = useState<string>('');
  const [addTeamMemberDialogIsShow, setAddTeamMemberDialogIsShow] = useState<boolean>(false);
  const [detailsTeamMemberDialogIsShow, setDetailsTeamMemberDialogIsShow] = useState<boolean>(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);

  const onClickImportTeamMember = () => {
    axios.post(importRandomTeamMemberUrl).then(response => {
          setConfirmDialog(true);
          setConfirmDialogText("Członek zespołu został dodany");
          refresh();
        })
  }

  const onClickAddTeamMember = () => {
    setAddTeamMemberDialogIsShow(true);
  }

  const onChangeStatus = (id: number, wasActive: boolean) => {
    axios.post(changeStatusTeamMembeUrl + id).then(response => {
      setConfirmDialog(true);
      let message = wasActive ? 'Członek zespołu został zablokowany' : 'Członek zespołu został odblokowany'
      setConfirmDialogText(message);
      refresh();
    })
  }

  const onClickMember = (id: number) => {
    axios.get(getTeamMemberByIdUrl + id).then(response => {
      setCurrentTeamMember(response.data);
      setDetailsTeamMemberDialogIsShow(true)
    })

  }

  const onAddManualTeamMember = (teamMember: AddTeamMember) => {
    let formData = new FormData()
    formData.append("name", teamMember.name);
    formData.append("email", teamMember.email);
    formData.append('phoneNumber', teamMember.phoneNumber)
    if (teamMember.photoUrl !== null) {
      formData.append('photoUrl', teamMember.photoUrl);
    }
    if (teamMember.file !== null) {
      formData.append('file', teamMember.file);
    }
    axios.post(addTeamMemberUrl, formData).then(response => {
        setAddTeamMemberDialogIsShow(false);
        setConfirmDialog(true);
        setConfirmDialogText("Członek zespołu został dodany");
        refresh();
    })
  }

  const onEditTeamMember = (teamMember: EditTeamMember) => {
    axios.post(editTeamMemberUrl, teamMember).then(response => {
      let editedTeamMember: TeamMember = {
        id: teamMember.id,
        name: teamMember.name,
        email: teamMember.email,
        phoneNumber: teamMember.phoneNumber,
        photoUrl: currentTeamMember?.photoUrl ?? "",
        isActive: currentTeamMember?.isActive ?? true,
        createdDate: currentTeamMember?.createdDate ?? ""
      }
      setCurrentTeamMember(editedTeamMember);
      refresh();
    })
  }

  return (
    <div className="App">
      <TopPanel onClickImportTeamMember={onClickImportTeamMember}
                onClickAddTeamMember={onClickAddTeamMember}></TopPanel>
      <TeamMemberTable members={data} 
                       onChangeStatusClick={onChangeStatus}
                       onClickMember={onClickMember}></TeamMemberTable>
      
      <ConfirmationDialog 
      isShow={confirmDialogIsShow}
      message={confirmDialogText} 
      onDialogClose={() => setConfirmDialog(false)}/>

      <AddTeamMemberDialog
      isShow={addTeamMemberDialogIsShow}
      onDialogClose={() => setAddTeamMemberDialogIsShow(false)}
      onAddMember={onAddManualTeamMember}/>

    {currentTeamMember !== null ? <DetailsTeamMemberDialog isShow={detailsTeamMemberDialogIsShow} 
      member={currentTeamMember} onDialogClose={() => setDetailsTeamMemberDialogIsShow(false)}
      onSaveChanges={onEditTeamMember}/> : ''}
    </div>
  );
}

export default App;
