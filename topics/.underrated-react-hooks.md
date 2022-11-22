# React useImperativeHandle Hook

In React, data is passed from parent to child components via props, in what is known as unidirectional data flow. The parent component cannot directly call a function defined in the child component or reach down to grab a value for itself.

In certain circumstances, we want our parent component to reach down to the child component, getting data that originates in the child component for its own use. We can achieve this type of data flow with the useImperativeHandle Hook, which allows us to expose a value, state, or function inside a child component to the parent component through ref. You can also decide which properties the parent component can access, thereby maintaining the private scoping of the child component.

> Syntax

        useImperativeHandle(ref, createHandle, [dependencies])

        ref:            The ref passed down from the parent component
        createHandle:   The value to be exposed to the parent component
        dependencies:   An array of values that cause the Hook to return when changed

> Use cases

        1. When you want to implement imperative logic to tell a user how an action should be carried out in your app.
            (https://stackoverflow.com/questions/66664209/how-can-i-use-forwardref-in-react)
            e.g. you might programaticllay focus the fist input field of the form  as soon as a user lands on it, instead of having the user click into the form to focus it.

        2. Once, I used the "useImperativeHandle" Hook when I needed to open a modal component when a button in the parent component is clicked. Defining state in the parent component would cause the parent component and its children to re-render each time the modal button is clicked, therefore, I wanted the state in the child component. Instead, I stored the modal state in the Modal Component using "useImperativeHandle" and forwardRef:

        "Parent.js"

            import React, { useRef } from "react";
            import ChildComponent from './Child';

            const ParentComponent = () => {
                const childRef = useRef(null);

                const handleOpenModal = (value) => {
                    childRef.current.openModal(value)
                };

                return (
                    <div>
                        <p>This is a parent controller</p>

                        <ChildComponent ref={childRef} />

                        <button onClick={() => handleOpenModal(true)}>Open Modal</button>
                    </div>
                );
            };

            export default ParentComponent;

        In the code above, we defined a ref, which we passed down to the child component. In our code below, the ref will be the first parameter passed to useImperativeHandle in the child component.

        We also defined a handleOpenModal function, which returns the openModal function passed up from the child component with childRef.current.openModal(value). The function is then called when the button is clicked.

        The child component should look like the code below:

        "Child.js"

            import React, { forwardRef, useImperativeHandle, useState } from 'react';

            function ChildComponent (props, ref) {
                const [openModal, setOpenModal] = useState(false);

                useImperativeHandle(ref, () => ({
                    openModal: (value) => setOpenModal(value),
                }));

                if(!openModal) return null;

                return (
                    <div>
                        <p>This is a modal!</p>
                        <button onClick={() => setOpenModal(false)}> Close </button>
                    </div>
                )

            }

            export default forwardRef(ChildComponent);

        We wrapped the child component in a forwardRef to expose the openModal function defined in useImperativeHandle. In the parent component, the state defined in the child component is changed, causing a re-render of only the child component. Problem solved!

# React useLayoutEffect Hook

Like the useEffect Hook, the useLayoutEffect Hook lets you perform side effects like API calls, setting up subscriptions, and manually manipulating the DOM in a function component.

Although React fires both useEffect and useLayoutEffect after performing the DOM updates, useLayoutEffect is called before the browser paints those updates for users to see, synchronously, while useEffect is called after the browser paints those updates, asynchronously.

> Syntax

    useLayoutEffect(callback, [dependencies])

    callback: The function that contains the side effect logic
    dependencies: An array of dependencies. The callback function is run again when the value of any of the dependecies change.

    TestHooks.js
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

    In the code above, we have a side effect that updates the state with a random number and includes a button to reset state to 0. If we run the code above with the useEffect Hook, you’ll notice a flickering effect as the number changes from 0 to the next random number when the reset button is clicked.

    Now, change useEffect to useLayoutEffect and click the button again. The transition to the next random number is smoother.

    The snippets below represent the code with useEffect and useLayoutEffect, respectively:
        DOM updates => Browser paints the update for users to see => useEffect is run => another DOM update => Broswer paints the second update for user to see
        DOM updates => useLayoutEffect is run =>another DOM update => Broswer paints the overall update for user to see

> Use Cases

    Once, when I was developing a static website for a client, I used the useLayoutEffect Hook and the React Router DOM for routing. However, when navigating between the different pages, I noticed that the window scroll position of the page didn’t move to the top, instead, scrolling began from where it was on the previous page, which is not an uncommon occurrence with React Router DOM.

    We can solve this problem with useLayoutEffect as follows:

    import { useLayoutEffect } from "react";
    import { useLocation } from "react-router-dom";

    export default function ScrollToTop() {
        const { pathname } = useLocation();

        useLayoutEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    }

    The index.js file looks like the code below:

        function Index() {
            return (
                <Router>
                <ScrollToTop />
                <App />
                </Router>
            );
        }

    Basically, in the code above, we tell the browser to take a user to the top of the page before showing them any content. With useLayoutEffect, we can make that process seamless.

    There are several other practical applications of the useLayoutEffect Hook. After all DOM mutations, useLayoutEffect fires synchronously; therefore, it can be used to read and change the layout in the DOM, from getting the scroll position or other styles for an element to adding animations at a particular scroll position. Be careful though, your user won’t see anything until this Hook is run and another DOM update is made.

# React useDebugValue Hook

    Unlike the other Hooks we’ve covered, which are used to improve the user experience, useDebugValue improves the developer experience, helping developers log information in React DevTools in an easier format. Note that the useDebugValue Hook should only be used in combination with a custom React Hook.

> Syntax

    useDebugValue(value)

    If you’re familiar with React DevTools, then you know that whenever a built-in React Hook like useState or useRef is used in a custom Hook, it will debug its respective values within React DevTools.

    For example, consider the custom Hook below:

> Use Cases

# Conclusion

    In this tutorial, we covered three React Hooks that we don’t need most of the time but can make our lives easier when we face certain edge cases.

    The useImperativeHandle Hook allows us to expose a value, state, or function inside a child component to the parent component. useLayoutEffect lets us perform side effects like API calls, setting up subscriptions, and manually manipulating the DOM in a function component. Lastly, the useDebugValue Hook makes it easier for developers to log information in React DevTools.
