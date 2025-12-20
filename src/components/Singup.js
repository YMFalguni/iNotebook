// import React, { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom';

// const Singup = (props) => {
  
//       const [credentials, setCredentials] = useState({ name: "",
//          email: "",
//          password: "",
//          cpassword: ""});

//      // for redirecting we will use "useHistory" hook 
//      let navigate = useNavigate();
//       const handleSubmit = async (e) =>{
//           e.preventDefault();
//           //check if password and confirm password are same
//           if (credentials.password !== credentials.cpassword){
//             props.showAlert ("Password and Confirm Password do not match", "danger");
//             return;
//           }
//         const {name, email, password} = credentials;
//           try {
//               const response = await fetch("http://localhost:5000/api/auth/createuser", {
              
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json'
//                   },
//                   body: JSON.stringify({name, email, password})
//               });
//               const json = await response.json();
//               console.log(json);
//               if (json.success) {
//                   // save the auth token and redirect
//                   localStorage.setItem('token', json.authToken);
//                   props.showAlert("Signup in successfully", "success");
//                    navigate("/login");
//               } else {
//                   props.showAlert("Signup failed", "danger");
//               }
//           } catch (error) {
//               console.error("Signup error:", error);
//           }
//       }
//       const onChange = (e) => {
//       setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };
//   return (
//      <div className='container mt-3 '>
//       <h2 className='mb-3'>Welcome to iNotebook! Create Your Account</h2>
//       <form onSubmit={handleSubmit}>
//   <div className="mb-3">
//      <div className="mb-3">
//     <label htmlFor="name" className="form-label">Name </label>
//     <input type="text" name = "name" className="form-control" id="name" aria-describedby="nameHelp"onChange = {onChange}/>
//   </div>
//     <label htmlFor="email" className="form-label">Email address</label>
//     <input type="email" name = "email" className="form-control" id="email" aria-describedby="emailHelp"onChange = {onChange}/>
//     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="password" className="form-label">Password</label>
//     <input type="password" name = "password" className="form-control" id="password"onChange = {onChange} required minLength={5}/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//     <input type="password" name = "cpassword" className="form-control" id="cpassword"onChange = {onChange} required minLength={5}/>
//   </div>
//   <button type="submit" className="btn btn-info">Signup</button>
// </form>

// <p className='mt-3'>Already have an account? <Link to="/login">Login</Link></p>
//     </div>
//   )
// }

// export default Singup

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_ENDPOINTS from '../config/apiConfig';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }

        const { name, email, password } = credentials;
        try {
            const response = await fetch(API_ENDPOINTS.SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                navigate("/");
                props.showAlert("Account Created Successfully", "success");
            } else {
                props.showAlert("Invalid Credentials", "danger");
            }
        } catch (error) {
            console.error("Signup error:", error);
            props.showAlert("Something went wrong", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mb-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card shadow-lg mt-1'>
                        <div className='card-header text-center'>
                            <h2 className='mb-0'>
                                <i className="fas fa-user-plus"></i> Create Account
                            </h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        name="name" 
                                        onChange={onChange} 
                                        placeholder="Enter your name"
                                        required 
                                        minLength={3} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        name="email" 
                                        onChange={onChange} 
                                        placeholder="Enter your email"
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        name="password" 
                                        onChange={onChange} 
                                        placeholder="Enter password (min 5 chars)"
                                        required 
                                        minLength={5} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="cpassword" 
                                        name="cpassword" 
                                        onChange={onChange} 
                                        placeholder="Confirm your password"
                                        required 
                                        minLength={5} 
                                    />
                                </div>
                                <button type="submit" className="btn btn-info w-100">
                                    <i className="fas fa-check"></i> Sign Up
                                </button>
                            </form>
                        </div>
                        <div className='card-footer text-center'>
                            <p className='mb-0'>Already have an account? <Link to="/login" style={{color:"#10b5d6ff ", textDecoration:"none"}} className="fw-bold">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;