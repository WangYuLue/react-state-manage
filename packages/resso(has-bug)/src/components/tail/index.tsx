import { memo } from 'react';
import { store } from '../../store';
import S from './index.module.css';

const AllCityNumber = memo(() => {
  console.log('AllCityNumber render');

  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>城市总数:</div>
      <div>{store.citys.length}</div>
    </div>
  )
})

const SubscribedCityNumber = memo(() => {
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>订阅城市总数:</div>
      <div>{store.citys.filter(city => city.subscribe).length}</div>
    </div>
  )
})

const SearchCityNumber = memo(() => {
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>搜索城市总数:</div>
      <div>{store.citys.filter(city => city.name.includes(store.keyWord)).length}</div>
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