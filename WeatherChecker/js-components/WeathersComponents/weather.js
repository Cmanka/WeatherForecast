import api from "../APIComponents/apiComponent.js";

export class Weather extends api {
  constructor(
    apiKey = "5f9c501f2f0a61d5f9bd9de495d64ba5",
    options = { city: "London" },
    startUrl
  ) {
    super(apiKey, options);
    this.startUrl = startUrl;
    this.url = `https://${startUrl}${options.city}&appid=${apiKey}`;
  }

  setOptions(newOptions = this.options) {
    super.setOptions(newOptions);
    this.url = `https://${this.startUrl}${this.options.city}&appid=${this.apiKey}`;
  }

  updateOptionsByRequestData(data) {
    if (this.constructor.name === "WeatherByGEO") {
      this.options.temperature = Math.round(data.temp - 273) + "&deg;";
      this.options.description = data.weather[0]["description"];
      this.options.time = new Date().toLocaleTimeString();
      this.options.date = new Date(data.dt).toLocaleTimeString();
      return;
    }
    this.options.time = new Date().toLocaleTimeString();
    this.options.date = new Date(data.dt_txt).toLocaleDateString();
    this.options.temperature = Math.round(data.main.temp - 273) + "&deg;";
    this.options.feels_like = Math.round(data.main.feels_like - 273) + "&deg;";
    this.options.min_temp = Math.round(data.main.temp_min - 273) + "&deg;";
    this.options.max_temp = Math.round(data.main.temp_max - 273) + "&deg;";
    this.options.pressure = data.main.pressure;
    this.options.humidity = data.main.humidity;
    this.options.wind = data.wind.speed;
    this.options.description = data.weather[0]["description"];
    this.options.icon = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
  }
}
