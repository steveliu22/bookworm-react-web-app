import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import usersReducer from './reducers/users-reducer';
import Home from './home';
import LoginComponent from './login';
import RegisterComponent from './register';
import ProfileComponent from './profile';
import CurrentUserComponent from './current-user';
import SearchComponent from './search';

const store = configureStore({ reducer: { users: usersReducer } });

function App() {
  return (
    <Provider store={store}>
      <CurrentUserComponent>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/search" element={<SearchComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/profile" element={<ProfileComponent />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CurrentUserComponent>
    </Provider>
  );
}

export default App;
