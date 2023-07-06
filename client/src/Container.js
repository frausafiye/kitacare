import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const MyContext = createContext("");
export { MyContext };

export default function Container(props) {
  const history = useHistory();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [kg, setKg] = useState(JSON.parse(localStorage.getItem("kg")) || null);
  const [isLogin, setIsLogin] = useState(Boolean(user));

  const reset = async () => {
    localStorage.removeItem("kg");
    localStorage.removeItem("user");
    await setIsLogin(false);
    await history.push("/login");
    setUser(null);
  };
  const authCheckHandler = (err) => {
    err.response && err.response.status === 401 ? reset() : console.log(err);
  };

  useEffect(() => {
    if (user && user.kg) {
      axios({
        method: "GET",
        withCredentials: true,
        url: `${process.env.REACT_APP_BASE_URL}/kg/getKg/${user.kg}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.success) {
            setKg(response.data.kg);
            localStorage.setItem("kg", JSON.stringify(response.data.kg));
          } else {
            console.log(response);
          }
        })
        .catch((err) => authCheckHandler(err));
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        isLogin,
        setIsLogin,
        kg,
        setKg,
        authCheckHandler,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
