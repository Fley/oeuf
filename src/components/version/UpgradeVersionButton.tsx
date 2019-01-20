import React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { updateContent } from 'serviceWorker/redux/actions';

type UpgradeVersionButtonDispatchProps = {
  updateContent: () => void;
};

const UpgradeVersionButtonComponent = ({ updateContent }: UpgradeVersionButtonDispatchProps) => (
  <button className="btn btn-link" onClick={updateContent}>
    UPDATE
  </button>
);

const mapDispatchToProps: MapDispatchToProps<UpgradeVersionButtonDispatchProps, {}> = dispatch => ({
  updateContent: () => dispatch(updateContent())
});

export const UpgradeVersionButton = connect(
  () => ({}),
  mapDispatchToProps
)(UpgradeVersionButtonComponent);
