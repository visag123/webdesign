import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Resetpassword from "./components/Resetpassword";
import Signup from "./components/Signup";
import SysAdminpage from "./components/systemAdmin/SysAdminpage";
import { UserAuthContextProvider } from "./context/UserAuthcontext";
import { useState } from "react";
import Editpage from "./components/systemAdmin/Editpage";
import Sidebar from "./components/Sidebar";
import TransportAdmin from "./components/transport-admin/TransportAdmin";
import CrewAdmin from "./components/crew-admin/CrewAdmin";

function App() {
  const [userId,setUserid]=useState('');
  const getUserIdhandler=(id)=>{
    console.log('the userid ',id);
    setUserid(id);
    console.log(userId)

  }

  return (
    <div className="App">
      <UserAuthContextProvider>
        
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/sidebar" element={<Sidebar />}></Route>
            <Route path="/reset" element={<Resetpassword />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/edit" element={<Editpage id={userId} setUserid={setUserid} />}></Route>
            <Route path="/admin" element={<SysAdminpage getuserid={getUserIdhandler}/>}></Route>
            <Route path="/crew" element={<CrewAdmin />}></Route>
            <Route path="/trans" element={<TransportAdmin />}></Route>

          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
