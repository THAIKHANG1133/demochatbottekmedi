
import './App.css';
import Login from './components/Login';
import HomeChat from './components/HomeChat';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      < Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Home" element={<HomeChat />} /> 
    </ Routes>
    </Router>
    {/* <Login/> */}
    </div>
  );
}

export default App;
