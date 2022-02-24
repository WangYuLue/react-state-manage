import type { ICity } from '../models';

async function sleep(timer: number): Promise<void> {
  return new Promise(res => {
    setTimeout(() => {
      res(undefined)
    }, timer)
  })
}

function makeCity(name: string): ICity {
  return {
    name,
    subscribe: true
  }
}

//传入一个正在执行的promise
function getPromiseWithAbort<T>(p: Promise<T>) {
  let obj: {
    abort: (msg?: string) => void,
    promise: Promise<T>
  } = {
  };
  //内部定一个新的promise，用来终止执行
  let p1 = new Promise<T>(function (resolve, reject) {
    obj.abort = reject;
  });
  obj.promise = Promise.race([p, p1]);
  return obj;
}

export {
  makeCity,
  sleep,
  getPromiseWithAbort
}