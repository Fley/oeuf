import React from 'react';
import { storiesOf } from '@storybook/react';
import EmptyPage from './EmptyPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';

storiesOf('EmptyPage', module).add('empty', () => (
  <div>
    <nav className="navbar sticky-top navbar-light shadow-sm" style={{ backgroundColor: 'var(--poussin)' }}>
      Exercises
    </nav>
    <div className="col-sm-10 mx-auto mt-2 mb-5">
      <EmptyPage
        text="You have no exercises yet"
        icon={faListAlt}
        action={<button className="btn btn-sm btn-info">Create your first exercice</button>}
      />
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
));
