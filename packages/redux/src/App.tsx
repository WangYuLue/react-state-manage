import { Provider } from 'react-redux';
import { store } from './store';
import {
  Workspace, Computed, Tail
} from './components';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <div className="Header">
          <h1>redux</h1>
        </div>
        <div className="Main">
          <div className="Workspace">
            <Workspace />
          </div>
          <div className="Computed">
            <Computed />
          </div>
        </div>
        <div className="Tail">
          <Tail />
        </div>
      </div>
    </Provider>
  )
}

export default App
