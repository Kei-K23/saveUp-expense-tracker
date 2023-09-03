import { useLoaderData, useNavigate } from "react-router-dom";
import { addExpenseData, deleteData, getAllMatchingBudget } from "../helper";
import BudgetCard from "../components/BudgetCard";
import AddExpenseForm from "../components/AddExpenseForm";
import { toast } from "react-toastify";
import ExpensesTable from "../components/ExpensesTable";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button";

const Budget = () => {
  const navigate = useNavigate();
  const { budgetID } = useLoaderData();
  const budget = getAllMatchingBudget({
    type: "budget",
    key: "id",
    value: budgetID,
  })[0];
  const expenses = getAllMatchingBudget({
    type: "expense",
    key: "budgetID",
    value: budgetID,
  });

  const handleClick = () => {
    return navigate(-1);
  };
  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold mb-8">
        Viewing <span className="text-purple-600 ">{budget.name}</span> budget
      </h1>
      <BudgetCard budget={budget} deleteBudget={true} />
      <AddExpenseForm budgets={budget} />
      {expenses.length > 0 ? (
        <ExpensesTable expenses={expenses} showBudgetLink={false} />
      ) : (
        <p className="text-center text-2xl text-slate-600 mt-8">
          No expense yet!
        </p>
      )}
      <Button
        className="btn mt-8 gap-1 lg:gap-3 lg:px-4 lg:py-2 hover:bg-slate-700 hover:text-slate-100 text-lg"
        type="submit"
        text="Back"
        icon={<ArrowLeftIcon width={24} />}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Budget;

export async function budgetLoader({ params }) {
  const budgetID = params.id;
  return { budgetID };
}

export async function budgetAction({ request }) {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);
  if (_action === "addExpense") {
    try {
      addExpenseData({
        name: values.expenseName,
        amount: values.expenseAmount,
        budgetID: values.budgetID,
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
      return toast.success("Add new expense");
    } catch (e) {
      throw new Error("Cannot add expense");
    }
  }
}
