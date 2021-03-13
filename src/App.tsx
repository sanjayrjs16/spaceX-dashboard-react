import logo from './logo.svg';
import './App.css';


import TableContainer from './components/Table/TableContainer';
import Navbar from './components/Header/Navbar';

function App() {
  
  return (
    <div className="App">
      {/* {items.map((item) => {
          return <div>{item.name}</div>
      })} */}
      <Navbar />
      <TableContainer />
    </div>
  );
}

export default App;
