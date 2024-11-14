// services/timeSlotService.js
export class TimeSlotService {
    generateTimeSlots(selectedDate) {
        const timeList = [];
        const currentTime = new Date();
        const endTime = new Date();
        endTime.setHours(20);
        endTime.setMinutes(30);

        const isNextDay = selectedDate > currentTime;

        if (isNextDay) {
            for (let i = 10; i <= 20; i++) {
                timeList.push({ time: `${i.toString().padStart(2, "0")}:00` });
                timeList.push({ time: `${i.toString().padStart(2, "0")}:30` });
            }
            return timeList;
        }

        const nextAvailableTime = new Date(currentTime);
        nextAvailableTime.setMinutes(
            nextAvailableTime.getMinutes() + (30 - (nextAvailableTime.getMinutes() % 30))
        );
        nextAvailableTime.setSeconds(0);
        nextAvailableTime.setMilliseconds(0);

        for (
            let time = nextAvailableTime.getTime();
            time <= endTime.getTime() && new Date(time).getHours() >= 10;
            time += 30 * 60 * 1000
        ) {
            const formattedTime = new Date(time);
            timeList.push({
                time: formattedTime.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                }),
            });
        }

        return timeList;
    }

    isPastDay(day) {
        const today = new Date();
        const todayMidnight = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const providedDayMidnight = new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate()
        );
        return providedDayMidnight < todayMidnight;
    }
}

export default new TimeSlotService();