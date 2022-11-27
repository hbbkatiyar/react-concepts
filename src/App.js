import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import TestHooks from './components/TestHooks';
// import useCustomHook from './hooks/useCustomHook';
// import SearchText from './components/SearchText'; 

const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => (
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
)


function App() {
  // useCustomHook();

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
        <BrowserRouter>
          <Switch>
            <RouteWithLayout exact path="/foo" layout={MainLayout} component={Foo} />
            <RouteWithLayout exact path="/fizz" layout={MainLayout} component={Foo} />

            <RouteWithLayout exact path="/bar" layout={AltLayout} component={Bar} />
            <RouteWithLayout exact path="/buzz" layout={AltLayout} component={Foo} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
