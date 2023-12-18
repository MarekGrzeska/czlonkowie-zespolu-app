import React from 'react'
import '../Styles/TeamMemberTable.scss';

import TeamMemberTableHead from './TeamMemberTableHead';
import TeamMemberTableRow from './TeamMemberTableRow';

import TeamMember from '../Interfaces/TeamMember';

interface TeamMemberTableProps {
    members: Array<TeamMember>;
    onChangeStatusClick: (id: number, wasActive: boolean) => void;
    onClickMember: (id: number) => void;
}
const TeamMemberTable: React.FC<TeamMemberTableProps> = ({members, onChangeStatusClick, onClickMember}) => {

    return (
        <div className='memberTable'>
            <table>
                <TeamMemberTableHead></TeamMemberTableHead>
            <tbody>
            {
                members.map(member => (
                    <TeamMemberTableRow key={member.id} 
                    member={member}
                    onChangeStatusClick={onChangeStatusClick}
                    onClickMember={onClickMember}
                    ></TeamMemberTableRow>
                ))
            }
            </tbody>
            </table>
       
        </div>
    )
}

export default TeamMemberTable;