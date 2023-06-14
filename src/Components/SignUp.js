import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {GiCancel } from 'react-icons/gi';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db, firestore} from '../FirebaseConfig/firebaseconfigs';
import { collection,addDoc,doc } from "firebase/firestore"; 
import LoginModal from "./LoginModal";
export default function SignUp(){
    const myCollection = collection(firestore,"users")
    const[showLoginModal , setLoginModal] = useState(false);
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[phone,setphone]=useState("");
    const[address,setaddress]=useState("");
    const navigate = useNavigate();
    const[successText, setSuccessText]=useState("");
    const[errorText, setErrorText]=useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
         .then((userCredential)=>{
            const user = userCredential.user;

            console.log(user);
           
            addDoc(myCollection,{
                name:name, 
                email:email , 
                password:password , 
                phone:phone , 
                address:address, 
                uid:user.uid
            }).then(()=>{
                setSuccessText("New user added successfully");
                setname('');
                setemail('');
                setpassword('');
                setphone('');
                setaddress('');
                setTimeout(()=>{
                    setSuccessText('');
                    navigate('/');
                },3000)
            
         }).catch((error)=>{
                setErrorText(error.message);
            })
            
         })
    //      .catch((error)=>{
    //             setErrorText(error.message);
    //     })
    // }
        }
    return(
        <>
        {/* <div className="modal-wrapper" onClick={closeModal}></div> */}
        <div className="signup-container" >
            <div className="signup-header">
               {/* <GiCancel onClick={closeModal} className="cross"/> */}
               <h2 className="loginhead">CREATE ACCOUNT</h2>
            </div>
            {successText && <div className="success-msg">{successText}</div>}
            {errorText && <div className="error-msg">{errorText}</div>}
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <div className="namenemail">
                  <div className="username">
                  <label htmlFor="uname">Your Name</label>
                  <input  id="uname" type="text" onChange={(event)=>{setname(event.target.value)}} placeholder="Enter your name...."/>
                  </div>
                  <div className="useremail">
                  <label htmlFor="email">Email</label>
                  <input  id="email" type="text" onChange={(event)=>{setemail(event.target.value)}} placeholder="Enter your email...."/>
                  </div>
                </div>
                <div className="passnphone">
                  <div className="userpass">
                  <label htmlFor="password">Password</label>
                  <input  id="password" type="password" onChange={(event)=>{setpassword(event.target.value)}} placeholder="Enter your password...."/>
                  </div>
                  <div className="userphone">
                  <label htmlFor="phone">Phone Number</label>
                  <input  id="phone" type="text" onChange={(event)=>{setphone(event.target.value)}} placeholder="Enter your name...."/>
                  </div>
                </div>
                <div className="useradddress">
                <label htmlFor="address">Address</label>
                <textarea id="address" placeholder="Enter your address...." onChange={(event)=>{setaddress(event.target.value)}}/>
                </div>
                <button className="sign-in" type="submit">Sign Up</button>
                <div>
                    <span>Already have an account?</span>
                 
                    <button onClick={()=>{setLoginModal(true)}}>Sign In</button>
                    {showLoginModal && <LoginModal/>}
                </div>
            </form>
        </div>
        </>
    )
}