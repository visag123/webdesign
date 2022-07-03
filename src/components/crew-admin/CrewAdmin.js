import React from "react";
import { Link } from "react-router-dom";
import "./Crew.css";

const CrewAdmin = () => {
  return (
    <>
      Crew_admin Home Page
      {/* <div className="crew">
        <form >
          <div className="new_create">
            <div className="new_acc">
              <div>
                <label htmlFor="firstname">Firstname</label>
                <input type="text" id="firstname" />
              </div>
              <div>
                <label htmlFor="lastname">Lastname</label>
                <input type="text" id="lastname" />
              </div>
            </div>
            <div className="new_acc">
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" />
              </div>
            </div>
            <div className="new_acc">
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
              </div>
              <div>
                <label htmlFor="confirmpass">Confirm Password</label>
                <input type="text" id="confirmpass" />
              </div>
            </div>
            <div className="new_submit">
              <button>
                Submit
              </button>
              
            </div>
            <p>
                Already have an account? <Link to='/'> Sing in</Link>
              </p>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default CrewAdmin;
