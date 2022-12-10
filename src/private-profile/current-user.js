import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { profileThunk } from '../thunks/users-thunks';

const CurrentUserComponent = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileThunk());
  }, []);

  return children;
};

export default CurrentUserComponent;
