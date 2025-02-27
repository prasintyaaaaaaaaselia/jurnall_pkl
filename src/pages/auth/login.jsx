import React from 'react';
import Swal from 'sweetalert2';
const Login = () => {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData ={};
    for(let elm of event.target.elements){
      if(elm.type==='email' || elm.type === 'password'){
        fData[elm.name] = elm.value;
      }
    }
    console.log(fData);
    
    const response = await fetch("http://localhost:3000/api/login/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token !=null) {
        localStorage.setItem('token',data.token);
        event.target.reset();
        window.location.href = '/admin/dashboard'
      }else{
        event.target.reset();
        Swal.fire({
          icon: "warning",
          text: "User tidak ditemukan",
          timer: 1000
        })
      }
    })
    .catch(error => console.error('Error:', error));
  }
  return (
    <>
      <div className="login-box">
        <div className="login-logo">
          <a href="admin/dashboard"><b> JURNAL PKL </b></a>
         
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
          <img src="/images/download__2_-removebg-preview.png" className="brand-image img-circle " style={{ paddingLeft: '3px' }} /> 
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit} method="post">
              <div className="input-group mb-3">
                <input type="email" name='email' className="form-control" placeholder="Email" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password"name='password' className="form-control" placeholder="Password" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                      Remember Me
                    </label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
                {/* /.col */}
              </div>
            </form>
            {/* /.social-auth-links */}
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="register.html" className="text-center">Register a new membership</a>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>

    </>
  )
}

export default Login