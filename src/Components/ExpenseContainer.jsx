import { useState } from "react";
import ExpenseForm from "./ExpenseForm.jsx";
import {v4 as uid} from "uuid";
import History from "./History.jsx";
import ParentContainer from "./ParentContainer.jsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function ExpenseContainer()
{
    const [expense,setExpense]=useState([]);
    const [loading,setLoading]=useState(null);
    const[itemToEdit,setItemToEdit]=useState(null);
    
    
    //fetch
    const fetchExpenses =async()=>{
        setLoading(true);
        try{
            const response=await fetch("http://localhost:4000/expenses");
            const data=await response.json();
            setExpense(data);
        }
        catch(error){
            console.error("Failed to fetch",error);
        }
        setLoading(false);
    }
    console.log(expense);
    useEffect(()=>{
        fetchExpenses();
    },[]);




    // const EXPENSE=[{
    //     id:uid(),
    //     title:"Expense1",
    //     amount:100
    // },{
    //     id:uid(),
    //     title:"Expense2",
    //     amount:500
    // }
    // ]
    // const[expense,setExpense]=useState(EXPENSE)
    // function addExpense(title,amount){
    //     setExpense([...expense,{id:uid(),title,amount}])
    // }
    // function deleteExpense(id){
       
    //     setExpense(expense.filter((exp)=>exp.id!=id))
    // }

    const addExpense=async(title,amount)=>{
        try{
            const response=await fetch('http://localhost:4000/expenses',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({title,amount})
            })
            if(response.ok){
                const newItem=await response.json()
                setExpense((prev)=>[...prev,newItem])
            }
            else{
                console.error('failed to add expense')
            }
        }
        catch(error){
            console.log('Error adding expense.');
        }
    }
    // function deleteExpense(_id)
    // {
    //     setExpense(expense.filter((items)=>items._id!=_id))
    // }

    const deleteExpense=async(_id)=>{
    try{
      const response=await fetch(`http://localhost:4000/expenses/${_id}`,
        {
          method:'DELETE',
        })
        if(response.ok)
        {
          setExpense(expense.filter((exp)=>exp._id!==_id))
        }
        else
        {console.log('Failed to delete expense')}
    }
    catch(error){
        console.error('Error in deleting expense',error)
    }
}
     const editExpense = async(id,title,amount) => {
        try {
        const response = await fetch(`http://localhost:4000/expenses/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ title, amount }),
        });
        if (response.ok) {
            const updatedItem = await response.json();
            setExpense(expense.map((exp) => (exp._id === id ? updatedItem : exp)));
        } else {
            console.log("Failed to update expense");
        }
    } catch (error) {
        console.error('Failed to edit expense', error);
    }
}



    return(
        <>
        <div className="expense-container">
        <ParentContainer value={expense}/>
        <History value={expense} deleteExpense={deleteExpense} editExpense={editExpense} setItemToEdit={setItemToEdit}/>
        <ExpenseForm addExpense={addExpense} itemToEdit={itemToEdit} editExpense={editExpense} setItemToEdit={setItemToEdit}/>
        {/* <Link to="/"><button>Click to Home</button></Link> */}
        </div>
        </>
    )
}
export default ExpenseContainer;