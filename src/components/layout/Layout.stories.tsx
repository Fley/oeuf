import React from 'react';
import { storiesOf } from '@storybook/react';
import { Layout } from './Layout';
import { CenteredPageLayout } from './CenteredPageLayout';

storiesOf('layout/Layout', module)
  .add('Empty', () => <Layout />)
  .add('Complete', () => (
    <Layout
      header={'My header'}
      navItems={[
        <button key="nav-start" className="btn btn-link nav-link btn-block">
          Start
        </button>,
        <button key="nav-stop" className="btn btn-link nav-link btn-block">
          Stop
        </button>
      ]}
    >
      Hello
    </Layout>
  ));

storiesOf('layout/CenteredPageLayout', module).add('With child', () => <CenteredPageLayout>Hello</CenteredPageLayout>);
