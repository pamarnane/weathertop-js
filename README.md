Welcome to WeatherTop-JS
==============================

Name : Patrick Marnane  
Student Number: 03028003

This version of the WeatherTop application is a repeat application developed using JavaScript, Node.Js and Handlebars templating.

The WeatherTop application is a web application that will allow a user to create Stations and manually record readings for that Station.  
Values that can be stored are:  
- Weather Code
- Temperature(degC)
- Temperature(degC)
- Wind Speed(km/hr)
- Wind Direction(deg)
- Pressure(hPa)

As part of Release 4.0, the user can also automatically generate a reading based on the latitude and longitude of the stations from the OpenWeather API.
The user will also be greeted on their dashboard with a map with markers showing the location of all the stations that they record readings from.

Summary cards are presented to the user which will detail further information including:  
- The latest reading entered
- Text description of Weather code
- Temperature in degF
- Text description of Wind Direction
- Wind Chill
- Min/Max of all entered readings

Below the summary cards, forecast trends of the temperature, humidity and dew point from the station for the next 7 days are displayed.

Users can edit there details as well as delete their account.  
Only a single account is allowed per email address. 