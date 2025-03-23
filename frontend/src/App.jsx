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

const Layout = ({ children }) => {
  const location = useLocation();
  const showSidebar = !["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showSidebar && <Navbar />}
      <div className="flex">
        {showSidebar && <Sidebar />}
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
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
