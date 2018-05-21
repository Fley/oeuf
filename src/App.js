import React, { Component } from 'react';
import './App.css';
import Theme from './components/theme/Theme';
import Shell from './components/shell/Shell';
import ExerciseListPage from './components/exercise-list/ExerciseListPage';
import RootContainer from './containers/RootContainer';

class App extends Component {
  render() {
    return (
      <RootContainer>
        <Theme>
          <Shell>
            <ExerciseListPage
              exercises={[
                { name: 'Lorem ipsum', id: '1' },
                { name: 'Lorem ipsum', id: '2' },
                { name: 'Lorem ipsum', id: '3' },
                { name: 'Lorem ipsum', id: '4' },
                { name: 'Lorem ipsum', id: '5' },
                { name: 'Lorem ipsum', id: '6' },
                { name: 'Lorem ipsum', id: '7' },
                { name: 'Lorem ipsum', id: '8' },
                { name: 'Lorem ipsum', id: '9' },
                { name: 'Lorem ipsum', id: '10' },
                { name: 'Lorem ipsum', id: '11' }
              ]}
            />
          </Shell>
        </Theme>
      </RootContainer>
    );
  }
}

export default App;
