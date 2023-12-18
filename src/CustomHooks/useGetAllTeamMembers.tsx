import { useState, useEffect } from 'react';
import TeamMember from '../Interfaces/TeamMember';
import axios from 'axios';

interface UseGetAllTeaMembers {
    data: Array<TeamMember>,
    refresh: () => void;
}

const useGetAllTeamMembers = (apiUrl: string): UseGetAllTeaMembers => {
    const [data, setData] = useState<Array<TeamMember>>([]);

    useEffect(() => {
        axios.get(apiUrl)
        .then(response => {
            setData(response.data);
        })
    }, [apiUrl]);

    const refresh = () => {
        axios.get(apiUrl)
        .then(response => {
            setData(response.data);
        })
    }

    return {
        data,
        refresh
    }
}

export default useGetAllTeamMembers;