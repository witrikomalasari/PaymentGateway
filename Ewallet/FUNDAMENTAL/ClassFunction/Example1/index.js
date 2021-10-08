class person {
  constructor(name) {
    this.name = name;
  }
  // method yg return the string
  toString() {
    return `Name: ${this.name}`;
  }
}

class students extends person {
  constructor(name, id) {
    //super keywords to for calling above class constructor

    super(name);
    this.id = id;
  }

  toString() {
    return `${super.toString()}, Student ID : ${this.id}`;
  }
}

let student1 = new students('Hridoy', 26);
console.log(student1.toString());
// Name: Hridoy, Student ID : 26
