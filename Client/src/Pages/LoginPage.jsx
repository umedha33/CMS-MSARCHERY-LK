import React, { useState } from 'react'
import './CSS/LoginPage.css'
import topograph from '../Components/Assets/topograph.png'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showHide, setShowHide] = useState(false);

    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowHide(!showHide);
    };

    const consFunc = () => {
        console.log(email, password);
    }

    return (
        <div>
            <div className="login-background">
                <img className="topograph" src={topograph} alt='back-topograph' />
                <div className="container">
                    <div className="left-pane">
                        <h1 id='keep-trad'>KEEPING TRADITIONS ALIVE</h1>
                        <div className='parag'>
                            <p>Sign in with user credentials provided by the admin.</p>
                            <p>Didn't get your credentials yet? Contact admin on </p>
                            <p id='p-email'>admin@msarcherylk.com</p>
                        </div>
                    </div>
                    <div className="right-pane">
                        <div className="centered-pain-right">
                            <h1 id='left-head'>MSARCHERY LK CMS</h1>
                            <h2 id='center-subhead'>LOGIN</h2>
                            <input type="email"
                                id="email"
                                placeholder='Email Address'
                                onChange={(e) => setEmail(e.target.value)}
                                required /><br />
                            <input className='pass' type={showHide ? 'text' : 'password'}
                                id="password"
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <button id='pssShowbtn' onClick={togglePasswordVisibility}>
                                {showHide ? 'Hide' : 'Show'}
                            </button>
                            <p id='forg-pass'>Forgot Password?</p>
                            <button id='btn-login' onClick={() => consFunc()}>SIGN IN</button>
                            {/* <button id='btn-login' onClick={() => navigate("/admin")}>SIGN IN</button> */}
                        </div>
                        <div class="bottom-left-pane">
                            <div class="double-row">
                                <p id='terms'>Terms of Use</p>
                                <p id='p-policy'>Privacy Policy</p>
                            </div>
                            <div class="single-row">
                                <p>powered by ©msarcherylk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
