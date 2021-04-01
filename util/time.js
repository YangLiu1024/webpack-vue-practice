//拿到当天0点的时间戳
const Time = {}

Time.getTodayTimestamp = function() {
    return new Date().getTime()
}

Time.getPredayTimestamp = function(timestamp = (new Date()).getTime()) {
    return timestamp - 24 * 60 * 60 * 1000;

}
Time.getNextDayTimestamp = function(timestamp = (new Date()).getTime()) {
    return timestamp + 24 * 60 * 60 * 1000;
}

Time.getYearMonthDay = function(timestamp, delimeter='') {
    const date = new Date(timestamp)
    const year = date.getFullYear();
    //month is 0 based
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return year + delimeter + month + delimeter + day
}

Time.getZeroClockTimestamp = function(date = new Date()) {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
}

Time.getRelativeTimeSpan = function(timestamp) {
    var now = Time.getTodayTimestamp()
    var todayZeroClock = Time.getZeroClockTimestamp()
    var nextDayZeroClock = Time.getNextDayTimestamp(todayZeroClock)
    var delta = (now > timestamp ? now - timestamp : timestamp - now) / 1000
    var suffix = now > timestamp ? '前' : '后'
    var tip = ''
    if (delta < 60) {//1 分钟内
        tip = '刚刚' + suffix
    } else if (delta < 3600) {//1 小时内
        tip = Math.floor(delta / 60) + ' 分钟' + suffix
    } else if (timestamp > todayZeroClock && timestamp < nextDayZeroClock) {//今天以内
        tip = Math.floor(delta / 3600) + '小时' + suffix
    } else if (delta / 86400 < 31) {//一月内
        tip = Math.floor(delta / 86400) + '天' + suffix
    } else {
        tip = Time.getYearMonthDay(timestamp, '-')
    }
    return tip;
}
export default Time