class Period {
  constructor(start, end = null) {
    this.start = new Date(1, 8, 1);
    this.end = new Date(1, 5, 30);

    if (!end) {
      this.setPeriodFromDate(start);
    }
    else {
      this.start.setFullYear(start);
      this.end.setFullYear(end)
    }
  }

  get isCurrent() {
    return this.isEqual(new Period(new Date()));
  }

  setPeriodFromDate(controlDate) {
    if (controlDate.getMonth() < 8) {
      this.start.setFullYear(controlDate.getFullYear() - 1);
      this.end.setFullYear(controlDate.getFullYear());
    }
    else {
      this.start.setFullYear(controlDate.getFullYear());
      this.end.setFullYear(controlDate.getFullYear() + 1);
    }
  }

  toString() {
    return `${this.start.getFullYear()} – ${this.end.getFullYear()}`;
  }

  isEqual(period) {
    return this.start.getTime() === period.start.getTime() &&
      this.end.getTime() === period.end.getTime();
  }
}