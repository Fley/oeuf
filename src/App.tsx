import React, { FC } from 'react';
import 'App.css';
import Theme from './components/theme/Theme';
import ExerciseListPageContainer from './components/exercise-list/container/ExerciseListPageContainer';
import ExercisePageContainer from './components/exercise/container/ExercisePageContainer';
import RootContainer from './redux/RootContainer';
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom';
import Error404 from './components/empty-page/Error404';
import { ExerciseRunnerContainer } from 'components/exercise-runner';
import { register as registerServiceWorker } from './serviceWorker';
import configureStore from './store/configureStore';

const appStore = configureStore();

// Register service worker
registerServiceWorker(appStore.dispatch);

export const App: FC = () => (
  <RootContainer store={appStore}>
    <Router basename={process.env.REACT_APP_BASE_DIR}>
      <Theme>
        <Switch>
          <Route exact path="/" component={ExerciseListPageContainer} />
          <Route
            exact
            path="/:id"
            component={({ match }: RouteComponentProps<{ id: string }>) => (
              <ExercisePageContainer exerciseId={match.params.id} />
            )}
          />
          <Route
            exact
            path="/:exerciseId/runner/:stepId"
            component={({ match }: RouteComponentProps<{ exerciseId: string; stepId: string }>) => (
              <ExerciseRunnerContainer exerciseId={match.params.exerciseId} stepId={match.params.stepId} />
            )}
          />
          <Route component={Error404} />
        </Switch>
      </Theme>
    </Router>
  </RootContainer>
);
