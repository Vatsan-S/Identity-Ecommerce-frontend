import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Resetpassword from "../Pages/Resetpassword";
import Forgotpassword from "../Pages/Forgotpassword";
import Activation from "../Pages/Activation";
import PrivateRoute from "../Components/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import Createproduct from "../Pages/Createproduct";
import Createseller from "../Pages/Createseller";
import Productpage from "../Pages/Productpage";
import PrivateUserRoute from "../Components/PrivateUserRoute";
import Cart from "../Pages/Cart";
import Bill from "../Pages/Bill";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/reset_password/:email/:id"
            element={<Resetpassword />}
          />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/activate_account/:id/:email" element={<Activation />} />
          <Route path="/product_details/:id" element={<Productpage />} />


          <Route element={<PrivateUserRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/bill" element={<Bill/>}/>
          </Route>

          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create_product" element={<Createproduct />} />
            <Route path="/create_seller" element={<Createseller />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
