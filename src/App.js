import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usersReducer from './reducers/users-reducer';
import googleBooksReducer from './reducers/google-books-reducer';
import currentlyReadingReducer from './reducers/currently-reading-reducer';
import booksReducer from './reducers/books-reducer';
import Home from './home';
import LoginComponent from './account/login';
import RegisterComponent from './account/register';
import ProfileComponent from './private-profile';
import CurrentUserComponent from './private-profile/current-user';
import SearchComponent from './search';
import BookDetails from './details/book-details';
import ProtectedRoute from './private-profile/ProtectedRoute';
import reviewsReducer from './reducers/reviews-reducer';
import SearchResults from './search/search-results';
import PublishComponent from './publish';
import PublicProfile from './public-profile/public-profile';
import meetingsReducer from './reducers/meetings-reducer';
import CreateMeeting from './meetings/create-meeting';
import AllMeetings from './meetings/all-meetings';

const store = configureStore({
  reducer: {
    users: usersReducer,
    googleBooks: googleBooksReducer,
    reviews: reviewsReducer,
    currentlyReading: currentlyReadingReducer,
    books: booksReducer,
    meetings: meetingsReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <CurrentUserComponent>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/search" element={<SearchComponent />} />
            <Route
              path="/publish"
              element={
                <ProtectedRoute>
                  <PublishComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/meetings" element={<AllMeetings />} />
            <Route
              path="/meetings/create"
              element={
                <ProtectedRoute>
                  <CreateMeeting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/details/:bid" element={<BookDetails />} />
            <Route path="/profile/:uid" element={<PublicProfile />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserComponent>
      <ToastContainer position="bottom-center" />
    </Provider>
  );
}

export default App;
