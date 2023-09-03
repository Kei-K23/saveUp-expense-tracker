// From React Router DOM
import { Link, useRouteError, useNavigate } from "react-router-dom";

// From components
import Button from "../components/Button";

// Icon
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleClick = () => {
    return navigate(-1);
  };
  return (
    <div className="my-16 flex justify-center items-center flex-col gap-10">
      <h1 className="text-4xl text-center text-red-500 font-bold">
        Ooh! There went something wrong!
      </h1>
      <p className="text-2xl text-slate-700">
        {error.message || error.statusText}
      </p>
      <p className="text-2xl text-slate-700 ">
        Error code: {error.status ? <b>{error.status}</b> : <b>unknown</b>}
      </p>
      <div className="flex justify-between items-center gap-4">
        <Button
          className="btn hover:bg-slate-700 hover:text-slate-100 text-lg"
          type="submit"
          text="Back"
          icon={<ArrowLeftIcon width={24} />}
          handleClick={handleClick}
        />
        <Link to="/">
          <Button
            className="btn hover:bg-slate-700 hover:text-slate-100 text-lg"
            text="Go to Home"
            icon={<HomeIcon width={24} />}
          />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
