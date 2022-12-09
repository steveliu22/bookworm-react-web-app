import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../thunks/users-thunks';
import NavigationTab from './navigation-tab';

const NavigationSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const navTabs = [
    {
      location: '',
      name: 'Home',
      icon: <i className="fas fa-home" />,
      link: '/',
    },
    {
      location: 'search',
      name: 'Search',
      icon: <i className="fas fa-search" />,
      link: '/search',
    },
  ];

  let buttons = [
    {
      name: 'Login',
      color: 'btn-success',
      action: () => navigate('/login'),
    },
    {
      name: 'Register',
      color: 'btn-success',
      action: () => navigate('/register'),
    },
  ];

  let welcomeTab = 'Welcome, Anonymous';

  const handleLogoutBtn = () => {
    navigate(0);
    dispatch(logoutThunk(currentUser));
  };

  if (currentUser) {
    welcomeTab = `Welcome, ${currentUser.username}`;
    navTabs.push({
      name: 'Profile',
      icon: <i className="fas fa-person" />,
      link: '/profile',
    });
    buttons = [
      {
        name: 'Logout',
        color: 'btn-danger',
        action: handleLogoutBtn,
      },
    ];
  }

  return (
    <div>
      <div>
        <p className="fs-7 small text-center">{welcomeTab}</p>
        <ul className="list-group">
          {navTabs.map((tab) => (
            <NavigationTab key={tab.name} tab={tab} />
          ))}
        </ul>
        {buttons.map((btn) => {
          return (
            <div key={btn.name} className="pt-2 text-center">
              <button
                type="button"
                className={`btn ${btn.color} btn-block`}
                onClick={btn.action}
              >
                {btn.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NavigationSidebar;
