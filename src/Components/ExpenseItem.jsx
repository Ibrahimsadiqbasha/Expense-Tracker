
import '../index.css'
function ExpenseItem(props) {
    const {amount,title,_id}=props.value
    const type=amount>0?"income":"expense"
    function handleDelete(){
      props.deleteExpense(_id)
    }
    function handleEdit(){
      props.setItemToEdit(props.value)
    }
  return (
    <>
    <div className={`expense-item ${type}`}>
        <div className='expense-title'>{title}</div>
        <div className='expense-amount'>{amount}</div>
        <div className='delete-button-overlay'>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>     {/* For editing */ }
        </div>
    </div>
    
    </>
  )
}

export default ExpenseItem;