// From React Router DOM
import { useFetcher } from "react-router-dom";

// From components
import Button from "./Button";

// From Icon
import { UserIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const fetcher = useFetcher();
  const isSubmittingForm = fetcher.state === "submitting";
  return (
    <div className="p-8 lg:py-14 lg:px-20 flex justify-start flex-col lg:justify-between lg:flex-row gap-10">
      <div className="lg:flex lg:flex-col lg:justify-center lg:items-start">
        <h1 className="text-4xl font-serif leading-[3rem] font-bold mb-8">
          Manage Your Income And Outcome By Keep{" "}
          <span className="text-purple-500">Tracking</span>
        </h1>
        <p className="text-2xl font-mono text-slate-700 mb-8">
          Managing your finances has never been easier. Say goodbye to financial
          stress and hello to financial control with our Expense Tracker.
        </p>
        <p className="text-2xl font-mono text-slate-700">
          To use <span className="text-purple-500">Expense Track</span>, first
          enter your name
        </p>
        <fetcher.Form method="POST" className="mt-8">
          <label htmlFor="textInput" className="text-xl">
            Enter your name :
          </label>
          <input
            id="textInput"
            type="text"
            name="userName"
            placeholder="Enter your name"
            aria-label="enter your name"
            className="custom-border input focus:bg-purple-800 focus:text-white my-4"
            required
          />
          <input type="hidden" name="_action" value="userLogin" />
          <Button
            disabled={isSubmittingForm}
            icon={<UserIcon width={24} />}
            type="submit"
            text={isSubmittingForm ? "Logging..." : "Login"}
            className="btn hover:bg-slate-700 hover:text-slate-100 text-lg"
          />
        </fetcher.Form>
      </div>
      <div>
        <img src="/Saly-1.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
