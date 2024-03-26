import "normalize.css";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import DayViewPage from "./pages/DayViewPage";
import CalendarViewPage from "./pages/CalendarViewPage";
import TreeViewPage from "./pages/TreeViewPage";
import WorkspaceRoot from "./components/WorkspaceRoot";

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
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
