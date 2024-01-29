import logo from "./logo.svg";
import "./App.css";
import { Box } from "./Box";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Box>
          <p slot="content">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <h1 slot="title">Lorem ipsum dolor sit amet</h1>
        </Box>
      </header>
    </div>
  );
}

export default App;
