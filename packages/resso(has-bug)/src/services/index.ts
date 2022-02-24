import { sleep } from '../utils'

/**
 * 模拟获得城市的天气
 * 
 * @param name 城市名
 */
async function getCityWeather(name: string): Promise<string> {
  console.log(`getCityWeather city name => ${name}`);
  const weatherType = ['晴朗', '多云', '阴', '小雨', '暴雨', '台风'];

  // 响应的时间在 1 - 3 秒之间
  await sleep(1000 + Math.floor(Math.random() * 1000) * 2)

  return weatherType[Math.floor(Math.random() * weatherType.length)]
}

/**
 * 模拟活动城市的温度
 * 
 * @param name 城市名
 */
async function getCityTemperature(name: string): Promise<string> {
  console.log(`getCityTemperature city name => ${name}`);
  const scope = [-20, 40];
  // 响应的时间在 1 - 2 秒之间
  await sleep(1000 + Math.floor(Math.random() * 1000) * 1)

  return (Math.random() * (scope[1] - scope[0]) + scope[0]).toFixed(1)
}

export {
  getCityWeather,
  getCityTemperature
}