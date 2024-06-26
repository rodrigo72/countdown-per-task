export class Time {

    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    sign = '+';

    constructor(days = 0, hours = 0, minutes = 0, seconds = 0, sign = '+') {
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.sign = sign;
    }

    isPositive() {
        return this.sign === '+';
    }

    addSeconds(value) {
        let totalSeconds = this.getValueInSeconds() + value;
        this.updateTimeFromSeconds(totalSeconds);
    }

    getValueInSeconds() {
        let totalSeconds = ((this.days * 24 + this.hours) * 60 + this.minutes) * 60 + this.seconds;
        return this.sign === '-' ? -totalSeconds : totalSeconds;
    }

    getFormattedTime() {
        let signStr = this.sign === '-' ? '-' : '';
        let daysStr = this.days > 0 ? String(Math.abs(this.days)).padStart(2, '0') + 'd': '';
        let hoursStr = this.hours > 0 ? String(Math.abs(this.hours)).padStart(2, '0') + 'h' : '';
        let minutesStr = this.minutes > 0 ? String(Math.abs(this.minutes)).padStart(2, '0') + 'm' : '';
        let secondsStr = String(Math.abs(this.seconds)).padStart(2, '0') + 's';
        return `${signStr} ${daysStr} ${hoursStr} ${minutesStr} ${secondsStr}`;
    }

    updateTimeFromSeconds(totalSeconds) {
        this.sign = totalSeconds < 0 ? '-' : '+';
        totalSeconds = Math.abs(totalSeconds);
        this.days = Math.floor(totalSeconds / (24 * 3600));
        totalSeconds %= 24 * 3600;
        this.hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        this.minutes = Math.floor(totalSeconds / 60);
        this.seconds = totalSeconds % 60;
    }

}