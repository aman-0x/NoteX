export const getCurrentDate = () => {
    const date = new Date();
    const completeDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    return completeDate;
}

export const getCurrentTime = () => {
    const date = new Date();
    const dd = new Date().toLocaleTimeString()
    console.log(`dd`, dd)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}