// Converts Weather from Kelvin to Fahrenheit

export function kelvinToFahrenheit(K) {
  return Math.round(((K - 273.15) * 9) / 5 + 32)
}

export default {}
