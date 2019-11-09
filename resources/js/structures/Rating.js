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
    this.avg_eval = Number(avg_eval);
    this.avg_test = Number(avg_test);
    this.visit_count = Number(visit_count);
    this.without_delay = Number(without_delay);
    this.eval_count = Number(eval_count);
    this.outclass = Number(outclass);
    this.lost_hours = Number(lost_hours);
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