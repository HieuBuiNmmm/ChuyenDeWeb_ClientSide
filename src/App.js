// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar.js";
import { Footer } from "./components/Footer";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { FoodList } from "./components/FoodList";
import { DetailFood } from "./components/DetailFood";
import { ProfileUser } from "./pages/ProfileUser";
import { FormAdd } from "./components/FormAdd";
import { FormUpdate } from "./components/FormUpdate";
import { FormDelete } from "./components/FormDelete";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile" element={<ProfileUser />} />
        <Route path="/foods" element={<FoodList />} />
        <Route path="/foods/:id" element={<DetailFood />} />
        <Route path="/add-food" element={<FormAdd />} />
        <Route path="/update-food" element={<FormUpdate />} />
        <Route path="/update-food/:id" element={<FormUpdate />} /> {/* Route với ID */}
        <Route path="/delete-food" element={<FormDelete />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
