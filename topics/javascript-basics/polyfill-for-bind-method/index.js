let name = {
    firstname: 'Binit',
    lastname: 'Katiyar'
};

let printName = function (hometown, state) {
    console.log(this.firstname + ' ' + this.lastname + ' from ' + hometown + ', ' + state);
};

// Bind method implementation
let printMyName = printName.bind(name, "Kanpur");
printMyName("Uttar Pradesh");

// Custom bind method
Function.prototype.mybind = function (...args) {
    let that = this,
        params = args.slice(1);

    return function (...args2) {
        that.apply(args[0], [...params, ...args2]);
    }
};

let printMyName2 = printName.mybind(name, "Kanpur");
printMyName2("Uttar Pradesh");