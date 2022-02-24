import { createStore } from 'redux';
import { IData, ICity } from './models';
import { makeCity } from './utils';
import produce from "immer";

type Action = {
  type: "addCity";
  value: ICity;
} | {
  type: "removeCity";
  value: string;
} | {
  type: "updateCityTemperature";
  value: ICity;
} | {
  type: "updateCityWeather";
  value: ICity;
} | {
  type: "toggleSubscribeCity";
  value: string;
} | {
  type: "setKeyWord";
  value: string;
}

const initData: IData = {
  citys: [
    makeCity('北京'),
    makeCity('上海'),
    makeCity('深圳'),
    makeCity('广州'),
    makeCity('成都'),
    makeCity('南京'),
    makeCity('西安')
  ],
  keyWord: ''
}

const reducer = (state = initData, action: Action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'addCity':
        draft.citys.push(action.value)
        break;
      case 'removeCity':
        const removeCityIndex = draft.citys.findIndex(target => target.name === action.value);
        if (removeCityIndex >= 0) {
          draft.citys.splice(removeCityIndex, 1);
        }
        break;
      case 'toggleSubscribeCity':
        draft.citys.forEach(target => {
          if (target.name === action.value) {
            target.subscribe = !target.subscribe
          }
        });
        break;
      case 'updateCityTemperature':
        draft.citys.forEach(target => {
          if (target.name === action.value.name) {
            target.temperature = action.value.temperature;
          }
        });
        break;
      case 'updateCityWeather':
        draft.citys.forEach(target => {
          if (target.name === action.value.name) {
            target.weatherType = action.value.weatherType;
          }
        });
        break;
      case 'setKeyWord':
        draft.keyWord = action.value;
        break;
    }
  })
}

const store = createStore(reducer)

export {
  store
}