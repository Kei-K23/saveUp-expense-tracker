import { useLoaderData, useNavigate } from "react-router-dom";
import { deleteData, fetchLocalData } from "../helper";
import ExpensesTable from "../components/ExpensesTable";
import { toast } from "react-toastify";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button";

const Expenses = () => {
  const { expensesData } = useLoaderData();

  const navigate = useNavigate();
  const handleClick = () => {
    return navigate(-1);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif mb-6">All Expenses Lists</h1>
      {expensesData && expensesData.length > 0 ? (
        <div>
          <h2 className="text-xl mb-7">
            Recent expenses{" "}
            <small className="font-bold">({expensesData.length})</small>
          </h2>
          <ExpensesTable expenses={expensesData} />
        </div>
      ) : (
        <h1 className="text-3xl text-center mt-10 text-slate-600">
          No expense there
        </h1>
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

export default Expenses;

export function expensesLoader() {
  const expensesData = fetchLocalData("expense");
  return { expensesData };
}

export async function expensesAction({ request }) {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "deleteFormData") {
    try {
      deleteData({
        type: "expense",
        deleteID: values.deleteExpenseID,
      });

      return toast.success("Successfully deleted expense!");
    } catch (e) {
      throw new Error("Cannot delete expense");
    }
  }
}
