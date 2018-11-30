import React from 'react';
import { storiesOf } from '@storybook/react';
import EmptyPage from './EmptyPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import Error404 from './Error404';
import Layout from 'components/layout/Layout';

storiesOf('EmptyPage', module)
  .add('empty', () => (
    <Layout
      header={'Exercises'}
      navItems={[
        <button className="btn btn-link nav-link">
          <FontAwesomeIcon icon={faPlusSquare} /> NEW EXERCISE
        </button>
      ]}
    >
      <EmptyPage
        text="You have no exercises yet"
        icon={faListAlt}
        action={<button className="btn btn-sm btn-info">Create your first exercice</button>}
      />
    </Layout>
  ))
  .add('Error 404', () => <Error404 />);
