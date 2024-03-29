import Home from "./routes/Home";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Home/>    
      </BrowserRouter>
    </div>
  );
}

export default App;
