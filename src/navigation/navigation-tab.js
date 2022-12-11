import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationTab = (tab) => {
  const location = useLocation();
  const active = tab.tab.link === location.pathname ? 'active' : '';
  return (
    <li className={`list-group-item m-0 border p-2 pe-3 ${active}`}>
      <Link to={tab.tab.link} className="text-decoration-none">
        <div
          className={`row mx-0 text-center ${
            active === 'active' ? 'text-light' : 'text-dark'
          }`}
        >
          <div className="d-none d-xxl-block col-xxl-2 p-0 fs-6 text-start small fw-bold text-center">
            {tab.tab.icon}
          </div>
          <div className="col-lg-12 col-xxl-10 p-0 small ">{tab.tab.name}</div>
        </div>
      </Link>
    </li>
  );
};

export default NavigationTab;
