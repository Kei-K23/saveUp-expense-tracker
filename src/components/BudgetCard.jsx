import { Form, Link } from "react-router-dom";
import {
  calculateTotalSpent,
  formatCurrency,
  formatProgressBar,
} from "../helper";
import Button from "./Button";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

const BudgetCard = ({ budget, deleteBudget = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateTotalSpent(id);
  console.log(spent);
  return (
    <div
      className={`custom-border border-dashed w-full my-3`}
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-center  lg:gap-8">
        <h3
          className={`text-xl lg:text-2xl font-bold`}
          style={{ color: color }}
        >
          {name}
        </h3>
        <h3
          className={`text-xl lg:text-2xl font-bold`}
          style={{ color: color }}
        >
          {formatCurrency(amount)}
          <br />
          <span className="text-lg lg:text-xl">Budgeted</span>
        </h3>
      </div>
      <progress max={amount} value={spent} className="w-full mt-4">
        {formatProgressBar(spent / amount)}
      </progress>
      <div className="flex justify-between items-center  lg:gap-4">
        <h3
          className={`text-xl lg:text-2xl font-bold`}
          style={{ color: color }}
        >
          {spent ? formatCurrency(spent) : formatCurrency(0)}
          <br />
          <span className="text-lg">spent</span>
        </h3>
        <h3 className={`text-xl lg:text-2xl font-bold text-slate-500`}>
          {spent ? formatCurrency(amount - spent) : formatCurrency(amount)}
          <br />
          <span className="text-lg">remaining</span>
        </h3>
      </div>
      <div className="flex justify-center items-center mt-5 mb-2">
        {deleteBudget ? (
          <Form
            method="POST"
            action="deleteBudget"
            onSubmit={(e) => {
              if (!confirm("Do you really want to delete this budget?")) {
                e.preventDefault();
              }
            }}
          >
            <input type="hidden" name="deleteBudget" value={id} />
            <Button
              type="submit"
              text="Delete Budget"
              customColor={color}
              icon={<ClipboardDocumentCheckIcon width={24} />}
              className="btn flex gap-1 lg:gap-3 lg:py-2 lg:px-4 border-[0.2rem] border-dashed rounded-lg border-black transition-colors  hover:bg-slate-700 hover:text-slate-100 hover:border-solid text-lg"
            />
          </Form>
        ) : (
          <Link to={`/budget/${id}`}>
            <Button
              text="View Budget"
              icon={<ClipboardDocumentCheckIcon width={24} />}
              customColor={color}
              className="btn flex gap-1 lg:gap-3 lg:py-2 lg:px-4 border-[0.2rem] rounded-lg border-black transition-colors  hover:bg-slate-700 hover:text-slate-100 hover:border-solid text-lg"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default BudgetCard;
