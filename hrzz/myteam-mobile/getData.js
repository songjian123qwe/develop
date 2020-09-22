let setTeamData = (data) => {
    sessionStorage.setItem('myteamData', JSON.stringify(data))
}
let getTeamData = () => {
    return JSON.parse(sessionStorage.getItem('myteamData'))
}
export {
    setTeamData,
    getTeamData
}