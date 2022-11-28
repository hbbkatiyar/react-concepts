import React from 'react';
// import {ErrorBoundary} from 'react-error-boundary'
// import logo from './logo.svg';
import './App.css';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import TestHooks from './components/TestHooks';
// import useCustomHook from './hooks/useCustomHook';
// import SearchText from './components/SearchText'; 
import ErrorBoundary from './components/ErrorBoundary';
import BuggyCounter  from './components/BuggyCounter';

/* const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const MainLayout = props => (
  <div>
    <h1>Main Layout</h1>
    {props.children}
  </div>
)

const AltLayout = props => (
  <div>
    <h1>Alt Layout</h1>
    {props.children}
  </div>
)

const Foo = () => (
  <p>Foo Component</p>
)

const Bar = () => (
  <p>Bar Component</p>
) */

/* function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function Bomb() {
  throw new Error('💥 CABOOM 💥')
} */

function App() {
  // useCustomHook();
  // const [explode, setExplode] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        
        {/* <ParentComponent /> */}

        {/* <TestHooks /> */}
        
        {/* <SearchText /> */}
        
        {/* <BrowserRouter>
          <Switch>
            <RouteWithLayout exact path="/foo" layout={MainLayout} component={Foo} />
            <RouteWithLayout exact path="/" layout={MainLayout} component={Foo} />
            <RouteWithLayout exact path="/bar" layout={AltLayout} component={Bar} />
          </Switch>
        </BrowserRouter> */}

        <div>
          <p>
            <b>
              This is an example of error boundaries in React 16.
              <br /><br />
              Click on the numbers to increase the counters.
              <br />
              The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
            </b>
          </p>
          <hr />
          <ErrorBoundary>
            <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
            <BuggyCounter />
            <BuggyCounter />
          </ErrorBoundary>
          <hr />
          <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
          <ErrorBoundary><BuggyCounter /></ErrorBoundary>
          <ErrorBoundary><BuggyCounter /></ErrorBoundary>
        </div>

        {/* <div>
          <button onClick={() => setExplode(e => !e)}>toggle explode</button>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => setExplode(false)}
            resetKeys={[explode]}
          >
            {explode ? <Bomb /> : null}
          </ErrorBoundary>
        </div> */}
      </header>
    </div>
  );
}

export default App;
