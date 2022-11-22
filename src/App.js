// import logo from './logo.svg';
import './App.css';
// import TestHooks from './components/TestHooks';
import useCustomHook from './components/useCustomHook';

function App() {
  useCustomHook();

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <ParentComponent /> */}
        {/* <TestHooks /> */}
      </header>
    </div>
  );
}

export default App;
