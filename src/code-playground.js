// comparing classes with  function components

class Developer {
  constructor(firstName, LastName) {
    this.firstName = firstName;
    this.lastName = LastName;
  }
  getName() {
    return this.firstName + " " + this.lastName;
  }
}

const robin = new Developer("Robin", "Wieruch");

console.log(robin.getName());

const dennis = new Developer("Dennis", "wieruch");

console.log(dennis.getName());

// filter function demo

const words = ["spray", "present", "trust", "exuberant", "descruction"];

const filteredWords = words.filter((word) => {
  return word.length > 6;
});

console.log(filteredWords)