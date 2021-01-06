import { Weather } from "./weather.js";

export class FiveDaysWeather extends Weather {
  constructor(
    apiKey,
    options,
    startUrl = "api.openweathermap.org/data/2.5/forecast?q="
  ) {
    super(apiKey, options, startUrl);
  }

  async render() {
    const weatherList = await this.getRequestInformation();
    this.addElementsInContent(weatherList);
  }

  addElementsInContent(list) {
    const parent = document.querySelector(".main_information");
    const block = document.createElement("div");
    block.classList.add("main_info_panel");
    parent.innerHTML = "";

    this.addElements(list, block);
    parent.appendChild(block);
  }

  async getRequestInformation() {
    const data = await this.executeRequest();

    const weatherList = data.list.filter((element, index, arr) => {
      if (index % 8 === 0) return arr[index];
    });

    return weatherList;
  }

  addTopBlock(block) {
    block.innerHTML += `
		<div class="top_weather_block">
		<div class="text_block">
			<div>
				<h2>${this.options.city}</h2>
				<p>${this.options.description}</p>
			</div>
		</div>
		${this.options.icon}
		</div>`;
  }

  addCenterBlock(block) {
    block.innerHTML += ` 
		<div class="center_weather_block">
		<div class="center_inner_block">
			<div class="weather_temperature_block">
				${this.options.temperature}
			</div>
			<div class="weather_detaile_block">
				<table>
					<tr>
						<th colspan="2">Details</th>
					</tr>
					<tr>
						<td class="weather-right__item">Feels like</td>
						<td class="weather-right__item weather-right__feels">
							${this.options.feels_like}
						</td>
					</tr>
					<tr>
						<td class="weather-right__item">Wind</td>
						<td
							class="weather-right__item weather-right__wind-speed"
						>
						${this.options.wind}
						</td>
					</tr>
					<tr>
						<td class="weather-right__item">Humidity</td>
						<td class="weather-right__item weather-right__humidity">
						${this.options.humidity}
						</td>
					</tr>
					<tr>
						<td class="weather-right__item">Pressure</td>
						<td class="weather-right__item weather-right__pressure">
							${this.options.pressure}
						</td>
					</tr>
				</table>
			</div>
		</div>
		</div>
		`;
  }

  addBottomBlock(block) {
    block.innerHTML += `
		<div class="bottom_weather_block">
		<p>Weather forecast on ${this.options.date}</p>
		</div>`;
  }

  getContent() {
    const weatherContent = document.createElement("div");
    weatherContent.classList.add("weather_content");
    this.addTopBlock(weatherContent);
    this.addCenterBlock(weatherContent);
    this.addBottomBlock(weatherContent);

    return weatherContent;
  }

  addElements(list, block) {
    list.forEach((weather) => {
      super.updateOptionsByRequestData(weather);
      const weatherContent = this.getContent();
      block.appendChild(weatherContent);
    });
  }
}
