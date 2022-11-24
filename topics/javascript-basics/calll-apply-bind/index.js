let person = {
    firstname: 'Binit',
    lastname: 'Katiyar'
};

let person2 = {
    firstname: 'Sachin',
    lastname: 'Tendulkar'
};

let printFullName = function (hometown, state) {
    console.log(this.firstname + ' ' + this.lastname + ' from ' + hometown + ', ' + state);
};

printFullName.call(person, "Kanpur", "Uttar Pradesh");

// Using call method we can do function borrowing
printFullName.call(person2, "Mumbai", "Maharashtra");
printFullName.apply(person2, ["Mumbai", "Maharashtra"]);

// bind method
// (It binds the method with the object and return a copy of it which can be invoked later)

let printName = printFullName.call(person2, "Mumbai", "Maharashtra");
console.log(printName);