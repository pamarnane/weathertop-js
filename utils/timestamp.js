"use strict";

const genTStamp = {
  genTStamp(currentTime) {
    let mm = currentTime.getMonth() + 1;
    let dd = currentTime.getDate();
    let hh = currentTime.getHours();
    let mn = currentTime.getMinutes();
    let ss = currentTime.getSeconds();
    let ms = currentTime.getMilliseconds();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (hh < 10) {
      hh = '0' + hh;
    }
    if (mn < 10) {
      mn = '0' + mn;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (ss < 10) {
      ss = '0' + ss;
    }
    if (ms < 10) {
      ms = '00' + ms;
    }
    if (ms <100) {
      ms = '0' + ms;
    }

    return currentTime.getFullYear() + '-' + mm + '-' + dd + 'T' + hh + ':'
      + mn + ':' + ss + '.' + ms;
  }
};


module.exports = genTStamp;