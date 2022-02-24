import { useSnapshot } from "valtio";
import { store } from '../../store';
import { IfElse } from '../utils'
import S from './index.module.css';

/**
 * 最高温度
 */
const MaxTemperature = () => {
  const snap = useSnapshot(store)
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>最高温度:</div>
      <div>{snap.maxTemperature}</div>
    </div>
  )
}

/**
 * 平均温度
 */
const AverageTemperature = () => {
  const snap = useSnapshot(store)
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>平均温度:</div>
      <IfElse if={!!snap.citys.length}>
        <div>{snap.averageTemperature}</div>
      </IfElse>
    </div>
  )
}

/**
 * 历史最高温度
 */
const HistoryMaxTemperature = () => {
  const snap = useSnapshot(store)
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>历史最高温度:</div>
      <div>{snap.historyMaxTemperature}</div>
    </div>
  )
}

/**
 * 历史最高平均温度
 */
const HistoryMaxAverageTemperature = () => {
  const snap = useSnapshot(store)
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>历史最高平均温度:</div>
      <IfElse if={!!snap.citys.length}>
        <div>{snap.historyMaxAverageTemperature}</div>
      </IfElse>
    </div>
  )
}


export const Computed = () => {
  return (
    <div className={S['computed-warpper']}>
      <MaxTemperature />
      <AverageTemperature />
      <HistoryMaxTemperature />
      <HistoryMaxAverageTemperature />
    </div>
  )
}