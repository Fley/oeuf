import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Layout from './Layout';

storiesOf('layout/Layout', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Empty', () => <Layout />)
  .add('Complete', () => (
    <Layout
      header={'My header'}
      navItems={[
        <button className="btn btn-link nav-link btn-block">Start</button>,
        <button className="btn btn-link nav-link btn-block">Stop</button>
      ]}
    >
      Hello
    </Layout>
  ));