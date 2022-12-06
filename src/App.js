import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import usersReducer from './reducers/users-reducer';
import googleBooksReducer from './reducers/google-books-reducer';
import Home from './home';
import LoginComponent from './login';
import RegisterComponent from './register';
import ProfileComponent from './profile';
import CurrentUserComponent from './current-user';
import SearchComponent from './search';
import GoogleBookDetails from './details/google-book-details';
import ProtectedRoute from './profile/ProtectedRoute';
import reviewsReducer from './reducers/reviews-reducer';
import SearchResults from './search/search-results';

const store = configureStore({
  reducer: {
    users: usersReducer,
    googleBooks: googleBooksReducer,
    reviews: reviewsReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <CurrentUserComponent>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/search" element={<SearchComponent />} />
              <Route path="/search/:query" element={<SearchResults />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileComponent />
                  </ProtectedRoute>
                }
              />
              <Route path="/details/:bid" element={<GoogleBookDetails />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CurrentUserComponent>
    </Provider>
  );
}

export default App;
