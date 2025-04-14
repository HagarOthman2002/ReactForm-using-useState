import backgroundImg from "../Public/background.png";
import Logo from "../Public/Logo.png";
import "./Login.css"
export default function Login(){
    return(
        <div className="container">
            <div className="Login">
            <div className="header">
                <img className="Logo" src={Logo} alt="" />
                <h3>Login</h3>
            </div>
            <form  className="login-form">
                <label htmlFor="Email">Email Address</label>
                <input type="email" id="Email" placeholder="Enter Your Email Address"/>

                <label htmlFor="password">Password </label>
                <input type="password" id="password" placeholder="Enter Your Password"/>
                

                <button className="login-btn ">Login</button>
                <p className="signup-text">Don’t Have an account? <a href="">Signup</a></p>



            </form>

            </div>

            <img src={backgroundImg} alt="" />
            


        </div>
    )
}