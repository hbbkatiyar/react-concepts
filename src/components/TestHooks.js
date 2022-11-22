import React, {
    useState,
    useEffect
} from 'react';

const TestHooks = () => {
    const [randomNumber, setRandomNumber] = useState(0);

    useEffect(() => {
        if (randomNumber === 0) {
            setRandomNumber(Math.random() * 1000);
        }
    }, [randomNumber]);

    return (
        <div className='App'>
            <p>{randomNumber}</p>
            <button onClick={() => setRandomNumber(0)}>
                Change value 
            </button>
        </div>
    );
};

export default TestHooks;