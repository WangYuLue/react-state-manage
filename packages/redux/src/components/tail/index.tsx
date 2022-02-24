import { memo } from 'react';
import { useSelector } from 'react-redux';
import type { IData } from '../../models';
import S from './index.module.css';

const AllCityNumber = memo(() => {
  const citys = useSelector((state: IData) => state.citys);
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>城市总数:</div>
      <div>{citys.length}</div>
    </div>
  )
})

const SubscribedCityNumber = memo(() => {
  const citys = useSelector((state: IData) => state.citys);
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>订阅城市总数:</div>
      <div>{citys.filter(city => city.subscribe).length}</div>
    </div>
  )
})

const SearchCityNumber = memo(() => {
  const { citys, keyWord } = useSelector((state: IData) => state);
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>搜索城市总数:</div>
      <div>{citys.filter(city => city.name.includes(keyWord)).length}</div>
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