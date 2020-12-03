const axios = require('axios');
require('dotenv').config();
const reminders = require('./messages/reminders.json');

// These function only fits for the HONG KONG OBSERVATORY Weather API
const getWeatherForecast = async (type, language) => {
    let res = await axios.get(process.env.WEATHER_REPORT_API, {
        params: {
            dataType: type,
            lang: language
        }
           
    })

    return res.data;
}

const checkIsRaining = (arr) => {
    for (area of arr) {
        if (area.main == true)
            return true;
    }
    return false; 
}

const checkIsCold = (arr) => {
    for (area of arr) {
        if (area.value <= process.env.COLD_TEMPERATURE)
            return true;
    }
    return false; 
}

const checkIsHot = (arr) => {
    for (area of arr) {
        if (area.value >= process.env.HOT_TEMPERATURE)
            return true;
    }
    return false; 
}

const getWeatherMessage = async () => {
    let data = await getWeatherForecast('rhrread', 'en');
    let temperatures = data.temperature.data;
    let rainfalls = data.rainfall.data;
    let warnings = data.warningMessage;

    let isRain = checkIsRaining(rainfalls);
    let isHot = checkIsHot(temperatures);
    let isCold = checkIsCold(temperatures);

    let res = "";
    if (isRain) {
        res += reminders.rain.en + '\n';
    }
    if (isCold) {
        res += reminders.cold.en + '\n';
    }
    if (isHot) {
        res += reminders.hot.en + '\n';
    }
    if (warnings != "") {
        res += reminders.warnings.en + warnings +  '\n';
    }

    if (res == "") {
        res = (await getWeatherForecast('flw', 'en')).generalSituation
    }

    return res;
}

module.exports = {
    getWeatherMessage
}