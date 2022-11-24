// Approach 1: Function currying using bind
/*
let multiply = (x, y) => {
    return x * y;
};

let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5);

let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5);
*/

// Approach 2: Function currying using closure
let multiply = (x) => {
    return function (y) {
        console.log(x * y);
    }
};

let multiplyByTwo = multiply(2);
multiplyByTwo(5);