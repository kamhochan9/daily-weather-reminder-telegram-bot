const bot = require('./bot').bot;
const user = require('./user');
const time = require('./time');
const schedule = require('./schedule');

// Messages
const welcome = require('./messages/welcome.json');
const success = require('./messages/success.json');


// Init
bot.onText(/\/start/, (msg) => {
    let res = welcome[msg.from.language_code] ? welcome[msg.from.language_code] : welcome[en];
    bot.sendMessage(msg.chat.id, res);
    user.addUser(msg.from);
});

// Add timer
bot.onText(/\/add/, (msg) => {
    user.setState(msg.chat.id, "add");
    id = msg.chat.id;
    lang = msg.from.language_code;
    res = "Please input time";

    bot.sendMessage(id, res, {
        "reply_markup": {
            "keyboard": [
                ["0600", "0630", "0700"],
                ["0730", "0800", "0830"],
                ["0900", "0930", "1000"]
            ]            
        }
    });
});

// Remove timer
bot.onText(/\/remove/, (msg) => {
    user.setState(msg.chat.id, "remove");
    id = msg.chat.id;
    lang = msg.from.language_code;
    res = "Which time would like to remove?";

    let time = user.getTimeArr(id);
   
    let optArr = time.map((value, index, array) => {
        return [{
            'text' : value,
            'callback_data' : value,
        }]
    });

    if (optArr.length) {
        let opts = {
            reply_markup: {
                inline_keyboard: optArr
            }
        }
        bot.sendMessage(id, res, opts);
    } else {
        bot.sendMessage(id, "You have not set a time for the reminder");
    }
});


// Show all timer
bot.onText(/\/show/, (msg) => {
    id = msg.chat.id;
    let timeArr = user.getTimeArr(id);
    let list = "";
    for (let time of timeArr) {
        list += time +'\n';    
    }
    if (list == "") {
        bot.sendMessage(id, "You have not set a time for the reminder");
    } else {
        bot.sendMessage(id, list);
    }
   
})

bot.on('message', (msg) => {
    let text = msg.text;
    let {id, language_code} = msg.from;
    let res = success[language_code] ? success[language_code] : success[en];

    let state = user.getState(id);
    switch (state) {
        case "add":
            if (!schedule.isTimeExist(text, id) && time.isValidTime(text)) {
                user.addTime(id, text)
                schedule.addSchedule(text, id);
                bot.sendMessage(id, res);
            } else if (schedule.isTimeExist(text, id)) {
                bot.sendMessage(id, "Time exist")
            } else {
                bot.sendMessage(id, "Invalid time")
            }
            break;
        
        default:
            break;
    }

    user.setState(id, "main");
});

// For remove time from inline keyboard
bot.on("callback_query", function(req){
    // Get the callback data specified
    let callback_data = req.data
    let id = req.from.id;

    let opts = {
        chat_id : req.message.chat.id, 
        message_id : req.message.message_id, 
        reply_markup: {
            inline_keyboard: []
        }
    }
    if (schedule.isTimeExist(callback_data, id)) {
        user.removeTime(id, callback_data)
        schedule.removeSchedule(callback_data, id)

        bot.editMessageText("Success", opts)
    } else {
        bot.editMessageText("Failed", opts)
    }
});

bot.on("polling_error", (err) => console.log(err));

console.log('Program starts');