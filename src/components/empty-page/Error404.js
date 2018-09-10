import React from 'react';
import EmptyPage from './EmptyPage';
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';

export default ({ history }) => {
  const goBackButton = (
    <button className="btn btn-sm btn-primary" onClick={() => history.goBack()}>
      Go back
    </button>
  );
  return <EmptyPage icon={faKiwiBird} text={'Sorry, page was not found'} action={goBackButton} />;
};
