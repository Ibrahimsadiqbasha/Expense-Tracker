import React, { useEffect, useState } from "react";

function ExpenseForm(props) {
  const { itemToEdit } = props;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setAmount(itemToEdit.amount);
    }
  }, [itemToEdit]);

  const isEdit = props.itemToEdit;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      setError("Title is needed");
      return;
    }
    if (!amount) {
      setError("Amount is needed");
      return;
    }
    if (isEdit) {
      props.editExpense(itemToEdit._id, title, amount);
      props.setItemToEdit(null); // Reset form after editing
    } else {
      props.addExpense(title, amount);
    }
    setAmount("");
    setTitle("");
    setError("");
  }

  return (
    <div className="expense-form">
      <h1>{isEdit ? "Edit Expense" : "Add Expense"}</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit">{isEdit ? "Edit Expense" : "Add Expense"}</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
