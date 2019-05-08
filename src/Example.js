import React, {useState, useEffect} from 'react';

export function Example() {
    // declare new state variable called "count"
    const [count, setCount] = useState(0);
    
    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        // update document title using the broser API
        document.title = `You clicked ${count} times`;

        return function cleanup () {
            document.title = 'Clean!';
            console.log('cleaned');
        }
    });
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count+1)}>
                Click me
            </button>
        </div>
    );
}