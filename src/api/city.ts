import { ICity } from "@/types/city";

export const getAvailableCities = async (cityName: string): Promise<ICity[] | []> => {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)

    return await response.json()
  } catch (e) {
    console.log(e)
    return []
  }
}