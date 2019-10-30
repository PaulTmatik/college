class Rating {
  constructor(
    avg_eval, 
    avg_test, 
    visit_count, 
    without_delay, 
    eval_count, 
    outclass,
    lost_hours
  ) {
    this.avg_eval = avg_eval;
    this.avg_test = avg_test;
    this.visit_count = visit_count;
    this.without_delay = without_delay;
    this.eval_count = eval_count;
    this.outclass = outclass;
    this.lost_hours = lost_hours;
  }

  get evaluation() {
    return this.avg_eval * 5;
  }

  get testEvaluation() {
    return this.avg_test * 9;
  }

  get visited() {
    return this.visit_count / this.lost_hours * 10;
  }

  get withoutDelayed() {
    return this.without_delay / this.lost_hours * 5;
  }

  get evaluationStats() {
    return this.cup(this.eval_count / (this.lost_hours * 0.3),1) * 10;
  }

  get outclassWork() {
    return this.outclass;
  }

  get total() {
    return this.evaluation + this.testEvaluation + this.visited + 
           this.withoutDelayed + this.evaluationStats + this.outclassWork;
  }

  cup(cupValue, maxCup) {
    if (cupValue < maxCup)
      return cupValue;
    else
      return maxCup;
  }
}

export default Rating;