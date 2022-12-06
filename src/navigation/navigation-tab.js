import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationTab = (tab) => {
  const location = useLocation();
  const active = tab.tab.link === location.pathname ? 'active' : '';
  return (
    <li className={`list-group-item m-0 p-0 border p-2 ${active}`}>
      <Link to={tab.tab.link} className="text-decoration-none">
        <div
          className={`row mx-0 text-center ${
            active === 'active' ? 'text-light' : 'text-dark'
          }`}
        >
          <div className="col-md-12 col-lg-6 p-0 ">{tab.tab.icon}</div>
          <div className="d-none d-lg-block col-lg-6 p-0 fs-6 text-start small fw-bold">
            {tab.tab.name}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default NavigationTab;
