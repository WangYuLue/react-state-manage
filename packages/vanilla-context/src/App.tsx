import { useState } from 'react'
import { useImmer } from 'use-immer';
import {
  Workspace, Computed, Tail
} from './components';
import { ICity } from './models'
import { makeCity } from './utils'
import { CitysContext, KeyWordContext } from './context';
import './App.css';

function App() {
  const [citys, setCitys] = useImmer<ICity[]>([
    makeCity('北京'),
    makeCity('上海'),
    makeCity('深圳'),
    makeCity('广州'),
    makeCity('成都'),
    makeCity('南京'),
    makeCity('西安')
  ]);
  const [keyWord, setKeyWord] = useState('');
  return (
    <CitysContext.Provider value={[citys, setCitys]}>
      <KeyWordContext.Provider value={[keyWord, setKeyWord]}>
        <div className='App'>
          <div className="Header">
            <h1>vanilla-context</h1>
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
      </KeyWordContext.Provider>
    </CitysContext.Provider>
  )
}

export default App
