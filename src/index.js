import css from "./css/style.css";
import refs from "./js/imageRefs.js";
import apiService from "./js/apiService.js";
import imgTemplate from "./template/imageItem.hbs";
import counter from "./js/counter.js";
import debounce from "lodash.debounce";

const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "load more...";
loadMoreBtn.classList.add("isHidden");
refs.ul.after(loadMoreBtn);
console.dir(refs.countSpan);
refs.input.addEventListener(
  "input",
  debounce((event) => {
    refs.ul.innerHTML = "";
    apiService.query = event.target.value;
    apiService.perPage = +refs.countSpan.textContent;
    apiService
      .getImages()
      .then((d) => insertElements(d.hits, imgTemplate, refs.ul));
    refs.input.value = "";
    loadMoreBtn.classList.add("loadMoreBtn");
    loadMoreBtn.classList.remove("isHidden");
  }, 1000),
);
loadMoreBtn.addEventListener("click", () => {
  apiService.setPage();
  apiService
    .getImages()
    .then((d) => insertElements(d.hits, imgTemplate, refs.ul));
});

function insertElements(data, template, place) {
  const element = template(data);
  place.insertAdjacentHTML("beforeend", element);
}
refs.decrementBtn.addEventListener("click", () => {
  counter.decrement(refs.countSpan, +refs.countSpan.textContent);
  return refs.countSpan.textContent;
});
refs.incrementBtn.addEventListener("click", () => {
  counter.increment(refs.countSpan, +refs.countSpan.textContent);
  return refs.countSpan.textContent;
});
