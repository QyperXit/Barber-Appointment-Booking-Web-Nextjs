// services/timeSlotService.js
export class TimeSlotService {
    // Business hours constants
    static BUSINESS_START_HOUR = 10;
    static BUSINESS_END_HOUR = 20;
    static BUSINESS_END_MINUTE = 30;
    static SLOT_INTERVAL_MS = 30 * 60 * 1000;

    constructor() {
        // Bind context for methods that might be called externally
        this.isPastDay = this.isPastDay.bind(this);
    }

    generateTimeSlots(selectedDate) {
        this.validateDate(selectedDate);

        if (this.isPastDay(selectedDate)) {
            return [];
        }

        const isFutureDate = this.isFutureDay(selectedDate);
        const currentDate = new Date();

        if (isFutureDate) {
            return this.generateFullDaySlots(selectedDate);
        }

        return this.generateCurrentDaySlots(currentDate);
    }

    validateDate(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error('Invalid date provided');
        }
    }

    isFutureDay(date) {
        const todayMidnight = this.getMidnight(new Date());
        const dateMidnight = this.getMidnight(date);
        return dateMidnight > todayMidnight;
    }

    getMidnight(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }

    generateFullDaySlots(date) {
        const start = this.getBusinessStart(date);
        const end = this.getBusinessEnd(date);
        return this.generateSlotsBetween(start, end);
    }

    generateCurrentDaySlots(currentDate) {
        const start = this.calculateNextAvailableSlot(currentDate);
        const end = this.getBusinessEnd(currentDate);

        if (start >= end) {
            return [];
        }

        return this.generateSlotsBetween(start, end);
    }

    calculateNextAvailableSlot(fromTime) {
        const nextSlot = new Date(fromTime);

        // Round up to nearest 30 minutes
        const minutes = nextSlot.getMinutes();
        const remainder = minutes % 30;
        if (remainder !== 0) {
            nextSlot.setMinutes(minutes + (30 - remainder));
        } else {
            nextSlot.setMinutes(minutes + 30);
        }

        nextSlot.setSeconds(0, 0);

        // Ensure we don't start before business hours
        const businessStart = this.getBusinessStart(nextSlot);
        return nextSlot < businessStart ? businessStart : nextSlot;
    }

    getBusinessStart(date) {
        return this.setTime(date, TimeSlotService.BUSINESS_START_HOUR, 0);
    }

    getBusinessEnd(date) {
        return this.setTime(date, TimeSlotService.BUSINESS_END_HOUR, TimeSlotService.BUSINESS_END_MINUTE);
    }

    setTime(date, hours, minutes) {
        const d = new Date(date);
        d.setHours(hours, minutes, 0, 0);
        return d;
    }

    generateSlotsBetween(start, end) {
        const slots = [];
        let current = new Date(start);

        while (current <= end) {
            slots.push({
                time: this.formatTime(current)
            });
            current = new Date(current.getTime() + TimeSlotService.SLOT_INTERVAL_MS);
        }

        return slots;
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }


    isPastDay(day) {
        const todayMidnight = this.getMidnight(new Date());
        const dayMidnight = this.getMidnight(day);
        return dayMidnight < todayMidnight;
    }
}

export default new TimeSlotService();