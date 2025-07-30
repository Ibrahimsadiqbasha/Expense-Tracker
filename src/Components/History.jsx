
import ExpenseItem from "./ExpenseItem.jsx"


function History(props){
const expenses=props.value

    return(
        <>
        <div className="history">
            <h1>History</h1>
            {
                expenses.map((item)=>(
                    <>
                    <ExpenseItem key={item._id} value={item} isEditing={props.itemToEdit===item._id} deleteExpense={props.deleteExpense} setItemToEdit={props.setItemToEdit}/>
                    </>
                ))
            }
        </div>
        </>
    )
}
export default History;