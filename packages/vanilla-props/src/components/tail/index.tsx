import { memo } from 'react';
import type { ITailProps, ICity } from '../../models';
import S from './index.module.css';

const AllCityNumber = memo((props: { citys: ICity[] }) => {
  const { citys } = props;
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>城市总数:</div>
      <div>{citys.length}</div>
    </div>
  )
})

const SubscribedCityNumber = memo((props: { citys: ICity[] }) => {
  const { citys } = props;
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>订阅城市总数:</div>
      <div>{citys.filter(city => city.subscribe).length}</div>
    </div>
  )
})

const SearchCityNumber = memo((props: { citys: ICity[], keyWord: string }) => {
  const { citys, keyWord } = props;
  return (
    <div className={S['text-warpper']}>
      <div className={S.text}>搜索城市总数:</div>
      <div>{citys.filter(city => city.name.includes(keyWord)).length}</div>
    </div>
  )
})

export const Tail = memo((props: ITailProps) => {
  const { citys, keyWord } = props;
  return (
    <div className={S['tail-warpper']}>
      <AllCityNumber citys={citys} />
      <SubscribedCityNumber citys={citys} />
      <SearchCityNumber citys={citys} keyWord={keyWord} />
    </div>
  )
})