import React, { Component } from 'react';
import './App.css';
import Theme from './components/theme/Theme';
import Shell from './components/shell/Shell';
import ExerciseListPageContainer from './components/exercise-list/ExerciceListPageContainer';
import RootContainer from './redux/RootContainer';

class App extends Component {
  render() {
    return (
      <RootContainer>
        <Theme>
          <Shell>
            <ExerciseListPageContainer />
          </Shell>
        </Theme>
      </RootContainer>
    );
  }
}

export default App;
