import { Weather } from "./weather.js";

export class WeatherByGEO extends Weather {
  constructor(
    apiKey,
    options,
    startUrl = "api.openweathermap.org/data/2.5/onecall?"
  ) {
    super(apiKey, options, startUrl);
    this.setGeoLocation();
  }

  async render() {
    const weatherList = await this.getRequestInformation();
    this.addElementsInContent(weatherList);
  }

  addElementsInContent(list) {
    const parent = document.querySelector(".main_information");
    const block = document.createElement("div");
    block.classList.add("main_info_panel_to_geo");
    parent.innerHTML = "";
    this.addElements(list, block);
    parent.appendChild(block);
  }

  async getRequestInformation() {
    const data = await this.executeRequest();

    const weatherArrOn24Hours = data.hourly.filter(
      (element, index) => index <= 23
    );
    this.options.city = data.timezone;

    return weatherArrOn24Hours;
  }

  setOptions(newOptions) {
    super.setOptions(newOptions);
    this.url = `https://${this.startUrl}lat=${this.options.latitude}&lon=${this.options.longitude}&exclude=daily&appid=${this.apiKey}`;
  }

  setGeoLocation() {
    const success = (pos) => {
      var crd = pos.coords;
      this.options.latitude = crd.latitude;
      this.options.longitude = crd.longitude;
    };
    const error = (err) => {
      alert(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }

  addTopBlock(block) {
    block.innerHTML += `
		<div class="top_weather_block_geo">
        <div class="inner_block">
          <h2 class="widget-right__title">${this.options.city}</h2>
          <p class="widget-right__description">${this.options.description}</p>
        </div>
		</div>
		`;
  }

  addCenterBlock(block) {
    block.innerHTML += `
		<div class="center_weather_block_geo">${this.options.temperature}</div>
		`;
  }

  addBottomBlock(block) {
    block.innerHTML += `
		<div class="bottom_weather_block_geo">
                <p>${this.options.date}</p>
              </div>`;
  }

  getContent() {
    const weatherContent = document.createElement("div");
    weatherContent.classList.add("weather_content_geo");

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
