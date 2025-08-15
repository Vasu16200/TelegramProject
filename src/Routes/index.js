import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Outlet } from "react-router-dom";

import HomePage from '../Pages/HomePage/HomePage';
import SignUp from "../Components/SignUpPage/SignUp";
import OtpForm from "../Components/otpSubmit/otpForm";
import Login from "../Components/LoginPage/Login";
import ContactsPage from "../Components/ContactsPage/ContactsPage";
import ListOfContactsPage from "../Components/ListOfContactsPage";
import AuthenticationPage from "../Pages/AuthenticationPage/AuthenticationPage"

function RootLayout() {
  return (
    <div>
      <Outlet /> {/* This is important for nested routes */}
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<div>errorpage</div>}
    >
      <Route index element={<AuthenticationPage/>} />
      <Route path="signup" element={<SignUp />} />
      <Route path="otpform" element={<OtpForm />} />
      <Route path="login" element={<Login />} />
      <Route
        path="contactspage"
        element={
          <ContactsPage/>
        }
      />
      <Route path="listofcontacts" element={<ListOfContactsPage />} />
      <Route path="homepages" element={<HomePage />} />
    </Route>
  )
);

const MyRoute = () => <RouterProvider router={router} />;
export default MyRoute;
