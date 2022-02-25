import { memo } from 'react';
import { useRxjs } from '../utils'
import { citys$, filterCitys$ } from '../../store';
import S from './index.module.css';

const AllCityNumber = memo(() => {
  const citys = useRxjs(citys$);
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>城市总数:</div>
      <div>{citys.length}</div>
    </div>
  )
})

const SubscribedCityNumber = memo(() => {
  const citys = useRxjs(citys$);
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>订阅城市总数:</div>
      <div>{citys.filter(city => city.subscribe).length}</div>
    </div>
  )
})

const SearchCityNumber = memo(() => {
  const filterCitys = useRxjs(filterCitys$);
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>搜索城市总数:</div>
      <div>{filterCitys.length}</div>
    </div>
  )
})

export const Tail = memo(() => {
  return (
    <div className={S['tail-warpper']}>
      <AllCityNumber />
      <SubscribedCityNumber />
      <SearchCityNumber />
    </div>
  )
})