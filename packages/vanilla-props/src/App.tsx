import { useState } from 'react'
import { useImmer } from 'use-immer';
import {
  Workspace, Computed, Tail
} from './components';
import { ICity } from './models'
import { makeCity } from './utils'
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
    <div className='App'>
      <div className="Header">
        <h1>vanilla-props</h1>
      </div>
      <div className="Main">
        <div className="Workspace">
          <Workspace
            citys={citys}
            keyWord={keyWord}
            setCitys={setCitys}
            setKeyWord={setKeyWord}
          />
        </div>
        <div className="Computed">
          <Computed
            citys={citys}
          />
        </div>
      </div>
      <div className="Tail">
        <Tail
          citys={citys}
          keyWord={keyWord}
        />
      </div>
    </div>
  )
}

export default App
