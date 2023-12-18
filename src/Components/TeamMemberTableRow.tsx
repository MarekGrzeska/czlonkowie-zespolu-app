import TeamMember from '../Interfaces/TeamMember';
import ThreeVertDots from '@mui/icons-material/MoreVertOutlined';
import Dropdown from 'react-bootstrap/Dropdown';
import '../Styles/TeamMemberTableRow.scss';

interface TeamMemberTableRowProps {
    member: TeamMember,
    onChangeStatusClick: (id: number, wasActive: boolean) => void,
    onClickMember: (id: number) => void,
}

const TeamMemberTableRow: React.FC<TeamMemberTableRowProps> = ( {member, onChangeStatusClick, onClickMember}) => {
    return (
        <tr>
            <td className='imgNameContainer' onClick={() => onClickMember(member.id)}>
                <img src={member.photoUrl}/> 
                <p>{member.name}</p>
            </td>
            <td>{member.email}</td>
            <td>{member.phoneNumber}</td>
            <td>{member.isActive ? <p className='active'>Aktywny</p> : <p className='unactive'>Blokada</p>}</td>
            <td><p className='createdDate'>{member.createdDate}</p></td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant='secondary'>
                    <ThreeVertDots />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onChangeStatusClick(member.id, member.isActive)}>
                            {member.isActive ? 'Zablokuj' : 'Odblokuj'}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}

export default TeamMemberTableRow;