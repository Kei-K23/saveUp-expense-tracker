// From Material UI
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// From helper.js
import { formatDate, getAllMatchingBudget } from "../helper";
import { Link, useFetcher } from "react-router-dom";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ExpensesTable({ expenses, showBudgetLink = true }) {
  const fetcher = useFetcher();

  const budget = expenses.map((expense) => {
    return getAllMatchingBudget({
      type: "budget",
      key: "id",
      value: expense.budgetID,
    })[0];
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Budget</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => (
            <StyledTableRow
              key={expense.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell>{expense.name}</StyledTableCell>
              <StyledTableCell>{expense.amount}</StyledTableCell>
              <StyledTableCell>{formatDate(expense.createdAt)}</StyledTableCell>
              {showBudgetLink && (
                <>
                  <StyledTableCell>
                    <Link
                      to={`/budget/${budget[index].id}`}
                      className="w-full lg:w-1/2 btn flex lg:gap-3 lg:py-2 lg:px-4 border-[0.2rem] border-dashed rounded-lg border-black transition-colors  hover:bg-slate-700 hover:text-slate-100 hover:border-solid text-lg"
                    >
                      {budget[index].name}
                    </Link>
                  </StyledTableCell>
                </>
              )}

              <StyledTableCell>
                <fetcher.Form method="POST">
                  <input type="hidden" name="_action" value="deleteFormData" />
                  <input
                    type="hidden"
                    name="deleteExpenseID"
                    value={expense.id}
                  />
                  <Button
                    type="submit"
                    icon={<TrashIcon width={24} className="text-red-500" />}
                  />
                </fetcher.Form>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
