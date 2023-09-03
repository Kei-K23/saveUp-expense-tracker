// import from React Router DOM
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// From layouts
import Main, { mainLoader } from "./layouts/Main";

// From Page
import UserDashboard, {
  userDashboardAction,
  userDashboardLoader,
} from "./pages/UserDashboard";
import ErrorPage from "./pages/ErrorPage";

// From actions
import { logout } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

// From react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Expenses, { expensesAction, expensesLoader } from "./pages/Expenses";
import Budget, { budgetAction, budgetLoader } from "./pages/Budget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
        loader: userDashboardLoader,
        action: userDashboardAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "budget/:id",
        element: <Budget />,
        loader: budgetLoader,
        action: budgetAction,
        children: [
          {
            path: "deleteBudget",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "expenses",
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "logout",
        action: logout,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
