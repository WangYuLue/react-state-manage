import { observer } from "mobx-react";
import { store } from '../../store';
import { IfElse } from '../utils'
import S from './index.module.css';

/**
 * 最高温度
 */
const MaxTemperature = observer(() => {
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>最高温度:</div>
      <div>{store.maxTemperature}</div>
    </div>
  )
})

/**
 * 平均温度
 */
const AverageTemperature = observer(() => {
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>平均温度:</div>
      <IfElse if={!!store.citys.length}>
        <div>{store.averageTemperature}</div>
      </IfElse>
    </div>
  )
})

/**
 * 历史最高温度
 */
const HistoryMaxTemperature = observer(() => {
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>历史最高温度:</div>
      <div>{store.historyMaxTemperature}</div>
    </div>
  )
})

/**
 * 历史最高平均温度
 */
const HistoryMaxAverageTemperature = observer(() => {
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>历史最高平均温度:</div>
      <IfElse if={!!store.citys.length}>
        <div>{store.historyMaxAverageTemperature}</div>
      </IfElse>
    </div>
  )
})


export const Computed = observer(() => {
  return (
    <div className={S['computed-warpper']}>
      <MaxTemperature />
      <AverageTemperature />
      <HistoryMaxTemperature />
      <HistoryMaxAverageTemperature />
    </div>
  )
})