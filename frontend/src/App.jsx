import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import UpdateSubTask from "./Pages/UpdateSubTask";
import UserTasks from "./Pages/UserTasks";
import UserViewTask from "./Pages/UserViewTask";

const Layout = ({ children }) => {
  const location = useLocation();
  const showSidebar = !["/login", "/signup"].includes(location.pathname);
  const role = localStorage.getItem("role");
  return (
    <>
      {showSidebar && <Navbar />}
      <div className="flex">
        {showSidebar && role === "admin" && <Sidebar />}
        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Routes without Layout */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Routes with Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/view-task/:taskId" element={<ViewTask />} />
                <Route path="/update-task/:taskId" element={<UpdateTask />} />
                <Route
                  path="/create-subtask/:taskId"
                  element={<CreateSubTask />}
                />
                <Route
                  path="/update-subtask/:taskId/:subtaskId"
                  element={<UpdateSubTask />}
                />
                <Route path="/assign-task" element={<UserTasks />} />
                <Route
                  path="/user-view-task/:taskId"
                  element={<UserViewTask />}
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
