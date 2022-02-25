import { ICity } from './models';
import { makeCity } from './utils';
import produce from "immer";

export class BehaviorSubject<T> {
  value: T;
  fns: any[] = [];
  constructor(value: T) {
    this.value = value;
  }

  subscribe(fn: (data: T) => void) {
    if (!this.fns.includes(fn)) {
      this.fns.push(fn);
    }
    fn(this.value)
  };

  unSubscribe(fn: any) {
    const index = this.fns.findIndex(target => target === fn)
    if (index >= 0) {
      this.fns.splice(index, 1)
    }
  };

  next(value: T) {
    this.value = value;
    this.fns.forEach(fn => {
      fn(value);
    });
  }
};

const citys$ = new BehaviorSubject([
  makeCity('北京'),
  makeCity('上海'),
  makeCity('深圳'),
  makeCity('广州'),
  makeCity('成都'),
  makeCity('南京'),
  makeCity('西安')
])

const keyWord$ = new BehaviorSubject('');

const filterCitys$ = new BehaviorSubject<ICity[]>([]);

const maxTemperature$ = new BehaviorSubject(0);

const historyMaxTemperature$ = new BehaviorSubject(0);

citys$.subscribe((citys) => {
  const newMax = Math.max(...citys.map(city => Number(city.temperature) || 0));
  maxTemperature$.next(newMax);
})

maxTemperature$.subscribe(max => {
  if (max > historyMaxTemperature$.value) {
    historyMaxTemperature$.next(max)
  }
})

keyWord$.subscribe((keyWord) => {
  filterCitys$.next(citys$.value.filter(city => city.name.includes(keyWord)))
})

citys$.subscribe((citys) => {
  filterCitys$.next(citys.filter(city => city.name.includes(keyWord$.value)))
})

const addCity = (value: ICity) => {
  citys$.next(produce(citys$.value, draft => {
    draft.push(value)
  }))
}

const removeCity = (value: string) => {
  citys$.next(produce(citys$.value, draft => {
    const removeCityIndex = draft.findIndex(target => target.name === value);
    if (removeCityIndex >= 0) {
      draft.splice(removeCityIndex, 1);
    }
  }))
}

const updateCityTemperature = (value: ICity) => {
  citys$.next(produce(citys$.value, draft => {
    draft.forEach(target => {
      if (target.name === value.name) {
        target.temperature = value.temperature;
      }
    });
  }))
}

const updateCityWeather = (value: ICity) => {
  citys$.next(produce(citys$.value, draft => {
    draft.forEach(target => {
      if (target.name === value.name) {
        target.weatherType = value.weatherType;
      }
    });
  }))
}

const toggleSubscribeCity = (value: string) => {
  citys$.next(produce(citys$.value, draft => {
    draft.forEach(target => {
      if (target.name === value) {
        target.subscribe = !target.subscribe
      }
    });
  }))
}

const setKeyWord = (value: string) => {
  keyWord$.next(value);
}


export {
  citys$,
  keyWord$,
  filterCitys$,
  maxTemperature$,
  historyMaxTemperature$,
  addCity,
  removeCity,
  updateCityTemperature,
  updateCityWeather,
  toggleSubscribeCity,
  setKeyWord
}