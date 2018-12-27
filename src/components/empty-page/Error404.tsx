import React from 'react';
import EmptyPage from './EmptyPage';
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';
import { RouteComponentProps } from 'react-router';

export default ({ history }: RouteComponentProps) => {
  const goBackButton = (
    <button className="btn btn-primary" onClick={() => history.goBack()}>
      Go back
    </button>
  );
  return <EmptyPage icon={faKiwiBird} text={'Sorry, page was not found'} action={goBackButton} />;
};
