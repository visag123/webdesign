import React, { useRef } from "react";
import "./Sys.css"
import UserDataService from "../../firebase/userservice";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthcontext";
import { Link, } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "../Sidebar";

const SysAdminpage = ({getuserid}) => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loadResult, setloadResult] = useState([]);
  const searchinput= useRef();
  const { signUp } = useUserAuth();
  const [message, setMessage] = useState({ error: false, msg: "" });
  // const [loaduser,setLoaduser] =useState([])


  useEffect(() => {
      getUsers();
      
  }, []);

  const getUsers = async () => {
    const data = await UserDataService.getAllUsers();
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

   };
    
   setTimeout(()=>{
    setloadResult(searchUsers.length<1? users:searchResult)
  })

  const searchHandler =(e)=>{
         const searchrf= searchinput.current.value
         searchUsersHandler(searchrf)
  }
  const searchUsersHandler =(searchUsers)=>{
         setSearchUsers(searchUsers);
         if (searchUsers !=='') {
          const newUserlist = users.filter((user)=>{
           return Object.values(user).join("").toLowerCase().includes(searchUsers.toLowerCase())

          })
           setSearchResult(newUserlist)
    
        } else {
          setSearchResult(users)
          console.log(searchResult) 
         }

  } 
  const acceptuser = async (userId,username, email, password,status,role) => {
    const user = {
      userId,
      username,
      email,
      password,
      status,
      role
    };
   
    try {
      if (status ==='Active'){
        await signUp(email, password);
        await UserDataService.addUser(user);
        setMessage({ error: true, msg: "Successfully Uptaded" });
        setTimeout(()=>{
          setMessage({ error: false, msg: "" });
 
          },4000)
        
      }else{
         setMessage({ error: true, msg: "User Status was Inactive" });
         setTimeout(()=>{
         setMessage({ error: false, msg: "" });

         },3000)

      }
     } catch (err) {
       console.log(err);
       setMessage({ error: true, msg: err.message });
       setTimeout(() => {
         setMessage({ error: false, msg: "" });
       }, 3000);
     }
  };
  const rejectuser = async (id) => {
    await UserDataService.deleteUsers(id);
    getUsers();
  };
  return (
    <div className="systemadmin">
      <Navbar />
      <div className="content">
        <div className="sidecontent">
          <Sidebar />
        </div>
        <div className="maincontent">
          <div className="head_navbar">
            <div className="header_search">
              <form>
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <input type="text" placeholder="search"ref={searchinput} value={searchUsers} onChange={searchHandler}/>
              </form>
            </div>
            <div className="err_catch">
              <small>{message.error ? <p>{message.msg}</p> : ""}</small>
            </div>
            <div className="edit_content">
              <div className="set_role">
                <i className="fa-solid fa-user"></i>

                <p>Set Role</p>
              </div>
              <div className="edit_role">
                <Link to="/edit">
                  <i className="fa-solid fa-user-plus"></i>
                  <p>Add User</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="sys-table">
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Last Edited</th>
                  <th>Save/Delete</th>
                </tr>
              </thead>
              <tbody>
                {loadResult.map((doc) => {
                  return (
                    <tr key={doc.id}>
                      <td onClick={() => getuserid(doc.id)}>
                        <Link to="/edit">
                          {doc.userId === "" ? "NA" : doc.userId}
                        </Link>
                      </td>

                      <td onClick={() => getuserid(doc.id)}>
                        <Link to="/edit">
                          {doc.username === "" ? "NA" : doc.username}
                        </Link>
                      </td>
                      <td>{doc.email}</td>
                      <td>{doc.status}</td>
                      <td>{doc.role}</td>
                      <td>{doc.time}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            acceptuser(
                              doc.userId,
                              doc.username,
                              doc.email,
                              doc.password,
                              doc.status,
                              doc.role
                            );
                          }}
                        >
                          <i className="fa-solid fa-circle-check"></i>
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={(e) => rejectuser(doc.id)}>
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SysAdminpage;
