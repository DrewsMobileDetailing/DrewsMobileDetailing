const BATCH_SIZE = 8;
let allCars = [];
let currentIndex = 0;

const grid = document.getElementById("galleryGrid");
const modal = new bootstrap.Modal(document.getElementById("imageModal"));
const modalImg = document.getElementById("modalImg");

// Fetch and initialize gallery
fetch("../data/cars.json")
  .then((res) => res.json())
  .then((data) => {
    allCars = data.cars;
    renderNextBatch();
    createLoadMoreButton();
  })
  .catch((err) => console.error("Failed to load gallery data:", err));

function renderNextBatch() {
  const nextCars = allCars.slice(currentIndex, currentIndex + BATCH_SIZE);

  nextCars.forEach(({ src, alt = "Gallery photo" }) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="ratio ratio-4x3 lift-on-hover mb-2">
        <img src="${src}" class="gallery-thumb rounded cursor-pointer"
             loading="lazy" width="400" height="300" alt="${alt}">
      </div>`;

    grid.appendChild(col);
  });

  currentIndex += BATCH_SIZE;

  if (currentIndex >= allCars.length) {
    document.getElementById("loadMoreBtn")?.remove();
  }
}

function createLoadMoreButton() {
  const container = document.createElement("div");
  container.className = "text-center mt-4";

  const btn = document.createElement("button");
  btn.id = "loadMoreBtn";
  btn.className = "btn btn-primary";
  btn.textContent = "Load More";

  btn.addEventListener("click", renderNextBatch);
  container.appendChild(btn);

  grid?.parentElement?.appendChild(container);
}

grid?.addEventListener("click", (e) => {
  if (!e.target.matches("img.gallery-thumb")) return;
  modalImg.src = e.target.src;
  modal.show();
});
