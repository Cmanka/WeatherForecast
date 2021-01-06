export default class API {
  constructor(apiKey, options) {
    this.apiKey = apiKey;
    this.options = options;
  }

  setOptions(newOptions) {
    this.options = newOptions;
  }
  getOptions() {
    return this.options;
  }
  setApiKey(newApiKey) {
    this.api = newApiKey;
  }
  getApiKey() {
    return this.apiKey;
  }

  async executeRequest(url = this.url) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error("error", error);
    }
  }
}
