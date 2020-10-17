export default {
  // тут будут свойства и методы
  baseUrl: `https://pixabay.com/api/`,
  apiKey: `18083964-743e1c4dbd8df155933fdd882`,
  imageType: `photo`,
  orientation: `horizontal`,
  q: "",
  page: 1,
  per_page: 3,

  getImages() {
    let params = `?image_type=${this.imageType}&orientation=${this.orientation}&q=${this.q}&page=${this.page}&per_page=${this.per_page}&key=${this.apiKey}`;
    let url = `${this.baseUrl}${params}`;

    return fetch(url).then((response) => response.json());
  },
  get perPage() {
    return this.per_page;
  },
  set perPage(val) {
    return (this.per_page = val);
  },
  get query() {
    return this.q;
  },
  set query(val) {
    return (this.q = val);
  },
  setPage() {
    return (this.page += 1);
  },
};
