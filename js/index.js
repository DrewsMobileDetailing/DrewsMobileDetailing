document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("data/cars.json").then((r) => r.json()),
    fetch("data/reviews.json").then((r) => r.json()),
    fetch("data/services.json").then((r) => r.json()),
  ])
    .then(([carData, reviewData, serviceData]) => {
      const cars = carData.cars;
      buildGallery(cars, 3);
      buildBanner(cars, '.scroll-divider[data-banner="1"]', 6);
      buildBanner(cars, '.scroll-divider[data-banner="2"]', 6);
      buildReviews(reviewData.reviews, 4);
      buildPricing(serviceData.services);
    })
    .catch((err) => console.error("JSON fetch error:", err));
});

/* ---------- Helpers ---------- */
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/* ---------- Gallery ---------- */
function buildGallery(cars, limit = 3) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  shuffle(cars)
    .slice(0, limit)
    .forEach(({ src, alt = "Vehicle detail photo" }) => {
      grid.insertAdjacentHTML(
        "beforeend",
        `
      <div class="col-12 mb-3">
        <div class="ratio ratio-16x9 lift-on-hover">
          <img src="${src}" alt="${alt}" class="gallery-thumb rounded" loading="lazy" />
        </div>
      </div>
    `
      );
    });
}

/* ---------- Reviews ---------- */
function buildReviews(reviews, limit = 4) {
  const reviewRow = document.getElementById("reviewsGrid");
  if (!reviewRow) return;

  shuffle(reviews)
    .slice(0, limit)
    .forEach(({ name, avatar, rating, text }) => {
      reviewRow.insertAdjacentHTML(
        "beforeend",
        `
      <div class="col-12 col-sm-6 mb-4">
        <div class="card h-100 shadow-sm lift-on-hover">
          ${
            avatar
              ? `<img src="${avatar}" class="card-img-top" alt="${name} photo" />`
              : ""
          }
          <div class="card-body">
            <h6 class="fw-bold mb-1">${name}</h6>
            <p class="mb-2">${"⭐".repeat(rating)}</p>
            <p class="small">${text}</p>
          </div>
        </div>
      </div>
    `
      );
    });
}

/* ---------- Pricing ---------- */
function buildPricing(services) {
  const grid = document.getElementById("pricingGrid");
  if (!grid) return;

  services.forEach(({ name, price, prices }) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";

    const bodyHtml = Array.isArray(prices)
      ? `<ul class="list-unstyled small mb-0">${prices
          .map(
            (p) =>
              `<li class="d-flex justify-content-between"><span>${p.vehicle}</span><span>$${p.price}</span></li>`
          )
          .join("")}</ul>`
      : `<p class="display-6 fw-bold mb-0">$${price}</p>`;

    col.innerHTML = `
      <div class="card h-100 shadow-sm text-center lift-on-hover">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          ${bodyHtml}
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

/* ---------- Banner ---------- */
function buildBanner(cars, selector, limit = 6) {
  const div = document.querySelector(selector);
  if (!div) return;

  const images = shuffle(cars)
    .slice(0, limit)
    .flatMap(({ src, alt = "" }) => [
      `<img src="${src}" alt="${alt}">`,
      `<img src="${src}" alt="${alt}">`,
    ]) // duplicate
    .join("");

  div.innerHTML = `<div class="scroll-track">${images}</div>`;
}
