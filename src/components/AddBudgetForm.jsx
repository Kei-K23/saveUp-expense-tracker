import { useEffect, useRef } from "react";
// From React Router DOM
import { useFetcher } from "react-router-dom";

// From components
import Button from "./Button";

// From Icons
import { PlusCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
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
    <div className="my-10 w-full lg:w-1/2 ">
      <h2 className="text-xl font-bold mb-4">Create New Budget</h2>
      <fetcher.Form method="POST" className="custom-border " ref={formRef}>
        <div>
          <label htmlFor="budgetName" className="text-lg font-bold">
            Budget name:
          </label>
          <input
            className="bg-slate-200 py-2 rounded-xl px-4 input my-4 focus:ring-4 focus:border-none focus:outline-none focus:ring-purple-400"
            type="text"
            name="budgetName"
            id="budgetName"
            aria-label="budget name"
            placeholder="Enter new budget name"
            required
            ref={focusRef}
          />
        </div>
        <div>
          <label htmlFor="budgetAmount" className="text-lg font-bold">
            Budget amount:{" "}
          </label>
          <input
            className="bg-slate-200 py-2 rounded-xl px-4 input my-4 focus:ring-4 focus:border-none focus:outline-none focus:ring-purple-400"
            type="number"
            name="budgetAmount"
            id="budgetAmount"
            aria-label="budget amount"
            placeholder="e.g 10.20"
            step="0.01"
            inputMode="decimal"
            required
          />
        </div>
        <input type="hidden" name="_action" value="addBudget" />
        <Button
          disabled={isSubmittingForm}
          type="submit"
          text={isSubmittingForm ? "Submitting..." : "Add Budget"}
          icon={
            isSubmittingForm ? (
              <ClockIcon width={24} />
            ) : (
              <PlusCircleIcon width={24} />
            )
          }
          className="btn flex gap-1 border-[0.2rem] border-dashed rounded-lg border-black transition-colors  hover:bg-slate-700 hover:text-slate-100 hover:border-solid text-lg"
        />
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
