import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio'
import {
  store,
  addCity,
  updateCityWeather,
  updateCityTemperature,
  toggleSubscribeCity,
  removeCity,
  setKeyWord
} from '../../store';
import { LoadingOutlined } from '@ant-design/icons';
import type { ICity } from '../../models';
import { makeCity, getPromiseWithAbort } from '../../utils';
import { getCityWeather, getCityTemperature } from '../../services';
import { IfElse } from '../utils'
import S from './index.module.css';

/**
 * 添加城市的 UI
 * 
 * @returns 
 */
const AddCity = () => {
  const snap = useSnapshot(store);

  const addCityRef = useRef<HTMLInputElement>(null);

  const onAddCity = () => {
    const cityName = addCityRef.current?.value;
    if (!cityName) {
      console.warn('城市名不能为空')
      return;
    }
    if (snap.citys.find(city => city.name === cityName)) {
      console.warn('城市名重复')
      return;
    }
    addCity(makeCity(cityName));
    addCityRef.current.value = ''
  }

  return (
    <div>
      <input type="text" ref={addCityRef} className={S['add-city']} />
      <button
        onClick={onAddCity}>
        添加城市
      </button>
    </div>
  )
}

/**
 * 添加城市的 UI
 * 
 * @returns 
 */
const SearchCity = () => {
  const snap = useSnapshot(store);
  return (
    <div className={S['srearch-city']}>
      <input type="text"
        value={snap.keyWord}
        placeholder='搜索'
        onChange={(e) => {
          setKeyWord(e.target.value)
        }}
      />
    </div>
  )
}

/**
 * 展示城市详情的 UI
 * 
 * @param props 
 * @returns 
 */
const CityMessage = (props: { city: ICity }) => {
  const { city } = props;
  const [weatherloading, setWeatherLoading] = useState(false);
  const [temperatureloading, setTemperatureloading] = useState(false);
  const [canloading, setCanloading] = useState(true);
  const getWeatherRequest = useRef((msg?: string) => { });
  const getTemperatureRequest = useRef((msg?: string) => { });

  const onToggleSubscribe = () => {
    toggleSubscribeCity(city.name);
  }

  const setCityWeather = () => {
    const { promise, abort } = getPromiseWithAbort(getCityWeather(city.name));
    getWeatherRequest.current = abort
    return promise.then(res => {
      updateCityWeather(
        {
          ...city, weatherType: res
        }
      )
    })
  }

  const setCityTemperature = () => {
    const { promise, abort } = getPromiseWithAbort(getCityTemperature(city.name));
    getTemperatureRequest.current = abort
    return promise.then(res => {
      updateCityTemperature({
        ...city, temperature: res
      })
    })
  }

  useEffect(() => {
    if (!city.subscribe) {
      getWeatherRequest.current('取消请求');
      getTemperatureRequest.current('取消请求');
      setWeatherLoading(false)
      setTemperatureloading(false)
      setCanloading(true)
      return;
    }
    if (!weatherloading && canloading) {
      setWeatherLoading(true);
      setCanloading(false);
      setCityWeather()
        .then(() => {
          setWeatherLoading(false);
          setTemperatureloading(true);
        })
        .then(setCityTemperature)
        .then(() => {
          setTemperatureloading(false);
          setTimeout(() => {
            // 2秒后继续加载
            setCanloading(true);
          }, 2000)
        })
    }
  }, [weatherloading, temperatureloading, canloading, city.subscribe])

  const onDeleteCity = () => {
    removeCity(city.name)
  }

  return (
    <div className={S['city-message']}>
      <div className={S['city-message-opration']}>
        <button onClick={onDeleteCity} >删除</button>
        <button onClick={onToggleSubscribe} >{city.subscribe ? '取消订阅' : '订阅'}</button>
      </div>
      <div className={S['city-message-name']} >
        {city.name}
      </div>
      <div className={S['city-message-weather']}>
        {weatherloading ? <LoadingOutlined /> : city.weatherType}
      </div>
      <div className={S['city-message-temperature']}>
        {temperatureloading ? <LoadingOutlined /> : (
          <IfElse if={!!city.temperature}>
            {city.temperature + '摄氏度'}
          </IfElse>
        )}
      </div>
    </div>
  )
}

/**
 * 总区域：对城市进行管理
 * 
 * @returns 
 */
export const Workspace = () => {
  const snap = useSnapshot(store);
  return (
    <div>
      <AddCity />
      <SearchCity />
      <div className='c-city-list'>
        {
          snap.citys.filter(city => city.name.includes(snap.keyWord)).map(city => {
            return <CityMessage city={city} key={city.name} />
          })
        }
      </div>
    </div>
  )
}