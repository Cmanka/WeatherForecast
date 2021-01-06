import { Weather } from "./weather.js";

export class CurrentWeather extends Weather {
  constructor(
    apiKey,
    options,
    startUrl = "api.openweathermap.org/data/2.5/weather?q="
  ) {
    super(apiKey, options, startUrl);
  }

  async render() {
    await this.getRequestInformation();

    this.addTitle();
    this.addTemperatureBlock();
    this.addDetailedBlock();
  }

  async getRequestInformation() {
    const data = await this.executeRequest();
    super.updateOptionsByRequestData(data);
  }

  addTitle() {
    const block = document.querySelector(".title_block");
    block.innerHTML = `<p>Current forecast for ${this.options.city} on ${this.options.time}	</p>`;
  }

  addTemperatureBlock() {
    const block = document.querySelector(".temperature_block");
    block.innerHTML = `${this.options.icon}`;
  }

  addDetailedBlock() {
    const block = document.querySelector(".detailed_block");
    block.innerHTML = `
		<p>Temperature: ${this.options.temperature}</p>
		<p>Feels: ${this.options.feels_like}</p>
		<p>Min temperature: ${this.options.min_temp}</p>
		<p>Max temperature: ${this.options.max_temp}</p>
		<p>Pressure: ${this.options.pressure}</p>
		<p>Humidity: ${this.options.humidity}</p>
		<p>Wind: ${this.options.wind}</p>`;
  }
}
