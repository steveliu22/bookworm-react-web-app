import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  findMeetingsByUserThunk,
  findMeetingsThunk,
} from '../thunks/meetings-thunks';
import Meetings from './meetings';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
  DEFAULT_SEARCH_IMAGE,
} from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';

const AllMeetings = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { meetings, userMeetings } = useSelector((state) => state.meetings);

  useEffect(() => {
    dispatch(findMeetingsThunk());

    if (currentUser) {
      dispatch(findMeetingsByUserThunk(currentUser._id));
    }
  }, [currentUser]);

  const renderMeetings = () => {
    if (meetings.length > 0) {
      return (
        <div className="pt-3">
          <Meetings meetings={meetings} userMeetings={userMeetings} />
        </div>
      );
    }
    return <h1 className="text-center">No Scheduled Meetings :(</h1>;
  };

  return (
    <div className="ps-4 pt-3 pe-4">
      <div className="row">
        <div className="col-3 col-md-2">
          <NavigationSidebar />
        </div>
        <div className="col-9 col-md-10">
          <div className="text-center pb-4">
            <div className="mb-2">
              <img
                src={DEFAULT_SEARCH_IMAGE}
                alt=""
                width={DEFAULT_LOGO_WIDTH}
                height={DEFAULT_LOGO_HEIGHT}
              />
            </div>
            <div>
              <h5 className="lead">All Scheduled Book Meetings</h5>
            </div>
          </div>
          {renderMeetings()}
        </div>
      </div>
    </div>
  );
};

export default AllMeetings;
