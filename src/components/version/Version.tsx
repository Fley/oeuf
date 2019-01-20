import React from 'react';
import { version as appVersion } from '../../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { updateContent } from 'serviceWorker/redux/actions';
import { AppStore } from 'store/reducer.js';
import { getServiceWorkerState } from 'store/selectors';
import { isNewVersionAvailable } from 'serviceWorker';

type VersionStateProps = {
  isNewVersionAvailable: boolean;
};

type VersionDispatchProps = {
  updateContent: () => void;
};

type Props = VersionDispatchProps & VersionStateProps;

const VersionComponent = ({ isNewVersionAvailable, updateContent }: Props) => (
  <>
    {isNewVersionAvailable ? (
      <button className="btn btn-outline-dark" onClick={updateContent}>
        <FontAwesomeIcon icon={faArrowAltCircleDown} /> Update
      </button>
    ) : (
      <span>{appVersion}</span>
    )}
  </>
);

const mapStateToProps: MapStateToProps<VersionStateProps, {}, AppStore> = state => ({
  isNewVersionAvailable: isNewVersionAvailable(getServiceWorkerState(state))
});

const mapDispatchToProps: MapDispatchToProps<VersionDispatchProps, {}> = dispatch => ({
  updateContent: () => dispatch(updateContent())
});

export const Version = connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionComponent);
