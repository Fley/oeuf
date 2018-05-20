import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import Exercise from './Exercise';

const ExercisePage = ({ exercise: { id, name, steps } = { steps: [] } }) => (
  <div>
    <nav className="navbar sticky-top navbar-light shadow-sm bg-white">
      <button className="btn btn-link text-dark">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </nav>
    <div className="col-sm-10 mx-auto mb-5 py-3 px-0 px-xs-2">
      <Exercise name={name} steps={steps} />
    </div>
    <nav className="navbar fixed-bottom navbar-light bg-white p-0 navbar-expand shadow-up-sm">
      <ul className="navbar-nav nav-justified w-100">
        <li className="nav-item">
          <a className="nav-link" href="">
            <FontAwesomeIcon icon={faPlay} /> Start
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="">
            <FontAwesomeIcon icon={faPlusSquare} /> New
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

ExercisePage.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    steps: PropTypes.array
  }).isRequired
};

export default ExercisePage;
