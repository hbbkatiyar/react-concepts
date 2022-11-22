# What is Virtual DOM in react?

    To understand the virtual DOM and learn why React implements it, let us refresh our knowledge of the actual browser DOM.

# Concept review: What is the DOM (Document Object Model)?

    Whenever a web document — such as HTML — is loaded in the browser, an object-based representation of the document’s elements is created in a tree-like structure. This object representation is called the Document Object Model, also known as the DOM.

    Due to its object-based nature, JavaScript and other scripting languages understand the DOM and can interact and manipulate the document content. For instance, with the DOM, developers can add or remove elements, modify their appearance and perform user’s actions on the web elements.

    DOM operations like DOM querying and updating are lighter and thus are very fast. However, for the update to reflect on the web page, the page will have to re-render.

# How re-rendering impacts performance?

    Re-rendering the page to reflect DOM updates is costly and can lead to performance shortcomings because the browser has to recalculate the CSS, rerun the layout for each visible element, and repaint the webpage.

    Let’s simulate a re-rendering page with the JavaScript code below:

    Example:

    const update = () => {
        const element = `
            <h3>JavaScript:</h3>
            <form>
                <input type="text"/>
            </form>
            <span>Time: ${new Date().toLocaleTimeString()}</span>
        `;

        document.getElementById("root1").innerHTML = element;
    };

    setInterval(update, 1000);

    The DOM tree representing the document looks like so:

    >>> "1-DOM-tree-representing-example-JavaScript-document.avif"

    By using a setInterval() callback in the code, we are rendering the state of the UI every second. As we can see in the GIF below, after the specified interval, the browser re-renders, runs the layout, and repaints the webpage, amongst other operations.

    The browser DOM has no mechanism to compare and contrast what has changed and repaint only that DOM node (in this case, the rendered time):

    >>> "2-Demonstration-of-full-page-re-rendering-after-manipulating-DOM.gif"

# Re-rendering in React: Why virtual DOM is used?

    As we know, React is a component-based library. A React component will naturally re-render if there are state or prop changes or if its parent component re-renders.

    React cannot afford the cost of repainting all of the DOM nodes after every re-render. To overcome this challenge, React implemented the concept of virtual DOM.

    Instead of allowing the browser to redraw all the page elements after every re-render or DOM update, React uses the concept of virtual DOM to figure out what exactly has changed without involving the actual DOM and then ensures that the actual DOM only repaints the necessary data.

    This concept helps React optimize performance.

# Virtual DOM in React

    Virtual DOM in React is a “virtual” representation of the actual DOM. It is nothing but an object created to replicate the actual DOM.

    Unlike the actual DOM, the virtual DOM is cheap to create because it doesn’t write to the screen. It is only available as a strategy to prevent a redraw of unnecessary page elements during re-render.

    Take a look at the following render code representing the React version of the previous JavaScript example:

    // ...
    const update = () => {
        const element = (
            <>
                <h3>React:</h3>
                <form>
                    <input type="text" />
                </form>
                <span>Time: {new Date().toLocaleTimeString()}</span>
            </>
        );
        root.render(element);
    };

    We can also write JSX code in plain React, like so:

    const element = React.createElement(
        React.Fragment,
        null,
        React.createElement("h3", null, "React:"),
        React.createElement(
            "form",
            null,
            React.createElement("input", {
                type: "text"
            })
        ),
        React.createElement("span", null, "Time: ", new Date().toLocaleTimeString())
    );

    Now, if we log the React element in the console:

    const element = (
        <>
            <h3>React:</h3>
            <form>
                <input type="text" />
            </form>
            <span>Time: {new Date().toLocaleTimeString()}</span>
        </>
    );
    console.log(element)

    We will have something like this:

    >>> virtual-DOM-after-logging-React-code-in-browser.avif

# How React implements the virtual DOM

    When we render the user interface, a virtual DOM for that render is created and kept in memory. If an update occurs in the render, React automatically creates a new virtual DOM tree for the update.

    To help explain this further, let’s visually represent the virtual DOM like so:

    >>> virtual-DOM.avif

    However, don’t forget that the virtual DOM is just a simple object representing the UI. Nothing gets drawn on the screen, and so, it is easy to create.

    After React creates the new virtual DOM tree, it compares it to the previous snapshot using a diffing algorithm to figure out what changes are necessary.

    It then uses a library called ReactDOM to ensure the actual DOM only receives and repaints the updated node or nodes. This process is called reconciliation.

    >>> reconciliation-virtual-DOM-vs-re-rendering-actual-DOM.avif

    When React implements the diffing algorithm, it starts by comparing whether or not both snapshots have the same root element.

    If they have the same element, React moves on and recurses on the attributes and then the children of the DOM node. If the root elements are of different types — which is rare in most updates — React will destroy the old DOM nodes and build a new DOM tree.

    If we inspect our React render, we will get the following behavior:

    >>> Inspecting-React-component-only-changed-node-repainted-on-re-render.gif

    On every render, React has a virtual DOM tree it compares with the previous version to determine what node content gets updated and ensure the updated node matches up with the actual DOM.

    In the GIF above, we can see that only the rendered time whose state changes gets repainted on every re-render.

    In another example below, we render a simple React component that updates the component state after a button click:

    Example:
    import { useState } from "react";

    const App = () => {
        const [open, setOpen] = useState(false);

        return (
            <div className="App">
                <button onClick={() => setOpen((prev) => !prev)}>toggle</button>
                <div className={open ? "open" : "close"}>
                    I'm {open ? "opened" : "closed"}
                </div>
            </div>
        );
    };
    export default App;

    As mentioned earlier, updating a component state re-renders the component. However, as seen below, on every re-render, React knows only to update the class name and the text that changed.

    >>> Updating-component-state-result-only-classname-text-changed.gif

# Recap of virtual DOM and why it’s used in React

    Whenever we manipulate the virtual DOM elements in React, we bypass the series of operations involved when we directly manipulate the actual DOM.

    This is possible because with virtual DOM, nothing gets drawn on the screen. Additionally, with the diffing algorithm, React can finalize what update is necessary and update only the object on the real DOM.

    The concept of virtual DOM in React undoubtedly helps reduce the performance cost of re-rendering the webpage, thereby minimizing the time it takes to repaint the screen.

    Here is a simple analogy to further solidify our knowledge of virtual DOM: Think of manipulating the virtual DOM as editing a structural design or blueprint instead of rebuilding the actual structure.

    Editing a blueprint to include an update is very cheap compared to rebuilding the structure every time an update occurs. When the blueprint is revised and finalized, we can then include only the update on the actual structure.
