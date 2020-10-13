import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Background from "../../../shared/UIElements/Background";
import Modal from "../../../shared/UIElements/Modal";
import "../../../styles/App.css";

const Auth = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [ isLoginMode, setIsLogInMode ] = useState(true);
    const [ showModal, setShowModal ] = useState({ show: false, message: null});
    const [ formName, setFormName ] = useState("");
    const [ formEmail, setFormEmail ] = useState("");
    const [ formPassword, setFormPassword ] = useState("");

    const openModal = (message) => {
        setShowModal({
            show: true,
            message
        });
    }

    const closeModal = () => {
        setShowModal({
            show: false,
            message: null
        });
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLoginMode) {
            if (formEmail.length >= 4 && formPassword.length >= 6) {
                try {
                    const responseData = await sendRequest(
                        "http://localhost:5000/api/users/login",
                        "POST",
                        JSON.stringify({
                            email: formEmail,
                            password: formPassword
                        }),
                        {
                            "Content-Type": "application/json"
                        }
                    );
                    auth.login(responseData.user.id);
                } catch (err) {}
            } else {
                openModal("Oj då, det gick inte att logga in med de uppgifter du angivit. Försök igen.");
            }
        } else {
            if (formName !== "" && formEmail.length >= 4 && formPassword.length >= 6) {
                try {
                    const responseData = await sendRequest(
                        "http://localhost:5000/api/users/login",
                        "POST",
                        JSON.stringify({
                            name: formName,
                            email: formEmail,
                            password: formPassword
                        }),
                        {
                            "Content-Type": "application/json"
                        }
                    );
                    auth.login(responseData.user.id);
                } catch (err) {}
            } else {
                openModal("Oj då, det gick inte att logga in med de uppgifter du angivit. Försök igen.");
            }
        }
    }

    const switchModeHandler = () => {
        setIsLogInMode(!isLoginMode);
    }

    const formNameHandler = (e) => {
        setFormName(e.target.value);
    }

    const formEmailHandler = (e) => {
        setFormEmail(e.target.value);
    }

    const formPasswordHandler = (e) => {
        setFormPassword(e.target.value);
    }

    return (
        <Background className="auth">
            <Modal 
                show={showModal.show}
                onCancel={closeModal}
                header="Det gick inte att logga in"
                footer={<button onClick={closeModal}>OK</button>}
                >
            <p>{showModal.message}</p>
            </Modal>
            <Modal 
                show={error}
                onCancel={clearError}
                header="Something went wrong"
                footer={<button onClick={clearError}>OK</button>}
                >
            <p>{error}</p>
            </Modal>
            <div>
                <form onSubmit={submitHandler}>
                   {!isLoginMode && 
                    <input  type="name" 
                            value={formName} 
                            placeholder="name" 
                            onChange={formNameHandler}/> }
                    <input  type="email" 
                            value={formEmail} 
                            placeholder="email" 
                            onChange={formEmailHandler}/>
                    <input  type="password" 
                            value={formPassword} 
                            placeholder="password" 
                            onChange={formPasswordHandler}/>
                    <button type="sumbmit">
                        {isLoginMode ? "Log in" : "Sign up"}
                    </button>
                </form>
                <button onClick={switchModeHandler}>
                    Switch to {isLoginMode ? "sign up" : "log in"}
                </button>
                {isLoading && <div><h2>Loading...</h2></div>}  
                {error && <div style={{backgroundColor: "white", padding: "0.5rem", marginTop: "1rem"}}>
                            <h2>{error}</h2>
                            <button onClick={clearError}>X</button>
                        </div>}
            </div>
        </Background>
    )
}

export default Auth;
