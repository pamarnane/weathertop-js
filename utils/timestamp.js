"use strict";

const genTStamp = {
  genTStamp(currentTime) {
    let mm = currentTime.getMonth() + 1;
    let dd = currentTime.getDate();
    let ss = currentTime.getSeconds();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    if (ss < 10) {
      ss = '0' + ss;
    }

    let date1 = currentTime.getFullYear() + '-' + mm + '-' + dd + 'T' + currentTime.getHours() + ':'
      + currentTime.getMinutes() + ':' + ss + '.' + currentTime.getMilliseconds();
    return date1;
  }
};


module.exports = genTStamp;