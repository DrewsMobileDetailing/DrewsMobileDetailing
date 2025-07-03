// Fetch pricing data
fetch("../data/services.json")
  .then((r) => r.json())
  .then(({ services }) => buildPricing(services))
  .catch((err) => console.error("Failed to load services:", err));

function buildPricing(services) {
  const grid = document.getElementById("pricingGrid");
  if (!grid) return;

  services.forEach(({ name, price, prices }) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";

    const bodyHtml = Array.isArray(prices)
      ? `<ul class="list-unstyled small mb-0">
           ${prices
             .map(
               ({ vehicle, price }) => `
             <li class="d-flex justify-content-between">
               <span>${vehicle}</span><span>$${price}</span>
             </li>`
             )
             .join("")}
         </ul>`
      : `<p class="display-6 fw-bold mb-0">$${price}</p>`;

    col.innerHTML = `
      <div class="card h-100 shadow-sm lift-on-hover text-center">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          ${bodyHtml}
        </div>
      </div>
    `;

    grid.appendChild(col);
  });
}
