import { redirect } from "react-router-dom";
import { deleteData, getAllMatchingBudget } from "../helper";
import { toast } from "react-toastify";

export async function deleteBudget({ request }) {
  // delete all associate data of budget
  const formData = await request.formData();
  const { deleteBudget } = Object.fromEntries(formData);

  const expenses = getAllMatchingBudget({
    type: "expense",
    key: "budgetID",
    value: deleteBudget,
  });
  deleteData({
    type: "budget",
    deleteID: deleteBudget,
  });
  expenses.map((expense) =>
    deleteData({ type: "expense", deleteID: expense.id })
  );

  toast.success("Successfully deleted budget!");
  // redirect to home page
  return redirect("/");
}
