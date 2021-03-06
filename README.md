# 06 Server-Side APIs: Weather Dashboard

This application demonstrates basic API functionality, getting the current weather and 5 day forecast for a supplied city name (if valid), and keeps a list of previous searches for quick searching.

The application can be found at (https://week-06-homework.herokuapp.com/).


## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and 
     that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation 
     of weather conditions, the temperature (current, max, feels like), 
     the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are 
     favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon 
     representation of weather conditions, the temperature (min/max), the 
     wind speed, the humidity, and the UV index
AND I am presented with a 5-hourly forecast that displays the time, an icon 
    representation of weather conditions, the temperature (max), the chance 
    of precipitation
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I click the delete button next to an item in the search history
THEN that search history item is removed
```

## Mock-Up
![A user searches for weather details by city name.](./public/img/screenshot.png)
