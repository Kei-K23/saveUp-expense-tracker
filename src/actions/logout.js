// From React Router DOM
import { redirect } from "react-router-dom";

// From helper.js
import { deleteItem } from "../helper";
import { toast } from "react-toastify";

export function logout() {
  deleteItem({ key: "user" });
  deleteItem({ key: "expense" });
  deleteItem({ key: "budget" });

  toast.success("Successfully logout!");

  return redirect("/");
}
