interface AddTeamMember {
    name: string,
    email: string,
    phoneNumber: string,
    photoUrl: string | null,
    file: Blob | null,
}

export default AddTeamMember;