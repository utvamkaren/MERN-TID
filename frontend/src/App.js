import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import Header from "./components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import TaskList from './components/TaskList';

function App(){
  return(
    <>
    <Router>
      <div className="container">
        <Header/>
    <Routes>
      <Route path='/' element={<Dashboard></Dashboard>}/>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/alltasks' element={<TaskList></TaskList>}></Route>
    </Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
  );
}
export default App;