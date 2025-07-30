import React from 'react'
import CurrentItem from './CurrentItem'


function ParentContainer(props) {
    const{value}=props
    let expense=0;
    let income=0;
    value.forEach((item) => {
        let {amount}=item
        if(amount>0){
            income+=parseInt(amount)
        }
        else{
            expense+=parseInt(amount)
        }
    });

  return (
    <>
    <h1>Expense Tracker</h1>
    <div className='balance-container'>
        <CurrentItem title="Income" amount={income} type="income"/>
        <CurrentItem title="Expense" amount={expense} type="expense"/>
        <CurrentItem title="Balance" amount={income+expense} type="balance"/>
    </div>
    </>
  )
}

export default ParentContainer