export default {
  count: 3,

  decrement(place) {
    if (this.count > 3) {
      this.count -= 1;
      place.textContent = this.count;
    }
  },
  increment(place) {
    if (this.count < 200) {
      this.count += 1;
      place.textContent = this.count;
    }
  },
};
