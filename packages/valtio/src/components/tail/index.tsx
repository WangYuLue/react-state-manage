import { memo } from 'react';
import { useSnapshot } from "valtio";
import { store } from '../../store';
import S from './index.module.css';

const AllCityNumber = memo(() => {
  const snap = useSnapshot(store)
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>城市总数:</div>
      <div>{snap.citys.length}</div>
    </div>
  )
})

const SubscribedCityNumber = memo(() => {
  const snap = useSnapshot(store)
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>订阅城市总数:</div>
      <div>{snap.citys.filter(city => city.subscribe).length}</div>
    </div>
  )
})

const SearchCityNumber = memo(() => {
  const snap = useSnapshot(store)
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>搜索城市总数:</div>
      <div>{snap.citys.filter(city => city.name.includes(snap.keyWord)).length}</div>
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