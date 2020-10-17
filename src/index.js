import css from "./css/style.css";
import refs from "./js/imageRefs.js";
import apiService from "./js/apiService.js";
import imgTemplate from "./template/imageItem.hbs";
import counter from "./js/counter.js";
import debounce from "lodash.debounce";

const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "load more...";
loadMoreBtn.classList.add("isHidden");
// refs.ul.insertAdjacentElement("afterend", loadMoreBtn);
refs.ul.after(loadMoreBtn);

refs.input.addEventListener(
  "input",
  debounce((event) => {
    refs.ul.innerHTML = "";
    apiService.query = event.target.value;
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

// function getCountOfElements(elem, decrementBtn, incrementBtn) {
//   decrementBtn.addEventListener("click", () => {
//     counter.decrement(elem);
//   });
//   incrementBtn.addEventListener("click", () => {
//     counter.increment(elem);
//   });

//   return counter.count;
// }
