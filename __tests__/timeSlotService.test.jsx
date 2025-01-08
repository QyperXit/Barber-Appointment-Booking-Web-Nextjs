import { TimeSlotService } from '@/app/(route)/details/[recordId]/_components/services/timeSlotService';

describe('TimeSlotService', () => {
    let service;

    // Mock date setup helper
    const mockDate = (dateString) => {
        const originalDate = global.Date;
        class MockDate extends originalDate {
            constructor(...args) {
                if (args.length === 0) {
                    return new originalDate(dateString);
                }
                return new originalDate(...args);
            }
            static now() {
                return new originalDate(dateString).getTime();
            }
        }
        global.Date = MockDate;
    };

    beforeEach(() => {
        service = new TimeSlotService();
    });

    afterEach(() => {
        // Restore the original Date implementation
        jest.restoreAllMocks();
    });

    describe('generateTimeSlots', () => {
        it('generates full day slots for next day', () => {
            // Mock current date to 2024-01-01 15:00
            mockDate('2024-01-01T15:00:00');

            // Test with next day
            const nextDay = new Date('2024-01-02T10:00:00');
            const slots = service.generateTimeSlots(nextDay);

            // Should generate 22 slots (10:00 to 20:30, every 30 minutes)
            expect(slots).toHaveLength(22);
            expect(slots[0]).toEqual({ time: '10:00' });
            expect(slots[slots.length - 1]).toEqual({ time: '20:30' });
        });

        it('generates partial day slots for current day after 10:00', () => {
            // Mock current time to 14:15
            mockDate('2024-01-01T14:15:00');

            const currentDay = new Date('2024-01-01T14:15:00');
            const slots = service.generateTimeSlots(currentDay);

            // First slot should be 14:30 (rounded up to next 30-minute interval)
            expect(slots[0]).toEqual({ time: '14:30' });
            // Last slot should be no later than 20:30
            expect(slots[slots.length - 1].time).toMatch(/^(8:30 PM|20:30)$/);
        });

        it('handles current time before business hours', () => {
            // Mock current time to 8:00 AM
            mockDate('2024-01-01T08:00:00');

            const currentDay = new Date('2024-01-01T08:00:00');
            const slots = service.generateTimeSlots(currentDay);

            // Should start at 10:00
            expect(slots[0]).toEqual({ time: '10:00' });
        });

        it('handles current time after business hours', () => {
            // Mock current time to 21:00
            mockDate('2024-01-01T21:00:00');

            const currentDay = new Date('2024-01-01T21:00:00');
            const slots = service.generateTimeSlots(currentDay);

            // Should return empty array as no more slots available
            expect(slots).toHaveLength(0);
        });

        it('rounds current time to next 30-minute interval', () => {
            // Mock current time to 14:05
            mockDate('2024-01-01T14:05:00');

            const currentDay = new Date('2024-01-01T14:05:00');
            const slots = service.generateTimeSlots(currentDay);

            // First slot should be 14:30
            expect(slots[0]).toEqual({ time: '14:30' });
        });

        it('generates correct slots when current time is exactly on 30-minute mark', () => {
            // Mock current time to 14:30
            mockDate('2024-01-01T14:30:00');

            const currentDay = new Date('2024-01-01T14:30:00');
            const slots = service.generateTimeSlots(currentDay);

            // First slot should be 15:00
            expect(slots[0]).toEqual({ time: '15:00' });
        });
    });

    describe('isPastDay', () => {
        it('identifies past days correctly', () => {
            // Mock current date to 2024-01-15
            mockDate('2024-01-15T12:00:00');

            const pastDay = new Date('2024-01-14');
            expect(service.isPastDay(pastDay)).toBe(true);
        });

        it('identifies current day as not past', () => {
            // Mock current date to 2024-01-15
            mockDate('2024-01-15T12:00:00');

            const currentDay = new Date('2024-01-15');
            expect(service.isPastDay(currentDay)).toBe(false);
        });

        it('identifies future days as not past', () => {
            // Mock current date to 2024-01-15
            mockDate('2024-01-15T12:00:00');

            const futureDay = new Date('2024-01-16');
            expect(service.isPastDay(futureDay)).toBe(false);
        });

        it('handles date comparison across months correctly', () => {
            // Mock current date to 2024-02-01
            mockDate('2024-02-01T12:00:00');

            const pastDay = new Date('2024-01-31');
            expect(service.isPastDay(pastDay)).toBe(true);
        });

        it('handles date comparison across years correctly', () => {
            // Mock current date to 2024-01-01
            mockDate('2024-01-01T12:00:00');

            const pastDay = new Date('2023-12-31');
            expect(service.isPastDay(pastDay)).toBe(true);
        });

        it('ignores time component in comparison', () => {
            // Mock current date to 2024-01-15 10:00
            mockDate('2024-01-15T10:00:00');

            const sameDayLaterTime = new Date('2024-01-15T20:00:00');
            expect(service.isPastDay(sameDayLaterTime)).toBe(false);
        });
    });
});