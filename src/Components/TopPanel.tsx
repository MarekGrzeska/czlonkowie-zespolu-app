import '../Styles/TopPanel.scss';
import CloudIcon from '@mui/icons-material/CloudDownloadOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';

interface TopPanelProps {
    onClickImportTeamMember: () => void;
    onClickAddTeamMember: () => void;
}

const TopPanel: React.FC<TopPanelProps>  = ({onClickImportTeamMember, onClickAddTeamMember}) => {
    return (
        <div className='topPanel'>
            <div className='row'>
                <div className='col-sm-6'></div>
                    <div className='memberListP'>Lista członków zespołu</div>
                    <div className='manageMemberListP'>Zarządzaj listą członków swojego zespołu</div>
                <div className='col-sm-6'>
                    <div className='actionButtons'>
                        <button onClick={() => onClickImportTeamMember()} className='actionBtn'><CloudIcon fontSize='small'/> Zaimportuj członka zespołu</button>
                        <button onClick={() => onClickAddTeamMember()}className='actionBtn'><AddIcon fontSize='small'/> Dodaj członka zespołu</button>
                    </div> 
                </div>
            </div>

        </div>
    )
}

export default TopPanel;