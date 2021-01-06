import api from "../APIComponents/apiComponent.js";
import { CurrentWeather } from "../WeathersComponents/currentWeather.js";
import { FiveDaysWeather } from "../WeathersComponents/fiveDaysWeather.js";

export class SelectBlock extends api {
  constructor(apiKey = null, options = { country: "", city: "" }) {
    super(apiKey, options);
    this.url =
      "https://raw.githubusercontent.com/David-Haim-zz/CountriesToCitiesJSON/master/countriesToCities.json";
    this.interestedCountries = ["Belarus", "Russia", "Ukraine"];
    this.weather = new CurrentWeather();
    this.fiveDaysWeather = new FiveDaysWeather();
  }

  async render() {
    const countries = await this.getRequestInformation();
    this.settingSelectComponents(countries);
  }

  settingSelectComponents(countries) {
    const selectCountry = document.querySelector("#country");
    const selectCity = document.querySelector("#city");

    this.addCountriesInSelect(countries, selectCountry);
    this.addEventListenerOnCountrySelect(selectCountry, selectCity, countries);
    this.addEventListenerOnCitySelect(selectCity);
  }

  async getRequestInformation() {
    const data = await this.executeRequest();

    return data;
  }

  settingSelectOption(selectIn, name) {
    const option = document.createElement("option");
    option.innerText = name;
    option.value = name;
    selectIn.appendChild(option);
  }

  addCountriesInSelect(countries, selectCountry) {
    this.interestedCountries.sort().forEach((interesCountry) => {
      for (let country in countries) {
        if (interesCountry === country) {
          this.settingSelectOption(selectCountry, country);
          break;
        }
      }
    });
  }

  addEventListenerOnCountrySelect(selectCountry, selectCity, countries) {
    selectCountry.addEventListener("change", () => {
      this.options.country = selectCountry.value;
      for (let country in countries) {
        if (country === this.options.country) {
          selectCity.innerHTML = "";
          countries[country].sort().forEach((city) => {
            this.settingSelectOption(selectCity, city);
          });
          this.options.city = countries[country][0];
          this.updateDataAndRender();
          break;
        }
      }
    });
  }

  checkRadioButton() {
    return document.querySelector("#days5").checked;
  }

  addEventListenerOnCitySelect(selectCity) {
    selectCity.addEventListener("change", () => {
      this.options.city = selectCity.value;
      this.updateDataAndRender();
    });
  }

  updateDataAndRender() {
    this.weather.setOptions(this.options);
    this.weather.render();
    if (this.checkRadioButton()) {
      this.fiveDaysWeather.setOptions(this.options);
      this.fiveDaysWeather.render();
    }
  }
}
