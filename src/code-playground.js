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

//OBJECT DESTRUCTURING

const user = {
  firstName: "Robin",
  lastName: "Wieruch",
};
//without Descructuring

const fName = user.firstName;
const lName = user.lastName;
console.log(fName + " " + lName);

//with object destructuring

const { firstName, lastName } = user;
console.log(firstName + " " + lastName);
//Nest Desctructing
const peoples = {
  person: "Aldo",
  pet: {
    nombre: "opey",
  },
};
//with destcructuring
const {
  person,
  pet: { nombre },
} = peoples;

console.log(person + " has a pet named " + nombre);

//SPREAD operator (spread into another object)

const profile = {
  firstName: "aldo",
  lastName: "garcia",
};
const address = {
  country: "canada",
  city: "toronto",
};
const userProfile = {
  ...profile,
  gender: "male",
  ...address,
};
console.log(userProfile)

// filter function demo

const words = ["spray", "present", "trust", "exuberant", "descruction"];

const filteredWords = words.filter((word) => {
  return word.length > 6;
});

console.log(filteredWords);
