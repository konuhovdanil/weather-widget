import { ICity } from "@/types/city";
import { IWeather } from "@/types/weather";

export const getCurrentWeatherByPosition = async (lat: number, lon: number): Promise<IWeather | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ lat }&lon=${ lon }&appid=${ import.meta.env.VITE_WEATHER_API_KEY }`
    )

    return await response.json()
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getCurrentWeatherByCities = async (cities: ICity[]): Promise<IWeather[] | []> => {
  try {
    return await Promise.all(cities.map(async city => {
      const { name, country, state } = city
      let url = `${ name },${ country }`

      if (state && !name.includes(state)) url += `,${ state }`

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ url }&units=metric&appid=${ import.meta.env.VITE_WEATHER_API_KEY }`
      )

      return await response.json()
    }))
  } catch (e) {
    console.log(e)
    return []
  }
}