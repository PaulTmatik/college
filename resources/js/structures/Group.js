import { dateDiff } from '../helpers';

class Group {
  constructor(guid, formatedName, priority, student_count, startedAt, endedIn) {
    this.guid = guid;
    this.formatedName = formatedName;
    this.startedAt = startedAt;
    this.endedIn = endedIn;
    this.priority = priority;
    this.student_count = student_count;
  }

  get maxCource() {
    const { years } = dateDiff(this.startedAt, this.endedIn);
    return years + 1;
  }

  get currentCource() {
    const {years} = dateDiff(new Date(), this.endedIn);
    return this.maxCource - years;
  }

  get isEnded() {
    return (new Date()).getFullYear() > this.endedIn.getFullYear();
  }

  /* Преобразует имя формата: 
    %№%01 или %№+1%02 или %№+2%03
  в 101   или 202     или 303 */ 
  getNameFromDate(date) {
    if (date.getTime() < this.startedAt.getTime()) date = this.startedAt;
    if (date.getTime() > this.endedIn.getTime()) date = this.endedIn;

    const {years} = dateDiff(date, this.endedIn);
    const { regEx, calcedMaxCource } = this.getMinMaxCourceReplacer();
    return this.formatedName.replace(regEx, calcedMaxCource - years);
  }

  getMinMaxCourceReplacer() {
    const regEx = /(\{|%№)(\+?[0-9])?(\}|%)/;
    const found = this.formatedName.match(regEx);
    const addition = found[2] 
      ? Number(found[2].substring(found[2].indexOf('+')+1)) 
      : 0;
    const calcedMaxCource = this.maxCource + addition;
    return { regEx, calcedMaxCource };
  }
}

export default Group;