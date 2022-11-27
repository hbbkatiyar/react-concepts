let counter = 0;
function getData () {
    // call an API and get data
    console.log('fetching data...', counter++);
}

const debounce = function (fn, delay) {
    let timer;
    return function () {
        let context = this,
            args = arguments;

        clearTimeout(timer);
        
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

// Here we need to call get data method if the difference between 2 keypress events are 300ms.
const betterFunction = debounce(getData, 300);

