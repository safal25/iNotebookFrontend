import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import NoteState from "./context/NoteState";
import Signup from "./components/Signup";


function App() {

  /*const [userName,setUserName]=useState("");
  const updateName=(name)=>{
    setUserName(name);
  }*/

  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About/> } />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
