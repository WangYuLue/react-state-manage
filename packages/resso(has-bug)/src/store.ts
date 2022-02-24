import resso from 'resso';
import { makeCity } from './utils';
import { ICity } from './models';

const store = resso({
  keyWord: '',
  citys: [
    makeCity('北京'),
    makeCity('上海'),
    makeCity('深圳'),
    makeCity('广州'),
    makeCity('成都'),
    makeCity('南京'),
    makeCity('西安')
  ]
})

function addCity(city: ICity) {
  store.citys.push(city);
}

function removeCity(cityName: string) {
  const removeCityIndex = store.citys.findIndex(target => target.name === cityName);
  if (removeCityIndex >= 0) {
    store.citys.splice(removeCityIndex, 1);
  }
}

function toggleSubscribeCity(cityName: string) {
  store.citys.forEach(target => {
    if (target.name === cityName) {
      target.subscribe = !target.subscribe
    }
  });
}

function updateCityTemperature(city: ICity) {
  store.citys.forEach(target => {
    if (target.name === city.name) {
      target.temperature = city.temperature;
    }
  });
}

function updateCityWeather(city: ICity) {
  store.citys.forEach(target => {
    if (target.name === city.name) {
      target.weatherType = city.weatherType;
    }
  });
}

function setKeyWord(keyWord: string) {
  store.keyWord = keyWord;
}


export {
  store,
  addCity,
  updateCityWeather,
  updateCityTemperature,
  toggleSubscribeCity,
  removeCity,
  setKeyWord
}