import "./App.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import All from "./components/All";
import Person from "./components/Person";
import Group from "./components/Group";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";
import { refreshToken } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(refreshToken());
  // }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />}>
          <Route index element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<RootLayout />}>
            <Route index element={<All />} />
            <Route path="person" element={<Person />} />
            <Route path="Group" element={<Group />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
