// import React, { useEffect } from "react";
// import { Link, useLocation,useNavigate } from "react-router-dom";
// const Navbar = () => {
//   let navigate = useNavigate();
//   const handleLogout = ()=>{
//     localStorage.removeItem("token");
//     navigate("/login");
//   }
//   const location = useLocation();
//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="#">
//           iNotebook
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link
//                 className={`nav-link ${
//                   location.pathname === "/" ? "active" : ""
//                 }`}
//                 aria-current="page"
//                 to="/"
//               >
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 className={`nav-link ${
//                   location.pathname === "/about" ? "active" : ""
//                 }`}
//                 to="/about"
//               >
//                 About
//               </Link>
//             </li>
//           </ul>
//          {! localStorage.getItem("token") ? <form className="d-flex" role="search">
//             <Link
//               to="/login"
//               className="btn btn-info mx-2"
//               tabIndex="-1"
//               role="button"
//               aria-disabled="true"
//             >LogIn
//             </Link>
//             <Link
//               to="/signup"
//               className="btn btn-info mx-2"
//               tabIndex="-1"
//               role="button"
//               aria-disabled="true"
//             >SignUP
//             </Link>
//           </form> : <button className="btn btn-info" onClick={handleLogout}>Logout</button>}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container">
        <NavLink className="navbar-brand" to="/" style={{color:"black"}}>iNotebook</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
            <li className="nav-item"><NavLink className="nav-link" to="/" style={{color:"black"}}>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about" style={{color:"black"}}>About</NavLink></li>
          </ul>
          <div className="d-flex">
            {localStorage.getItem("token") ? (
              <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <NavLink className="btn btn-dark me-2" to="/login">Login</NavLink>
                <NavLink className="btn btn-dark" to="/signup">Sign up</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;