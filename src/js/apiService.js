export default {
  // тут будут свойства и методы
  baseUrl: `https://pixabay.com/api/`,
  apiKey: `18083964-743e1c4dbd8df155933fdd882`,
  imageType: `photo`,
  orientation: `horizontal`,
  page: 1,

  getImages(query, perPage) {
    let params = `?image_type=${this.imageType}&orientation=${this.orientation}&q=${query}&page=${this.page}&per_page=${this.perPage}&key=${this.apiKey}`;
    let url = `${this.baseUrl}${params}`;

    return fetch(url).then((response) => response.json());
  },
};
