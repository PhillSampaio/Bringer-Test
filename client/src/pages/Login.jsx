import { useRef, useState } from 'react'
import '../App.css'
import logo from '../bps_logo_gray.png'
import { Link } from 'react-router-dom'


export function Login() {

    const emailRef      = useRef()
    const passwordRef   = useRef()
    const [token, setToken] = useState("")
    
    function onSubmit(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email" : emailRef.current.value,
                "password" : passwordRef.current.value
            })
        };
        fetch('http://localhost:5000/Generate_Token', requestOptions)
        .then(response => response.json())
        .then(data => {
            setToken(data.accessToken)
        });    
    }
    function clearToken() {
        setToken("")
    }

    return (
        <>
            <div className="login-block">
                <div className="login-logo">
                    <img src={logo} />
                </div>
                {token ? (
                    <div className="token-form">
                        <label>Access Token:</label>
                        <textarea defaultValue={token} />
                        <br />
                        <Link to="/Tracking">Tracking</Link>
                        <button onClick={clearToken}>Clear</button>
                    </div>
                ) : (
                    <form onSubmit={onSubmit}  className="login-form">
                        <div className="login-input">
                            <input type="email" placeholder="Email" id='email' ref={emailRef} />
                        </div>
                        <div className="login-input">
                            <input type="password" placeholder="Password" id='pass' ref={passwordRef} />
                        </div>
                        <div className="login-btn">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                )}
                
            </div>
        </>        
    )   
}