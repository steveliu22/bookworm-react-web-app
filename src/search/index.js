import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../navigation/navigation';
import { DEFAULT_SEARCH_IMAGE } from '../shared/helpers';

const SearchComponent = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigate();
  const handleSearchBtn = () => {
    if (!search || search === '') {
      return;
    }
    navigation(`/search/${search}`);
    navigation(0);
  };

  return (
    <div className="p-5 pb-2">
      <div className="row">
        <div className="col-md-12 col-lg-2 text-center pb-4">
          <NavigationSidebar />
        </div>
        <div className="col-md-12 col-lg-10">
          <div className="d-flex justify-content-center align-items-center">
            <img src={DEFAULT_SEARCH_IMAGE} alt="" className="w-25" />
          </div>
          <div className="d-flex justify-content-center align-items-center pt-3">
            <h2 className="fw-italic fw-bolder">Welcome to Bookworm Search</h2>
          </div>
          <div className="pt-4 pb-0 pt-3">
            <div className="row p-0 mx-auto text-center">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <div className="position-relative">
                  <input
                    className="ps-5 form-control rounded-pill"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for Books"
                  />
                  <span className="position-absolute searching">
                    <button
                      type="button"
                      className="btn btn-primary-outline btn-sm"
                      onClick={handleSearchBtn}
                    >
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
