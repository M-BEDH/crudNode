import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./components/Student";
import CreateStudent from "./components/CreateStudent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/update/:id" element={<CreateStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
