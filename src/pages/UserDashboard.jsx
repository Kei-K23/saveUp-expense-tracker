// From React Router DOM
import { Link, useLoaderData } from "react-router-dom";

// From helper.js
import {
  addBudgetData,
  addExpenseData,
  deleteData,
  fakeTimeWaiter,
  fetchLocalData,
} from "../helper";

// From components
import Login from "../components/Login";

// From toastify
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetCard from "../components/BudgetCard";
import ExpensesTable from "../components/ExpensesTable";
import Button from "../components/Button";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

const UserDashboard = () => {
  const { userName, budgetData, expensesData } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="p-6 lg:py-8 lg:px-16">
          <h1 className="text-4xl mb-5 lg:mb-10 font-serif font-bold">
            Welcome <span className="text-purple-500">{userName}</span>,{" "}
            <span className="text-lg font-bold ">SaveUp</span>
          </h1>
          <div>
            {budgetData && budgetData?.length > 0 ? (
              <>
                <div className=" lg:flex lg:justify-between lg:items-center h-full gap-4 lg:gap-10">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgetData} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-4">Existing Budgets</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {budgetData.map((budget) => (
                      <BudgetCard key={budget.id} budget={budget} />
                    ))}
                  </div>
                </div>
                <div className="my-10">
                  {expensesData && expensesData.length > 0 ? (
                    <>
                      <h2 className="text-xl font-bold mb-4">
                        Recent Expenses
                      </h2>
                      <ExpensesTable
                        expenses={expensesData
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 7)}
                        showBudgetLink={true}
                      />
                      <Link to="/expenses">
                        <Button
                          className="mt-5 btn flex gap-1 lg:py-2 lg:px-4 border-[0.2rem] rounded-lg border-black transition-colors  hover:bg-slate-700 hover:text-slate-100 hover:border-solid text-lg"
                          text="View all expenses"
                          icon={<ClipboardDocumentCheckIcon width={24} />}
                        />
                      </Link>
                    </>
                  ) : (
                    <p className="text-center text-2xl text-slate-600 mt-8">
                      No expense yet!
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl text-slate-700 mb-6">
                  Join thousands of satisfied users who have taken control of
                  their finances and achieved their financial goals with our{" "}
                  <span className="text-purple-500">SaveUp</span> Expense
                  Tracker. Start your journey to financial freedom today!
                </h2>
                <AddBudgetForm />
              </>
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default UserDashboard;

export const userDashboardLoader = () => {
  const userName = fetchLocalData("user");
  const budgetData = fetchLocalData("budget");
  const expensesData = fetchLocalData("expense");
  return { userName, budgetData, expensesData };
};

export const userDashboardAction = async ({ request }) => {
  //! Fake time waiter and this is only for purpose (you can remove this function)
  await fakeTimeWaiter();
  //! -------------------

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // form data from user login
  if (_action === "userLogin") {
    try {
      localStorage.setItem("user", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      toast.error("Cannot create user!");
      throw new Error("Cannot create user!");
    }
  }
  if (_action === "addBudget") {
    try {
      addBudgetData({
        name: values.budgetName,
        amount: values.budgetAmount,
      });
      return toast.success("Created new budget");
    } catch (e) {
      toast.error("Cannot create new budget!");
      throw new Error("Cannot create new budget!");
    }
  }
  if (_action === "addExpense") {
    try {
      addExpenseData({
        name: values.expenseName,
        amount: values.expenseAmount,
        budgetID: values.budgetExpense,
      });
      return toast.success("Add new expense");
    } catch (e) {
      throw new Error("Cannot add expense");
    }
  }
  if (_action === "deleteFormData") {
    try {
      deleteData({
        type: "expense",
        deleteID: values.deleteExpenseID,
      });
      return toast.success("Successfully deleted expense");
    } catch (e) {
      toast.error("Cannot delete expense!");
      throw new Error("Cannot delete expense!");
    }
  }
};
