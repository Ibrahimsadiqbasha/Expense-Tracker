import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm.jsx";
import { v4 as uid } from "uuid";
import History from "./History.jsx";
import ParentContainer from "./ParentContainer.jsx";

function ExpenseContainer() {
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/expenses");
      const data = await response.json();
      setExpense(data);
    } catch (error) {
      console.error("Failed to fetch", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (title, amount) => {
    try {
      const response = await fetch("http://localhost:4000/expenses", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, amount }),
      });
      if (response.ok) {
        const newItem = await response.json();
        setExpense((prev) => [...prev, newItem]);
      } else {
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.log("Error adding expense.");
    }
  };

  const deleteExpense = async (_id) => {
    try {
      const response = await fetch(`http://localhost:4000/expenses/${_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setExpense((prev) => prev.filter((exp) => exp._id !== _id));
      } else {
        console.log("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error in deleting expense", error);
    }
  };

  const editExpense = async (id, title, amount) => {
    try {
      const response = await fetch(`http://localhost:4000/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount }),
      });
      if (response.ok) {
        await fetchExpenses(); // 🔁 Fetch fresh list after edit
        setItemToEdit(null);   // ✅ Clear form after editing
      } else {
        console.log("Failed to update expense");
      }
    } catch (error) {
      console.error("Failed to edit expense", error);
    }
  };

  return (
    <>
      <div className="expense-container">
        <ParentContainer value={expense} />
        <History
          value={expense}
          deleteExpense={deleteExpense}
          editExpense={editExpense}
          setItemToEdit={setItemToEdit}
        />
        <ExpenseForm
          addExpense={addExpense}
          itemToEdit={itemToEdit}
          editExpense={editExpense}
          setItemToEdit={setItemToEdit}
        />
      </div>
    </>
  );
}

export default ExpenseContainer;
