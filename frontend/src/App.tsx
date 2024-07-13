import "normalize.css";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import DayViewPage from "./pages/DayViewPage";
import CalendarViewPage from "./pages/CalendarViewPage";
import TreeViewPage from "./pages/TreeViewPage";
import WorkspaceRoot from "./components/WorkspaceRoot";
import ChatRoom from "./components/ChatRoom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UserProvider } from "./contexts/UserContext";
import { TaskInfoProvider } from "./contexts/TaskInfoContext";
import ProfilePage from "./pages/ProfilePage";
import GoogleLoginPage from "./pages/GoogleLoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/workspace",
      element: <WorkspaceRoot />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "dayview",
          element: <DayViewPage />,
        },
        {
          path: "treeview/:categoryId",
          element: <TreeViewPage />,
        },
        {
          path: "calendarview",
          element: <CalendarViewPage />,
        },
        {
          path: "chatroom/:roomId",
          element: <ChatRoom />,
        },
      ],
    },
    {
      path: "/profile",
      element: <ProfilePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/googleLogin",
      element: <GoogleLoginPage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProvider>
          <TaskInfoProvider>
            <RouterProvider router={router} />
          </TaskInfoProvider>
        </UserProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
