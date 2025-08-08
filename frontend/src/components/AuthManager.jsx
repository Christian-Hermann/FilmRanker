import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthManager({ setUser }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? (
        <>
          <LoginForm onLogin={setUser} />
          <p>
            Doesn't have an acct?{" "}
            <button onClick={() => setShowLogin(false)}>Register</button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm onRegister={setUser} />
          <p>
            Already have an account?{" "}
            <button onClick={() => setShowLogin(true)}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default AuthManager;
