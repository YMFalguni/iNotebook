// // import React, { useState } from 'react'
// // import { useNavigate, Link } from 'react-router-dom';
// // const Login = (props) => {
 
// //     const [credentials, setCredentials] = useState({ email: "", password: "" });
// //    // for redirecting we will use "useHistory" hook 
// //    let navigate = useNavigate();
// //     const handleSubmit = async (e) =>{
// //         e.preventDefault();
// //         try {
// //             const response = await fetch("http://localhost:5000/api/auth/login", {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify({ email: credentials.email, password: credentials.password })
// //             });
// //             const json = await response.json();
// //             console.log(json);
// //             if (json.success) {
// //                 // save the auth token and redirect
// //                 localStorage.setItem('token', json.authToken);
// //                props.showAlert("Logged in successfully", "success");
// //                  navigate("/");
// //             } else {
// //                 props.showAlert("Invalid credentials", "danger");
// //             }

// //         } catch (error) {
// //             console.error("Login error:", error);
// //         }
// //     }
// //     const onChange = (e) => {
// //     setCredentials({ ...credentials, [e.target.name]: e.target.value });
// //   };
// //   return (
// //     <div className='mt-3'>
// //       <h2 className='mb-3'>Login to Continue with iNotebook</h2>
// //       <form onSubmit={handleSubmit}>
// //   <div className="mb-3">
// //     <label htmlFor="email" className="form-label">Email address</label>
// //     <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name= "email"value={credentials.email} onChange={onChange}/>
// //     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
// //   </div>
// //   <div className="mb-3">
// //     <label htmlFor="password" className="form-label">Password</label>
// //     <input type="password" className="form-control" id="password" name="password"value={credentials.password} onChange={onChange}/>
// //   </div>
  
// //   <button type="submit" className="btn btn-info">Login
// //   </button>
// // </form>
// // <p className='mt-3'>Don't have an account? <Link to="/signup">Sign up</Link></p>
// //     </div>
// //   )
// // }

// // export default Login


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                props.showAlert("Logged in successfully", "success");
                navigate("/");
            } else {
                props.showAlert("Invalid credentials", "danger");
            }
        } catch (error) {
            console.error("Login error:", error);
            props.showAlert("Something went wrong", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card shadow-lg mt-5'>
                        <div className='card-header text-center'>
                            <h2 className='mb-0'>
                                <i className="fas fa-sign-in-alt"></i> Login
                            </h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        name="email" 
                                        value={credentials.email} 
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
                                        value={credentials.password} 
                                        onChange={onChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-info w-100">
                                    <i className="fas fa-lock"></i> Login
                                </button>
                            </form>
                        </div>
                        <div className='card-footer text-center'>
                            <p className='mb-0'>Don't have an account? <Link to="/signup" className="fw-bold" style={{textDecoration: "none", color:"#10b5d6ff"}}>Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

