
import './App.css';
import About from './components/About/About';
import UserCountde from './components/UserAccountdetails/UserCountde';
import CreditCard from './components/credit_card/CreditCard';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar'
import Service from './components/service/Service';
import Transction from './components/transction/Transction';
import Users from './components/users/Users';
import { Route,Routes } from 'react-router-dom';
import Home from './page/Home';
import SignUp from './page/signup/SignUp';
import Login from './page/login/Login';
import ForgetPassword from './page/forgetpassword/ForgetPassword';
import Edit from './page/eidtaccount/Edit';
import CreateTransction from './page/transction/CreateTransction';
import NewCreditCard from './page/creditcard/NewCreditCard';

function App() {
  
  return (
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/transction' element={<Transction/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/creditcard' element={<CreditCard/>}/>
      <Route path='/account/:id' element={<UserCountde/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/'  element={<Login/>}/>
      <Route path='/forget' element={<ForgetPassword/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/createtransaction' element={<CreateTransction/>}/>
      <Route path='/newcreditcard' element={<NewCreditCard/>}/>
      
    </Routes>
  );
}

export default App;
