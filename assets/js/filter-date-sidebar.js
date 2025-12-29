
class DateCalendar {
    constructor(prefix) {
        this.prefix = prefix;
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);
        this.currentMonth1 = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
        this.selectedStart = null;
        this.selectedEnd = null;
        this.flexibleDays = 0;

        // Get DOM elements with prefix
        this.month1Title = document.getElementById(`month1Title${prefix}`);
        this.month2Title = document.getElementById(`month2Title${prefix}`);
        this.calendar1 = document.getElementById(`calendar1${prefix}`);
        this.calendar2 = document.getElementById(`calendar2${prefix}`);
        this.prevMonthBtn = document.getElementById(`prevMonth${prefix}`);
        this.nextMonthBtn = document.getElementById(`nextMonth${prefix}`);
        this.startDateEl = document.getElementById(`startDate${prefix}`);
        this.endDateEl = document.getElementById(`endDate${prefix}`);
        this.clearBtn = document.getElementById(`clearBtn${prefix}`);
        this.doneBtn = document.getElementById(`doneBtn${prefix}`);

        // Quick buttons selector based on prefix
        const quickBtnClass = prefix === 'Desktop' ? '.desktop-quick-btn' : '.mobile-quick-btn';
        this.quickBtns = document.querySelectorAll(quickBtnClass);

        this.init();
    }

    init() {
        this.renderCalendars();
        this.updateDateDisplay();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Month navigation
        this.prevMonthBtn.addEventListener('click', () => {
            this.currentMonth1 = new Date(
                this.currentMonth1.getFullYear(),
                this.currentMonth1.getMonth() - 1,
                1
            );
            this.renderCalendars();
        });

        this.nextMonthBtn.addEventListener('click', () => {
            this.currentMonth1 = new Date(
                this.currentMonth1.getFullYear(),
                this.currentMonth1.getMonth() + 1,
                1
            );
            this.renderCalendars();
        });

        // Quick select buttons
        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.quickBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (btn.dataset.mode === 'exact') {
                    this.flexibleDays = 0;
                    this.renderCalendars();
                    this.updateDateDisplay();
                    return;
                }

                const days = parseInt(btn.dataset.days, 10);
                this.flexibleDays = days;

                let baseDate = this.selectedStart || new Date(this.today);
                if (!this.selectedStart) this.selectedStart = baseDate;

                this.selectedEnd = this.addDays(baseDate, days);
                this.renderCalendars();
                this.updateDateDisplay();
            });
        });

        // Action buttons
        this.clearBtn.addEventListener('click', () => {
            this.selectedStart = null;
            this.selectedEnd = null;
            this.flexibleDays = 0;

            this.quickBtns.forEach(b => b.classList.remove('active'));
            this.quickBtns[0].classList.add('active');

            this.renderCalendars();
            this.updateDateDisplay();
        });

        this.doneBtn.addEventListener('click', () => {
            if (!this.selectedStart || !this.selectedEnd) {
                alert('Please select start and end dates');
                return;
            }

            console.log(`[${this.prefix}] Selected dates:`, {
                start: this.selectedStart,
                end: this.selectedEnd,
                flexibleDays: this.flexibleDays
            });

            alert(
                `${this.formatDate(this.selectedStart)} → ${this.formatDate(this.selectedEnd)}${
                    this.flexibleDays ? ` (±${this.flexibleDays} days)` : ''
                }`
            );
        });
    }

    renderCalendars() {
        const nextMonth = new Date(
            this.currentMonth1.getFullYear(),
            this.currentMonth1.getMonth() + 1,
            1
        );

        this.renderCalendar(this.calendar1, this.currentMonth1);
        this.renderCalendar(this.calendar2, nextMonth);

        this.month1Title.textContent = this.formatMonthYear(this.currentMonth1);
        this.month2Title.textContent = this.formatMonthYear(nextMonth);
    }

    renderCalendar(container, month) {
        container.innerHTML = '';

        const year = month.getFullYear();
        const monthIndex = month.getMonth();
        const firstDay = new Date(year, monthIndex, 1);
        const lastDay = new Date(year, monthIndex + 1, 0);
        const firstDayOfWeek = firstDay.getDay();
        const lastDateOfMonth = lastDay.getDate();

        // Empty cells before first day
        for (let i = 0; i < firstDayOfWeek; i++) {
            const day = document.createElement('div');
            day.className = 'day empty';
            container.appendChild(day);
        }

        // Days of the month
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const date = new Date(year, monthIndex, i);
            const isDisabled = date < this.today;
            const day = this.createDayElement(i, date, isDisabled);
            container.appendChild(day);
        }

        // Fill remaining cells
        const totalDaysSoFar = firstDayOfWeek + lastDateOfMonth;
        const remainingCells = 42 - totalDaysSoFar;
        for (let i = 0; i < remainingCells; i++) {
            const day = document.createElement('div');
            day.className = 'day empty';
            container.appendChild(day);
        }
    }

    createDayElement(dayNum, date, disabled) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = dayNum;

        if (disabled) day.classList.add('disabled');

        if (this.isSameDay(date, this.today)) {
            day.classList.add('today');
        }

        if (this.selectedStart && this.isSameDay(date, this.selectedStart)) {
            day.classList.add('selected', 'range-start');
        }
        if (this.selectedEnd && this.isSameDay(date, this.selectedEnd)) {
            day.classList.add('selected', 'range-end');
        }

        if (
            this.selectedStart &&
            this.selectedEnd &&
            date > this.selectedStart &&
            date < this.selectedEnd
        ) {
            day.classList.add('in-range');
        }

        if (!disabled) {
            day.addEventListener('click', () => this.selectDate(date));
        }

        return day;
    }

    selectDate(date) {
        this.flexibleDays = 0;
        this.quickBtns.forEach(b => b.classList.remove('active'));
        this.quickBtns[0].classList.add('active');

        if (!this.selectedStart || this.selectedEnd) {
            this.selectedStart = date;
            this.selectedEnd = null;
        } else {
            if (date < this.selectedStart) {
                this.selectedEnd = this.selectedStart;
                this.selectedStart = date;
            } else {
                this.selectedEnd = date;
            }
        }

        this.renderCalendars();
        this.updateDateDisplay();
    }

    updateDateDisplay() {
        if (!this.selectedStart) {
            this.startDateEl.textContent = 'Start date';
            this.endDateEl.textContent = 'End date';
            return;
        }

        this.startDateEl.textContent = this.formatDate(this.selectedStart);
        this.endDateEl.textContent = this.selectedEnd 
            ? this.formatDate(this.selectedEnd) 
            : 'End date';
    }

    formatDate(date) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
    }

    formatMonthYear(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    isSameDay(date1, date2) {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    addDays(date, days) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }
}

// Initialize both calendars
document.addEventListener('DOMContentLoaded', () => {
    const desktopCalendar = new DateCalendar('Desktop');
    const mobileCalendar = new DateCalendar('Mobile');
});

// Toggle filter sections icon rotation
document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const icon = this.querySelector('.icon-toggle');
        if (!icon) return;

        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        icon.classList.toggle('fa-plus', !isExpanded);
        icon.classList.toggle('fa-minus', isExpanded);
    });
});