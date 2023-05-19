import React, { useRef, useState, Fragment, useEffect } from 'react'
import { reqLogin, reqSignup, clearErrors } from '../utils/api'
import './LoginSignUp.css'
import { useLocation } from 'react-router-dom'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
// import { clearErrors, login, register } from "../../actions/userAction"
import { useAlert } from 'react-alert'
import PasswordField from 'material-ui-password-field'


function LoginSignUp() {
    const alert = useAlert()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // const alert = useAlert();
    const { error, isAuthenticated } = useSelector(
        (state) => state.User
    );
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')


    const loginSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: loginEmail,
            password: loginPassword
        }
        dispatch(reqLogin(userData))

    };

    const registerSubmit = (e) => {
        e.preventDefault();
        if (password !== checkPassword) return alert.error("Password Does Not Match")
        const myForm = new FormData();
        myForm.set("email", email);
        myForm.set("password", password);

        console.log(myForm)
        dispatch(reqSignup(myForm))


    };





    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/home')
        }


    }, [dispatch, error, alert, isAuthenticated, navigate]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>

            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            {/* <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    /> */}

                            <PasswordField
                                className="passwordField"
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}

                            />
                        </div>

                        <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >

                        <div className="signUpEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <PasswordField
                                className="passwordField"
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />

                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <PasswordField
                                className="passwordField"
                                type="password"
                                placeholder="Re-Type Password"
                                required
                                value={checkPassword}
                                onChange={(e) => setCheckPassword(e.target.value)}

                            />

                        </div>


                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>

        </Fragment>
    );
}

export default LoginSignUp