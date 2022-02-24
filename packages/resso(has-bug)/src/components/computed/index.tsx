import { useEffect, useState, memo } from 'react';
import { store } from '../../store';
import { IfElse } from '../utils'
import S from './index.module.css';

/**
 * 最高温度
 */
const MaxTemperature = memo(() => {
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>最高温度:</div>
      <IfElse if={!!store.citys.length}>
        <div>{Math.max(...store.citys.map(city => Number(city.temperature) || 0))}</div>
      </IfElse>
    </div>
  )
})

/**
 * 平均温度
 */
const AverageTemperature = memo(() => {
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>平均温度:</div>
      <IfElse if={!!store.citys.length}>
        <div>{(store.citys.reduce((res, city) => res += Number(city.temperature) || 0, 0) / store.citys.length).toFixed(1)}</div>
      </IfElse>
    </div>
  )
})

/**
 * 历史最高温度
 */
const HistoryMaxTemperature = memo(() => {
  const [max, setMax] = useState(0);

  useEffect(() => {
    setMax(Math.max(...store.citys.map(city => Number(city.temperature) || 0), max))
  }, [store.citys])

  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>历史最高温度:</div>
      <IfElse if={!!store.citys.length}>
        <div>{max}</div>
      </IfElse>
    </div>
  )
})

/**
 * 历史最高平均温度
 */
const HistoryMaxAverageTemperature = memo(() => {
  const [averageMax, setAverageMax] = useState(0);

  useEffect(() => {
    const average = store.citys.length ?
      Number((store.citys.reduce((res, city) => res += Number(city.temperature) || 0, 0) / store.citys.length).toFixed(1)) :
      0;
    setAverageMax(Math.max(averageMax, average));
  }, [store.citys])

  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>历史最高平均温度:</div>
      <IfElse if={!!store.citys.length}>
        <div>{averageMax}</div>
      </IfElse>
    </div>
  )
})

export const Computed = memo(() => {
  return (
    <div className={S['computed-warpper']}>
      <MaxTemperature />
      <AverageTemperature />
      <HistoryMaxTemperature />
      <HistoryMaxAverageTemperature />
    </div>
  )
})