import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsloggedIn(user);
        setUserObj(user);
      } else {
        setIsloggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> 
      ) : (
        "initializing.."
      )}
      <footer>&copy; {new Date().getFullYear()} NTwitter</footer>
    </>
  );
}

export default App;
