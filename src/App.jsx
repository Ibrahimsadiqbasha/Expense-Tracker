import ExpenseContainer from "./Components/ExpenseContainer";
import {BrowserRouter , Routes ,Route} from 'react-router-dom';
import Home from "./Home";
import Post from "./Post";
function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ExpenseContainer/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App