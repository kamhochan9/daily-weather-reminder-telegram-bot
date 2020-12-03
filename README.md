# Daily weather reminder
This is a telegram bot that can send daily weather reminders to users at designated time. Please note that this bot is applicable in Hong Kong only.

## Quick start
1. ```npm install```
2. ```npm start```

## Docker
1. ```docker build -t daily-reminder-tg-bot .```
2. ```docker run daily-reminder-tg-bot```

## ENV
- WEATHER_REPORT_API
  - [API of Hong Kong weather report](https://data.weather.gov.hk/weatherAPI/opendata/weather.php)
- COLD_TEMPERATURE
  - Temperature to trigger cold reminder 
- HOT_TEMPERATURE
  - Temperature to trigger hot reminder
- TELEGRAM_TOKEN
  - Telegram bot token

## Notices
For the information of the api, please refer to [this API documentation](https://data.weather.gov.hk/weatherAPI/doc/HKO_Open_Data_API_Documentation.pdf)
