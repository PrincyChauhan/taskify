import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignupPage";
import Login from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import CreateUser from "./Pages/CreateUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </Router>
  );
};

export default App;
