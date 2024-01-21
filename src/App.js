import './App.css';

import Login from './components/Login';


function App() {
  // let checked = true;
  return (
    <div className="App" >
      {/* <Grow
      style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 } : {})}>
        <Typography variant="h1" component="h2">
          Welcome To MediFind
        </Typography>
      </Grow> */}
      
      <Login />
      {/* <header className="App-header">
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
      </header> */}
    </div>
  );
}

export default App;
