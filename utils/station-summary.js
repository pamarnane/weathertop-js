"use strict";

const { forEach } = require("lodash/collection");
const stationSummary = {

  getMinTemp(station) {
    let minTemp = null;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
    }
    return minTemp;
  },

  getMaxTemp(station) {
    let maxTemp = null;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
    }
    return maxTemp;
  },

  getMinWindSpd(station) {
    let minWindSpd = null;
    if (station.readings.length > 0) {
      minWindSpd = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWindSpd) {
          minWindSpd = station.readings[i].windSpeed;
        }
      }
    }
    return minWindSpd;
  },

  getMaxWindSpd(station) {
    let maxWindSpd = null;
    if (station.readings.length > 0) {
      maxWindSpd = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWindSpd) {
          maxWindSpd = station.readings[i].windSpeed;
        }
      }
    }
    return maxWindSpd;
  },

  getMinPress(station) {
    let minPress = null;
    if (station.readings.length > 0) {
      minPress = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPress) {
          minPress = station.readings[i].pressure;
        }
      }
    }
    return minPress;
  },

  getMaxPress(station) {
    let maxPress = null;
    if (station.readings.length > 0) {
      maxPress = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPress) {
          maxPress = station.readings[i].pressure;
        }
      }
    }
    return maxPress;
  },

  getWeatherString(station) {
    const i = station.readings.length - 1;
    const weatherString = new Map();
    weatherString.set(100, 'Clear');
    weatherString.set(200, 'Partial Clouds');
    weatherString.set(300, "Cloudy");
    weatherString.set(400, "Light Showers");
    weatherString.set(500, "Heavy Showers");
    weatherString.set(600, "Rain");
    weatherString.set(700, "Snow");
    weatherString.set(800, "Thunder");

    return weatherString.get(station.readings[i].code);
  },

  getWeatherIconMap(station) {
    const i = station.readings.length - 1;
    const weatherIcon = new Map();
    weatherIcon.set(100, "sun icon");
    weatherIcon.set(200, "cloud sun icon");
    weatherIcon.set(300, "cloud icon");
    weatherIcon.set(400, "cloud rain icon");
    weatherIcon.set(500, "cloud showers heavy icon");
    weatherIcon.set(600, "umbrella icon");
    weatherIcon.set(700, "snowflake icon");
    weatherIcon.set(800, "bolt icon");

    return weatherIcon.get(station.readings[i].code);
  },

  getTempF(station) {
    const i = station.readings.length - 1;
    const tempC = station.readings[i].temperature;
    return Math.round((tempC * 9 / 5 + 32) * 100) / 100;
  },

  getWindBeaufort(station) {
    const i = station.readings.length - 1;
    const wind = station.readings[i].windSpeed;
    let windBeaufort = 0;

  if (wind == 0) {
    windBeaufort = 0;
  } else if (wind > 1 && wind <= 5) {
    windBeaufort = 1;
  } else if (wind > 5 && wind <= 11) {
    windBeaufort = 2;
  } else if (wind >= 12 && wind <= 19) {
    windBeaufort = 3;
  } else if (wind >= 20 && wind <= 28) {
    windBeaufort = 4;
  } else if (wind >= 29 && wind <= 38) {
    windBeaufort = 5;
  } else if (wind >= 39 && wind <= 49) {
    windBeaufort = 6;
  } else if (wind >= 50 && wind <= 61) {
    windBeaufort = 7;
  } else if (wind >= 62 && wind <= 74) {
    windBeaufort = 8;
  } else if (wind >= 75 && wind <= 88) {
    windBeaufort = 9;
  } else if (wind >= 89 && wind <= 102) {
    windBeaufort = 10;
  } else if (wind >= 103 && wind <= 117) {
    windBeaufort = 11;
  }
  return windBeaufort;
},


  getWindDirection(station) {
    const i = station.readings.length - 1;
    const windDirection = station.readings[i].windDirection;
    let windString = "";

    if (windDirection > 348.75 && windDirection <= 11.25) {
      windString = "North";
    } else if (windDirection > 11.25 && windDirection <= 33.75) {
      windString = "North North East";
    } else if (windDirection > 33.75 && windDirection <= 56.25) {
      windString = "North East";
    } else if (windDirection > 56.25 && windDirection <= 78.75) {
      windString = "East North East";
    } else if (windDirection > 78.75 && windDirection <= 101.25) {
      windString = "East";
    } else if (windDirection > 101.25 && windDirection <= 123.75) {
      windString = "East South East";
    } else if (windDirection > 123.75 && windDirection <= 146.25) {
      windString = "South East";
    } else if (windDirection > 146.25 && windDirection <= 168.75) {
      windString = "South South East";
    } else if (windDirection > 168.75 && windDirection <= 191.25) {
      windString = "South";
    } else if (windDirection > 191.25 && windDirection <= 213.75) {
      windString = "South South West";
    } else if (windDirection > 213.75 && windDirection <= 236.25) {
      windString = "South West";
    } else if (windDirection > 236.25 && windDirection <= 258.75) {
      windString = "West South West";
    } else if (windDirection > 258.75 && windDirection <= 281.25) {
      windString = "West";
    } else if (windDirection > 281.25 && windDirection <= 303.75) {
      windString = "West North West";
    } else if (windDirection > 303.75 && windDirection <= 326.25) {
      windString = "North West";
    } else if (windDirection > 326.25 && windDirection <= 348.75) {
      windString = "North North West";
    }

    return windString;
  },

  getWindChill(station) {
    const i = station.readings.length - 1;
    const windVel = station.readings[i].windSpeed;
    const temp = station.readings[i].temperature;
    return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(windVel, 0.16) + 0.3965 * temp * Math.pow(windVel, 0.16) * 100.0) / 100.0;
  },

  getTrends(station) {
    const j = station.readings.length;
    let tempAvg = 0;
    let windAvg = 0;
    let pressAvg = 0;
    let arrTrends = [];

    if (j > 3) {

      let sumPress = 0;
      let sumWind = 0;
      let sumTemp = 0;

      for (let i = j - 3; i < station.readings.length; i++) {
        sumPress += station.readings[i].pressure
        sumWind += station.readings[i].windSpeed
        sumTemp += station.readings[i].temperature
      }

      tempAvg = sumPress/3;
      windAvg = sumWind/3;
      pressAvg = sumTemp/3;

    }

    if (tempAvg > station.readings[station.readings.length - 4].temperature) {
      arrTrends[0] = "arrow up icon";
    } else if (tempAvg < station.readings[station.readings.length - 4].temperature) {
      arrTrends[0] = "arrow down icon";
    } else {
      arrTrends[0] = "arrows alternate horizontal icon";
    }

    if (windAvg > station.readings[station.readings.length - 4].windSpeed) {
      arrTrends[1] = "arrow up icon";
    } else if (windAvg < station.readings[station.readings.length - 4].windSpeed) {
      arrTrends[1] = "arrow down icon";
    } else {
      arrTrends[1] = "arrows alternate horizontal icon";
    }

    if (pressAvg > station.readings[station.readings.length - 4].pressure) {
      arrTrends[2] = "arrow up icon";
    } else if (pressAvg < station.readings[station.readings.length - 4].pressure) {
      arrTrends[2] = "arrow down icon";
    } else {
      arrTrends[2] = "arrows alternate horizontal icon";
    }

    return arrTrends;
  }

};

module.exports = stationSummary;