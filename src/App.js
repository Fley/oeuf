import React, { Component } from 'react';
import './App.css';
import Theme from './components/theme/Theme';
import Shell from './components/shell/Shell';
import ExerciseListPageContainer from './components/exercise-list/ExerciceListPageContainer';
import ExercisePageContainer from './components/exercise/ExercisePage';
import RootContainer from './redux/RootContainer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './components/empty-page/Error404';

class App extends Component {
  render() {
    return (
      <RootContainer>
        <Router>
          <Theme>
            <Shell>
              <Switch>
                <Route exact path="/" component={ExerciseListPageContainer} />
                <Route exact path="/:id" component={({ match }) => <ExercisePageContainer id={match.params.id} />} />
                <Route component={Error404} />
              </Switch>
            </Shell>
          </Theme>
        </Router>
      </RootContainer>
    );
  }
}

export default App;
