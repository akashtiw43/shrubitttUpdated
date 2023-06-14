import { useEffect,useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../FirebaseConfig/firebaseconfigs';
import {GiCancel } from 'react-icons/gi';
import Home from '../Components/Home'
import SignUp from "./SignUp";
import "../index.css"
const LoginModal=({closeModal})=>{
    const[showSignUpModal , setSignUpModal] = useState(false);
   
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[successText, setSuccessText]=useState("");
    const[errorText, setErrorText]=useState("");

   
    const navigate = useNavigate();
    useEffect(()=>{
        document.body.style.overflowY = "hidden"
        return()=>{
            document.body.style.overflowY="scroll"
        };
    },[]);

    const handleLogin=(event)=>{
        event.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            setSuccessText("Loggged in successfully!!");
            setemail("");
            setpassword("");
            setErrorText("");
            setTimeout(()=>{
                setSuccessText("");
                setSignUpModal(false);
                navigate('/home');
            },1000)
        })
        .catch((error)=>{
            const errorCode = error.code;
            
            if(error.message == "Firebase: Error (auth/invalid-email)."){
                setErrorText('Please fill all the required fields.');
            }
            if(error.message == "Firebase: Error (auth/user-not-found)."){
                setErrorText('Email not found.');
            }
            if(error.message == "Firebase: Error (auth/wrong-password)."){
                setErrorText('Wrong Password');
            }
        })
    }
    return (
        <>
            {/* <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
            <h2 onClick={closeModal}>login</h2>
            </div> */}
            <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
              <div className="modal-header">
               <GiCancel onClick={closeModal} className="cross"/>
               <h2 className="loginhead">LOGIN</h2>
              </div>
              {successText && <div className="success-msg">{successText}</div>}
              {errorText && <div className="error-msg">{errorText}</div>}
             <form className="sign-in-form" onSubmit={handleLogin}>
                
                <label htmlFor="email">Email</label>
                <input  id="email" type="text" onChange={(event)=>{setemail(event.target.value)}} placeholder="Enter your email...."/>
                <label htmlFor="password">Password</label>
                <input  id="password" type="password" onChange={(event)=>{setpassword(event.target.value)}} placeholder="Enter your password...."/>
              
                <button className="sign-in" type="submit">Sign In</button>
                <div>
                    <span>Dont't have an account?</span>
                    <Link to="/signup">SignUp</Link>
                    {/* <button onClick={()=>{setSignUpModal(true)}}>Sign Up</button>
                    {showSignUpModal && <SignUp closeModal={closeModal}/>} */}
                </div>
            </form>
        </div>
        </>
    )
}
export default LoginModal;