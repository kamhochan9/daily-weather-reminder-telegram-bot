const users = {
    
}

const addUser = ({id, username, first_name, last_name, language_code}) => {
    users[id] = {
        username : username,
        first_name : first_name,
        last_name: last_name,
        time: [],
        state: "main",
        language : language_code
    }
}

const isUserExist = (id) => {
    return users[id];
}

const addTime = (id, time) => {
    users[id]['time'].push(time);
}

const getTimeArr = (id) => {
    return users[id]['time'];
}

const removeTime = (id, time) => {
    if (users[id]['time']) {
        let index = users[id]['time'].indexOf(time);
        if (index > -1) {
            users[id]['time'].splice(index, 1);
        }
    }
}

const setState = (id, state) => {
    if (users[id])
        users[id]['state'] = state;
}

const getState = (id) => {
    if (users[id])
        return users[id]['state'];
    else
        return null;
}

module.exports = {
    addUser, isUserExist, addTime, setState, getState, removeTime, getTimeArr
}