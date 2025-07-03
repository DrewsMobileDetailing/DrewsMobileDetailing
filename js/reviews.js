fetch("../data/reviews.json")
  .then((r) => r.json())
  .then(({ reviews }) => buildReviews(reviews))
  .catch((err) => console.error("Failed to load reviews:", err));

function buildReviews(reviews) {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;

  reviews.forEach(({ name, avatar, rating, text }) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm lift-on-hover review-card">
        ${
          avatar
            ? `<img src="${avatar}" class="card-img-top" alt="${name} photo">`
            : ""
        }
        <div class="card-body">
          <h6 class="fw-bold mb-1">${name}</h6>
          <p class="mb-2">${"⭐".repeat(rating)}</p>
          <p class="small">${text}</p>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });
}
