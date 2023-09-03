// From React Router DOM
import { Form, NavLink } from "react-router-dom";

// From Components
import Button from "./Button";

// From Icons
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const Navbar = ({ userName }) => {
  return (
    <nav className="navbar lg:py-5 lg:px-16">
      <NavLink
        to="/"
        aria-label="home"
        className="flex items-center gap-2 cursor-pointer "
      >
        <BanknotesIcon width={26} />{" "}
        <span className="text-xl lg:text-2xl">SaveUp</span>
      </NavLink>
      {userName && (
        <Form
          action="/logout"
          method="POST"
          onSubmit={(e) => {
            if (!confirm("Delete user and all Data?")) {
              e.preventDefault();
            }
          }}
        >
          <Button
            type="submit"
            text="Delete User"
            icon={<TrashIcon width={24} />}
            className="btn gap-1 lg:gap-2 lg:py-2 lg:px-4 hover:bg-red-500 hover:text-slate-100 text-lg cursor-pointer"
          />
        </Form>
      )}
    </nav>
  );
};

export default Navbar;
