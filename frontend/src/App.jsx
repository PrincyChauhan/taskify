import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignupPage";
import Login from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import CreateUser from "./Pages/CreateUser";
import CreateTask from "./Pages/CreateTask";
import TaskList from "./Pages/TaskList";
import ViewTask from "./Pages/ViewTask";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/view-task/:taskId" element={<ViewTask />} />
      </Routes>
    </Router>
  );
};

export default App;
