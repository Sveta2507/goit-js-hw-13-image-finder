import css from "./css/style.css";
import refs from "./js/imageRefs.js";
import apiService from "./js/apiService.js";
import imgTemplate from "./template/imageItem.hbs";
import counter from "./js/counter.js";
import debounce from "lodash.debounce";

const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "load more...";
loadMoreBtn.classList.add("loadMoreBtn");

refs.ul.append(loadMoreBtn);

refs.input.addEventListener(
  "input",
  debounce((event) => {
    refs.ul.innerHTML = "";
    let input = event.target.value;
    let perPage = getCountOfElements(
      refs.countSpan,
      refs.decrementBtn,
      refs.incrementBtn,
    );
    apiService
      .getImages(input, perPage)
      .then((d) => insertElements(d.hits, imgTemplate, refs.ul));
    refs.input.value = "";
  }, 1000),
);

function insertElements(data, template, place) {
  const element = template(data);
  place.insertAdjacentHTML("afterbegin", element);
}

function getCountOfElements(elem, decrementBtn, incrementBtn) {
  decrementBtn.addEventListener("click", () => {
    counter.decrement(elem);
  });
  incrementBtn.addEventListener("click", () => {
    counter.increment(elem);
  });

  return counter.count;
}
