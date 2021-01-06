import { FiveDaysWeather } from "../WeathersComponents/fiveDaysWeather.js";
import { WeatherByGEO } from "../WeathersComponents/weatherByGeoLocation.js";

export class FormBlock {
  constructor() {
    this.fiveDaysWeather = new FiveDaysWeather();
    this.weatherByGEO = new WeatherByGEO();
  }

  render() {
    this.settingGeoButton();
    this.settingFiveDaysWeatherButton();
  }

  settingGeoButton() {
    const button = document.querySelector("#geolocation");
    this.addEventOnGeoButton(button);
  }

  addEventOnGeoButton(button) {
    button.addEventListener("click", () => {
      this.weatherByGEO.setOptions();
      this.weatherByGEO.render();
    });
  }

  settingFiveDaysWeatherButton() {
    const button = document.querySelector("#days5");
    this.addEventOnFiveDaysWeatherButton(button);
  }

  addEventOnFiveDaysWeatherButton(button) {
    button.addEventListener("click", () => {
      const selectCountry = document.querySelector("#country");
      const selectCity = document.querySelector("#city");
      const newOptions = { city: selectCity.value };
      if (selectCountry.value !== "Select country" && button.checked) {
        this.fiveDaysWeather.setOptions(newOptions);
        this.fiveDaysWeather.render();
      }
    });
  }
}
