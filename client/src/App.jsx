import "./App.css";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import All from "./components/All";
import Person from "./components/Person";
import Group from "./components/Group";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route path="/home" element={<RootLayout />}>
        <Route index element={<All />} />
        <Route path="person" element={<Person />} />
        <Route path="Group" element={<Group />} />
      </Route>
    </Routes>
  );
}

export default App;
