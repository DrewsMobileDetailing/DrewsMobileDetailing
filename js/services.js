// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Fetch pricing data
fetch("../data/services.json")
  .then((r) => r.json())
  .then(({ services }) => buildPricing(services))
  .catch((err) => console.error("Failed to load services:", err));

function buildPricing(services) {
  const grid = document.getElementById("pricingGrid");
  if (!grid) return;

  services.forEach(({ name, price, prices, includes }) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";

    let bodyHtml = "";

    // Multi-vehicle price list
    if (Array.isArray(prices)) {
      bodyHtml = `<ul class="list-unstyled small mb-3">
        ${prices
          .map(
            ({ vehicle, price }) => `
            <li class="d-flex justify-content-between">
              <span>${vehicle}</span><span>$${price}</span>
            </li>`
          )
          .join("")}
      </ul>`;
    }

    // Single numeric price
    else if (typeof price === "number") {
      bodyHtml = `<p class="display-6 fw-bold mb-3">$${price}</p>`;
    }

    // Fallback for strings like "Call for more information"
    else if (typeof price === "string") {
      bodyHtml = `<p class="fw-bold text-primary mb-3">${price}</p>`;
    }

    // Include service features if available
    if (Array.isArray(includes)) {
      bodyHtml += `<ul class="text-start small ps-3 mb-0">
        ${includes.map((item) => `<li>${item}</li>`).join("")}
      </ul>`;
    }

    col.innerHTML = `
      <div class="card h-100 shadow-sm lift-on-hover text-center">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          ${bodyHtml}
        </div>
      </div>`;

    grid.appendChild(col);
  });
}
