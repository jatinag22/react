import React, { useContext } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import Guest from '../middleware/Guest'
import GlobalContext from '../store/global'

function Login() {
  const [, dispatch] = useContext(GlobalContext);
  const history = useHistory();
  const [form, setform] = React.useState({ email: "", password: "" });

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    axios.post('/login?delay=1', form)
    .then((res) => {
      console.log(res.data.token)
      // localStorage.setItem('token', res.data.token);
      Cookies.set('token', res.data.token);
      dispatch({ type: 'SET_LOGIN', payload: res.data.token });
      history.push("/");
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err.response.data.error)
    });
  }

  return (
    <div className="flex justify-center text-center">
      <form className="w-1/2 bg-gray-100 rounded shadow py-10" onSubmit={handleForm}>
        <h1 className="text-3xl">Login Here</h1>
        <p className="text-red">{error}</p>
        <div className="my-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-800 my-4"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="p-2 border border-gray-800 my-4"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <button className={`"w-64 text-white p-2 my-5 
        ${isLoading ? "bg-blue-500" : "bg-blue-700"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

export default Guest(Login);