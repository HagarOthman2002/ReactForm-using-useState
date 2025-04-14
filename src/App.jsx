
import SignUp from "./assets/Components/SignUp"
import Login from "./assets/Components/Login"
import { useState } from "react";


function App() {
  

  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <Login onSwitchToSignUp={() => setShowLogin(false)} />
      ) : (
        <SignUp onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </>
  );}

export default App
