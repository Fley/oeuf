import React from 'react';
import ExerciseList from './ExerciseList';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';

const ExercisesPage = ({ exercises }) => (
  <div>
    <nav className="navbar sticky-top navbar-dark shadow-sm bg-primary">
      <span className="navbar-brand mb-0 h1">Exercises</span>
    </nav>
    <div className="col-sm-10 p-0 mx-auto mb-5 py-3">
      <ExerciseList exercises={exercises} />
    </div>
    <nav className="navbar fixed-bottom navbar-light bg-white p-0 navbar-expand shadow-up-sm">
      <ul className="d-flex navbar-nav w-100">
        <li className="nav-item flex-grow-1">
          <a className="nav-link" href="">
            <FontAwesomeIcon icon={faPlusSquare} /> New exercise
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

export default ExercisesPage;
