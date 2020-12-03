const moment = require('moment-timezone');

const isValidTime = (str) => {
    return moment(str,"HHmm", true).isValid();
}

const getCurrentTimeStr = () => {
    return moment().tz("Asia/Hong_Kong").format("HHmm");
}

const getCurrentDate = () => {
    return moment().tz("Asia/Hong_Kong").format('YYYY/MM/DD HH:mm:ss');
}
module.exports = {
    isValidTime, getCurrentTimeStr, getCurrentDate
}