import {
  Workspace, Computed, Tail
} from './components';

import './App.css';

function App() {
  return (
    <div className='App'>
      <div className="Header">
        <h1>rxjs</h1>
        <h2>由于没有取消订阅的操作，可能有内存泄漏问题</h2>
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
