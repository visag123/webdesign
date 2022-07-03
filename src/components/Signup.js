import React, { useState,useRef, useCallback } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import UserDataService from "../firebase/userservice";
import { useNavigate } from "react-router-dom";
import logo from "../images/landscape-view.jpg"
import Inputbox from "./Inputbox";



const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [usererrors,setuserErrors] = useState(false);
  const [emailerrors,setemailErrors] = useState(false);
  const [existUser,setExistuser] = useState(false)
  const navigate = useNavigate();

  const userrep = useRef('');
  const emailrep = useRef()
  
  
  const usernameChange =async (e)=>{
    setUsername(e.target.value)
    const userref = userrep.current.value
    const data =await  UserDataService.getAllUsers();
     data.docs.forEach((doc) => {
    const newdata = doc.data();
    if (newdata.username === userref){
      //  console.log('username is already exist');
       setuserErrors(true)
       setTimeout(()=>{
        setuserErrors( false);
  
        },3000)
    }
     })
}

  const emailChange = async (e)=>{
    setEmail(e.target.value)
    const emailref=emailrep.current.value
    const data =await  UserDataService.getAllUsers();
     data.docs.forEach((doc) => {
    const newdata = doc.data();
    if (newdata.email === emailref){
      if(newdata.password === ""){
        setExistuser(true)
        console.log('User Account already created ')
      }else{
        setemailErrors(true)
        setTimeout(()=>{
         setemailErrors( false);
   
         },3000)
      }
    }
     })
}
  const formsubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (firstname === "" || username === "" ) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      setTimeout(()=>{
        setMessage({ error: false, msg: "" });
  
        },3000)
      return;
    }
    const newUser = {
      userId: Date.now(),
      firstname,
      lastname,
      username,
      email,
      password,
      status:"NA",
      role:"NA"
    };
    console.log(newUser);
    try {
      await UserDataService.addUsers(newUser);
      setMessage({ error: false, msg: "New USER added successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
      setTimeout(()=>{
        setMessage({ error: false, msg: "" });
  
        },2000)
    }
    navigate("/");
    setFirstname("");
    setLastname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("")
  };
  return (
    <div className="sign">
      <div className="signup_header">
        {message.error ? <p>{message.msg}</p> : ""}
      </div>
      <div className="signup_home">
        <img src={logo} alt="image" />
      </div>
      <div className="signup">
        <form className="row g-3" onSubmit={formsubmit}>
          <div className="col-md-6">
            {/* <label htmlFor="firstname" className="form-label">
              First name
            </label> */}
            <Inputbox
              type="text"
              className="form-control"
              id="firstname"
              label='First name'
              autoComplete="off"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            {/* <label htmlFor="inputLname" className="form-label">
              Last name
            </label> */}
            <Inputbox
              type="text"
              className="form-control"
              id="inputLname"
              autoComplete="off"
              label='Last name'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              ref={userrep}
              autoComplete="off"
              value={username}
            
              onChange={usernameChange}
            />
            <small>{usererrors ? "Username already exist" : ""}</small>
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              autoComplete="off"
              ref={emailrep}
              value={email}
              onChange={emailChange}
            />
            <small>{emailerrors ? "Email already exist" : ""}</small>
          </div>
          <div className="col-12">
            {/* <label htmlFor="Password" className="form-label">
              Password
            </label> */}
            <Inputbox
              type="password"
              className="form-control"
              id="Password"
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            {/* <label htmlFor="cPassword" className="form-label">
              Conform Password
            </label> */}
            <Inputbox
              type="password"
              className="form-control"
              id="cPassword"
              label='Confirm Password'
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Create an account
            </button>
          </div>
          <p>
            Already have an account?<Link to="/">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
