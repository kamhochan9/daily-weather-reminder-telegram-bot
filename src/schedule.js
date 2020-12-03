const schedule = require('node-schedule');
const time = require('./time');
const { sendMessageToUser } = require('./bot');
const weather = require('./weather');

let schedules = {}

let j = schedule.scheduleJob(' */1 * * * *', async () => {
    let currentTIme = time.getCurrentTimeStr();
    let date = time.getCurrentDate();
    console.log(`check if the bot need to send reminders at ${date}`)
    
    // Check if any user want to get a reminder now
    if (schedules[currentTIme]) {

        // Get today's date
        let weatherMsg = await weather.getWeatherMessage();
        let message = `${date}\n${weatherMsg}\n`

        for (let id of schedules[currentTIme]) {
            console.log(`Send reminder to ${id}`)
            sendMessageToUser(id, message)
        }
    }

});

const addSchedule = (time, id) => {
    if (schedules[time]) {
        schedules[time].push(id);
    } else {
        schedules[time] = [id];
    }
}

const removeSchedule = (time, id) => {
    if (schedules[time]) {
        let index = schedules[time].indexOf(id);
        if (index > -1) {
            schedules[time].splice(index, 1);
        }
    }
}

const isTimeExist = (time, id) => {
    return schedules[time] && schedules[time].includes(id);
}

module.exports = {
    addSchedule, isTimeExist, removeSchedule
}

