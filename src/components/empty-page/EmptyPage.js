import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const EmptyPage = ({ icon, text, action }) => {
  return (
    <div
      className="d-flex align-items-center w-100 text-center bg-light text-dark"
      style={{
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <div className="m-auto">
        <div>{icon && <FontAwesomeIcon icon={icon} size="7x" />}</div>
        <div>{text}</div>
        {action && <div className="m-5">{action}</div>}
      </div>
    </div>
  );
};

EmptyPage.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  action: PropTypes.element
};

export default EmptyPage;
