import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth';
import classes from './Navbar.module.scss';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { verifyAuth } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/users/me`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`/api/auth/logout`);
      setUser(null);
      verifyAuth();
      toast.success('Logged out successfully');
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  return (
    <header>
      <div className={classes.userInfo}>
        <FaUserAlt className={classes.userIcon} />
        <div>
          <h1 className={classes.name}>{user.name}</h1>
        </div>
      </div>
      <nav>
        <Link to="/edit-profile" className={classes.navBtn}>
          👨‍💻 Edit user profile
        </Link>
        <Link to="/edit-profile" className={classes.navBtn} onClick={handleLogout}>
          🔓 Logout
        </Link>
      </nav>
    </header>
  );
}
