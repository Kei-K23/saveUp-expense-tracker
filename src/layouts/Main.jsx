// From React Router DOM
import { Outlet, useLoaderData } from "react-router-dom";

// From helper.js
import { fetchLocalData } from "../helper";

// From components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <>
      <Navbar userName={userName} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Main;

export function mainLoader() {
  const userName = fetchLocalData("user");
  return { userName };
}
