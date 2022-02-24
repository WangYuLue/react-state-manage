import { Provider } from 'react-redux';
import {
  Workspace, Computed, Tail
} from './components';

import './App.css';

function App() {
  return (
    <div className='App'>
      <div className="Header">
        <h1>rxjs</h1>
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
  )
}

export default App
