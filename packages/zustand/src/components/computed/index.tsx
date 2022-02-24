import { useEffect, useState, memo } from 'react';
import { useStore } from '../../store';
import { IfElse } from '../utils'
import S from './index.module.css';

/**
 * 最高温度
 */
const MaxTemperature = memo(() => {
  const citys = useStore(state => state.citys);
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>最高温度:</div>
      <IfElse if={!!citys.length}>
        <div>{Math.max(...citys.map(city => Number(city.temperature) || 0))}</div>
      </IfElse>
    </div>
  )
})

/**
 * 平均温度
 */
const AverageTemperature = memo(() => {
  const citys = useStore(state => state.citys);
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>平均温度:</div>
      <IfElse if={!!citys.length}>
        <div>{(citys.reduce((res, city) => res += Number(city.temperature) || 0, 0) / citys.length).toFixed(1)}</div>
      </IfElse>
    </div>
  )
})

/**
 * 历史最高温度
 */
const HistoryMaxTemperature = memo(() => {
  const citys = useStore(state => state.citys);
  const [max, setMax] = useState(0);

  useEffect(() => {
    setMax(Math.max(...citys.map(city => Number(city.temperature) || 0), max))
  }, [citys])

  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>历史最高温度:</div>
      <IfElse if={!!citys.length}>
        <div>{max}</div>
      </IfElse>
    </div>
  )
})

/**
 * 历史最高平均温度
 */
const HistoryMaxAverageTemperature = memo(() => {
  const citys = useStore(state => state.citys);
  const [averageMax, setAverageMax] = useState(0);

  useEffect(() => {
    const average = citys.length ?
      Number((citys.reduce((res, city) => res += Number(city.temperature) || 0, 0) / citys.length).toFixed(1)) :
      0;
    setAverageMax(Math.max(averageMax, average));
  }, [citys])

  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>历史最高平均温度:</div>
      <IfElse if={!!citys.length}>
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