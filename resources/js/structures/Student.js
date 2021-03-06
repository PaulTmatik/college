import {dateDiff} from '../helpers';

class Student {
  constructor(guid, lastName, firstName, secondName, gender, birthAt) {
    this.guid = guid;
    this.lastName = lastName;
    this.firstName = firstName;
    this.secondName = secondName;
    this.gender = gender;
    this.birthAt = birthAt;
    this.groups = [];
  }

  get fullName() {
    return [this.lastName, this.firstName, this.secondName].join(' ');
  }

  get age() {
    return dateDiff(this.birthAt, new Date());
  }
}

export default Student;