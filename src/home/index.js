import React from 'react';
import NavigationSidebar from '../navigation/navigation';

const HomeComponent = () => {
  return (
    <div className="row p-5">
      <div className="col-md-2 col-lg-2">
        <NavigationSidebar />
      </div>
      <div className="col-4 p-0">
        <h1>Bookworm</h1>
      </div>
      <div className="col-6 p-0">
        <h1>test</h1>
      </div>
    </div>
  );
};

export default HomeComponent;
