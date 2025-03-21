import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignupPage";
import Login from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import CreateUser from "./Pages/CreateUser";
import CreateTask from "./Pages/CreateTask";
import TaskList from "./Pages/TaskList";
import ViewTask from "./Pages/ViewTask";
import CreateSubTask from "./Pages/CreateSubTask";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import UpdateTask from "./Pages/UpdateTask";
const App = () => {
  const showSidebar =
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/signup";

  return (
    <Router>
      {showSidebar && <Navbar />}
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="flex-grow">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/view-task/:taskId" element={<ViewTask />} />
            <Route path="/update-task/:taskId" element={<UpdateTask />} />
            <Route path="/create-subtask/:taskId" element={<CreateSubTask />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
