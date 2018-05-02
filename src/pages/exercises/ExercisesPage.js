import React from 'react';
import ExerciseList from '../../components/exercise-list/ExerciseList';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';

const ExercisesPage = ({ exercises }) => {
  return (
    <div>
      <nav className="navbar sticky-top navbar-light shadow-sm" style={{ backgroundColor: 'var(--poussin)' }}>
        Exercises
      </nav>
      <div className="col-sm-10 mx-auto mt-2 mb-5">
        <ExerciseList exercises={exercises} />
      </div>
      <nav className="navbar fixed-bottom navbar-light bg-white p-0 navbar-expand shadow-up-sm">
        <ul className="d-flex navbar-nav w-100">
          <li className="nav-item flex-grow-1">
            <a className="nav-link" href="">
              <FontAwesomeIcon icon={faPlusSquare} /> NEW EXERCISE
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ExercisesPage;
