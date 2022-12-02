import React from 'react';

const SearchComponent = () => {
  const options = ['Title', 'Author', 'ISBN', 'Publisher'];
  return (
    <>
      <div className="d-flex justify-content-center align-items-center pt-5 mt-5">
        <img src="./images/logo.png" alt="" width={100} height={100} />
      </div>
      <div className="pt-5 mt-5 pb-0">
        <div className="row p-0 mx-auto text-center w-75">
          {options.map((option) => {
            return (
              <div className="col-3">
                <i className="fa-solid fa-flask" /> {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-5 mt-5 pb-0">
        <div className="row p-0 mx-auto text-center w-75">
          <div className="col-12">
            <div className="position-relative">
              <input
                className="ps-5 form-control rounded-pill"
                placeholder="Search for Books"
              />
              <span className="position-absolute searching">
                <i className="fa fa-search" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
