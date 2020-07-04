import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Auth from '../middleware/Auth'

function Users() {
  const [users, setUsers] = useState({ data: [] });
  const clearedForm = { name: "", job: "" };
  const [form, setForm] = React.useState(clearedForm);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleForm(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    // paypal . stripe . raszorpay
    // testing key, secret
    // live key, secret
    axios.post("/users?delay=1", form)
      .then((res) => {
        setUsers({ ...users, data: [...users.data, { name: res.data.name }] });
        setForm(clearedForm);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      history.push("/login");
    }
    const getData = async () => {
      const { data } = await axios.get(`/unknown`);
      setUsers(data);
    };
    getData();
  }, []);
  return (
    <div>
      {users.data.map((user, i) => (
        <section key={i}>
          <div className="flex ">
            <p className="mx-2 ">{user.name}</p>
            {/* <p className="mx-2 ">{user.email}</p> */}
          </div>
        </section>
      ))}
      <section className="mt-10">
        <form className="flex justify-between" onSubmit={handleForm}>
          <div className="">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="p-2 border border-gray-800 w-64"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <input
              type="text"
              name="job"
              placeholder="Enter your Job"
              className="p-2 border border-gray-800 w-64"
              value={form.job}
              onChange={handleChange}
            />
          </div>
          <button
            className={`w-64 text-white p-2 ${
              isLoading ? "bg-blue-500" : "bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              "Add"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Auth(Users);