import './App.css';
import Weather from './weather';

function App() {
  return (
    <div className="App">
      <div className='git'>
        <a href="https://github.com/NITISHGOYAL26/Weather" target='_blank'><i className='fa-brands fa-github' style={{color:"#ffffff"}}></i></a>
      </div>
      <Weather />
    </div>
  );
}

export default App;
