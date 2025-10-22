"use client"

import { useEffect, useState } from "react"

interface LocationWeatherData {
  country: string
  isDarkMode: boolean
  isLoading: boolean
  weather?: {
    condition: string
    isNight: boolean
    temperature: number
  }
}

export function useLocationAndWeather(): LocationWeatherData {
  const [data, setData] = useState<LocationWeatherData>({
    country: "Pakistan",
    isDarkMode: false,
    isLoading: true,
  })

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        // Get user's location
        const geoResponse = await fetch("https://ipapi.co/json/")
        const geoData = await geoResponse.json()
        const country = geoData.country_name || "Pakistan"
        const latitude = geoData.latitude
        const longitude = geoData.longitude

        // Get weather data
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,is_day,temperature_2m&timezone=auto`,
        )
        const weatherData = await weatherResponse.json()
        const current = weatherData.current
        const isNight = current.is_day === 0
        const weatherCode = current.weather_code

        // Determine weather condition
        let condition = "clear"
        if (weatherCode >= 80 && weatherCode <= 82) condition = "rain"
        else if (weatherCode >= 71 && weatherCode <= 77) condition = "snow"
        else if (weatherCode >= 61 && weatherCode <= 67) condition = "rain"
        else if (weatherCode >= 51 && weatherCode <= 55) condition = "drizzle"
        else if (weatherCode >= 80 && weatherCode <= 82) condition = "rain"
        else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) condition = "thunderstorm"
        else if (weatherCode >= 1 && weatherCode <= 3) condition = "cloudy"

        setData({
          country,
          isDarkMode: isNight,
          isLoading: false,
          weather: {
            condition,
            isNight,
            temperature: current.temperature_2m,
          },
        })
      } catch (error) {
        console.error("Error fetching location/weather:", error)
        // Fallback to default
        const now = new Date()
        const hour = now.getHours()
        const isNight = hour < 6 || hour > 18

        setData({
          country: "Pakistan",
          isDarkMode: isNight,
          isLoading: false,
        })
      }
    }

    fetchLocationAndWeather()
  }, [])

  return data
}
