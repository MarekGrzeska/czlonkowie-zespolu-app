import DownArrow from '@mui/icons-material/ArrowDownwardOutlined';

const TeamMemberTableHead = () => {
    return (
        <thead>
        <tr>
            <th>Nazwa <DownArrow fontSize='small'/></th>
            <th>Adres e-mail</th>
            <th>Numer telefonu</th>
            <th>Status</th>
            <th>Data utworzenia</th>
            <th>Akcje</th>
        </tr>
    </thead>
    )
}

export default TeamMemberTableHead;