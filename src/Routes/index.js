import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Outlet } from "react-router-dom";

import HomePage from "../Pages/HomePage";
import SignUp from "../Components/SignUpPage";
import OtpForm from "../Components/otpSubmit";
import Login from "../Components/LoginPage";
import ContactsPage from "../Components/ContactsPage";
import MessagePage from "../Components/MessagePage";
import AuthenticationPage from "../Pages/AuthenticationPage";
import AudioPlayer from "../Components/AudioPlayer";
import VideoUploader from "../Components/VideoUploader";
import FileUploader from "../Components/FileUploader/FileUploader";

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
      <Route index element={<AuthenticationPage />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="otpform" element={<OtpForm />} />
      <Route path="login" element={<Login />} />
      <Route path="contactspage" element={<ContactsPage />} />
      <Route path="messagePage" element={<MessagePage />} />
      <Route path="homepages" element={<HomePage />} />
      <Route path="audioplayer" element={<AudioPlayer />} />
      <Route path="videoUploader" element={<VideoUploader />} />

      <Route path="fileUploader" element={<FileUploader />} />
    </Route>
  )
);

const MyRoute = () => <RouterProvider router={router} />;
export default MyRoute;
