import { ClockIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import { useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmittingForm = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmittingForm) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmittingForm]);

  return (
    <div className="my-10 w-full lg:w-1/2">
      <h2 className="text-xl font-bold mb-4">
        Add New{" "}
        <span className="text-purple-500">
          {budgets.length === 1 && budgets.map((bud) => bud.name)}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="POST" className="custom-border" ref={formRef}>
        <div>
          <label htmlFor="expenseName" className="text-lg font-bold">
            Expense name:
          </label>
          <input
            className="bg-slate-200 py-2 rounded-xl px-4 input  my-4 focus:ring-4 focus:border-none focus:outline-none focus:ring-purple-400"
            type="text"
            name="expenseName"
            id="expenseName"
            aria-label="expense name"
            placeholder="e.g buy books"
            required
            ref={focusRef}
          />
        </div>
        <div>
          <label htmlFor="expenseAmount" className="text-lg font-bold">
            Expense amount:{" "}
          </label>
          <input
            className="bg-slate-200 py-2 rounded-xl px-4 input  my-4 focus:ring-4 focus:border-none focus:outline-none focus:ring-purple-400"
            type="number"
            name="expenseAmount"
            id="expenseAmount"
            aria-label="expense amount"
            placeholder="e.g 20.00"
            step="0.01"
            inputMode="decimal"
            required
          />
        </div>
        {budgets.length > 1 ? (
          <div className={budgets.length === 1 ? "hidden" : "block"}>
            <label htmlFor="budgetExpense" className="text-lg font-bold">
              Budget categories:{" "}
            </label>
            <select
              className="bg-slate-200 py-2 rounded-xl px-4 input  my-4 focus:ring-4 focus:border-none focus:outline-none focus:ring-purple-400"
              name="budgetExpense"
              id="budgetExpense"
            >
              {budgets
                .sort((a, b) => {
                  return a.createdAt - b.createdAt;
                })
                .map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
            </select>
          </div>
        ) : (
          <input type="hidden" name="budgetID" value={budgets.id} />
        )}
        <input type="hidden" name="_action" value="addExpense" />
        <Button
          disabled={isSubmittingForm}
          type="submit"
          text={isSubmittingForm ? "Submitting..." : "Add Expense"}
          icon={
            isSubmittingForm ? (
              <ClockIcon width={24} />
            ) : (
              <PlusCircleIcon width={24} />
            )
          }
          className="btn flex gap-1 lg:py-2 lg:px-4 border-[0.2rem] border-dashed rounded-lg border-black transition-colors  hover:bg-slate-700 hover:text-slate-100 hover:border-solid text-lg"
        />
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
