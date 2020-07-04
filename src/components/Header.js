import React, { useContext } from 'react'
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import GlobalContext from '../store/global';

export default function Header({ title }) {

  //const token = Cookies.get('token');
  const [{ loggedIn }, dispatch] = useContext(GlobalContext);

  const history = useHistory();
  function handleLogout(e) {
    e.preventDefault();
    dispatch({ type: 'LOGOUT' });
    Cookies.remove('token');
    history.push('/login');
  }

  return (
    <header className="justify-between bg-purple-800 text-white p-4 flex">
      <div className="flex">
        <p className="mx-2">
          <Link to="/">{title}</Link>
        </p>
        <p className="mx-2">
          <Link to="/about">About</Link>
        </p>
        <p className="mx-2">
          <Link to="/users">Users</Link>
        </p>
        <p className="mx-2">
          <Link to="/card-game">Card Game</Link>
        </p>
      </div>
      <div className="flex">
        {!loggedIn ? (<p className="mx-2">
          <Link to="/login">Login</Link>
        </p>) : (<p className="mx-2 cursor-pointer" onClick={handleLogout}>
          <Link to="/logout">Logout</Link>
        </p>)}
      </div>
    </header>
  );
}
  