import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import UserDataService from "../../firebase/userservice";
import Inputbox from '../Inputbox';
import Sidebar from '../Sidebar';

import "./Edit.css"
import Navbar from './Navbar';


const Editpage = ({id,setUserid}) => {
    const [userId,setUserId] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');
    const [status,setStatus] = useState('');
    const [lifespan,setLifeSpan] = useState('');
     const navigate = useNavigate();

    
    const editHandler = async () => {
      
        try {
          const docSnap = await UserDataService.getUser(id);
          console.log("the record is :", docSnap.data());
          setUserId(docSnap.data().userId);
          setUsername(docSnap.data().username);
          setEmail(docSnap.data().email);
          setRole(docSnap.data().role);
          setStatus(docSnap.data().status);
        } catch (err) {
            console.log(err);
        }
      };
      useEffect(() => {
        if (id !== undefined && id !== "") {
          editHandler();
        }
      }, [id]);
       
      const submitHandler = async(e) =>{
        e.preventDefault();
        const newuser = {
            userId,
            username,
            email,
            status,
            role,
            lifespan,
            time:new Date().toLocaleString()

          };

        try {
            if (id !== undefined && id !== "") {
              await UserDataService.updateUser(id, newuser);
              setUserid("");
              navigate('/admin')
          }
          else{
            await UserDataService.addUsers(newuser);
            navigate('/admin')
          }
        }catch(err){
            console.log(err)
        }
      }
      const clearUser =()=>{
        setUserid("")
        navigate('/admin')
      }
    
  return (
    <div>
      <Navbar />
      <div className="editpage_content">
        <div>
          <Sidebar />
        </div>
        <div className="editpage_maincontent">
          <div className="editpage_search">
            <form>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input type="text" placeholder="search" />
            </form>
          </div>
          <div className="editpage_edit">
            <div className="edit">
              <form className="row g-3" onSubmit={submitHandler}>
                <div className="row g-3">
                  <div className="col">
                    {/* <label htmlFor="userid">UserID</label> */}
                    <Inputbox
                      type="text"
                      id="userid"
                      className="form-control"
                      label='UserID'
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value);
                      }}
                      disabled
                    />
                  </div>
                  <div className="col">
                    {/* <label htmlFor="username">Username</label> */}
                    <Inputbox
                      type="text"
                      id="username"
                      className="form-control"
                      label='Username'
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      disabled
                    />
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col">
                    {/* <label htmlFor="email">E-mail</label> */}
                    <Inputbox
                      type="text"
                      id="email"
                      className="form-control"
                      label='E-mail'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="role">Role</label>
                    <select
                      className="form-select"
                      id="role"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Select Role">Select Role</option>
                      <option value="Crew Admin">Crew Admin</option>
                      <option value="Transport Admin">Transport Admin</option>
                    </select>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col">
                    <label htmlFor="status">Status</label>
                    <select
                      className="form-select"
                      id="status"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Select status">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col">
                    {/* <label htmlFor="life">User Access Lifespan</label> */}
                    <Inputbox
                      type="date"
                      id="life"
                      label='User Access Lifespan'
                      className="form-control"
                      value={lifespan}
                      onChange={(e) => {
                        setLifeSpan(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col">
                    {" "}
                    <button
                      type="reset"
                      className="btn btn-primary"
                      onClick={() => clearUser()}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col">
                    <button type="submit" className="btn btn-primary">
                      {id === "" ? "Add user" : "Save Edits"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editpage