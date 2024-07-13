import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Front-End/pages/Home/Home';
import Navbar from './Front-End/components/Navbar/Navbar';
import About from './Front-End/pages/About/About';
import Footer from './Front-End/components/Footer/Footer';
import FoodMenu from './Front-End/pages/Food-Menu/FoodMenu';
import AdminSign from './Front-End/pages/AdminSign/AdminSign';
import AdminSignup from './Front-End/pages/AdminSignup/AdminSignup';
import CusSign from './Front-End/pages/CusSign/CusSign';
import CusSignup from './Front-End/pages/CusSignup/CusSignup';
import SuppSigin from './Front-End/pages/SuppSigin/SuppSigin';
import SupSignup from './Front-End/pages/SupSignup/SupSignup';
import AdminDadhboard from './Front-End/pages/AdminDadhboard/AdminDadhboard';
import AddEdit from './Front-End/pages/AddEdit/AddEdit';
import ViewCus from './Front-End/pages/ViewCus/ViewCus';
import ProdcutDashboard from './Front-End/pages/ProdcutDashboard/ProdcutDashboard';
import AddeditUsers from './Front-End/pages/AddeditUsers/AddeditUsers';
import Cart from './Front-End/pages/Cart/Cart';
import Orders from './Front-End/pages/Orders/Orders';
import Payment from './Front-End/pages/Payment/Payment';
import PaymentSuccess from './Front-End/pages/PaymentSuccess/PaymentSuccess';
import ReviewPage from './Front-End/pages/ReviewPage/ReviewPage';
import AddReview from './Front-End/pages/AddReview/AddReview';
import ViewOrders from './Front-End/pages/ViewOrders/ViewOrders';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer position="top-center" style={{marginTop: "70px"}}/>
        <Navbar/>
        <main>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/menu' element={<FoodMenu/>}/>
          <Route path='/adminsignin' element={<AdminSign/>}/>
          <Route path='/adminsignup' element={<AdminSignup/>}/>
          <Route path='/cussignin' element={<CusSign/>}/>
          <Route path='/cussignup' element={<CusSignup/>}/>
          <Route path='/suppsignin' element={<SuppSigin/>}/>
          <Route path='/suppsignup' element={<SupSignup/>}/>

          <Route path='/productdash' element={<ProdcutDashboard/>}/>
          <Route path='/addedit' element={<AddEdit/>}/>
          <Route path='/addupdate/:id' element={<AddEdit/>}/>
          <Route path='/viewcus/:id' element={<ViewCus/>}/>

          <Route path='/admindashboard' element={<AdminDadhboard/>}/>
          <Route path='/addeditUsers' element={<AddeditUsers/>}/>
          <Route path='/addeditUsers/:id' element={<AddeditUsers/>}/>

          <Route path='/cartitems' element={<Cart/>}/>
          <Route path="/orders/:pid" element={<Orders/>}/>
          <Route path="/vieworders" element={<ViewOrders/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/payment/success" element={<PaymentSuccess/>}/>

          <Route path="/review" element={<ReviewPage/>}/>
          <Route path="/addreview" element={<AddReview/>}/>

          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
