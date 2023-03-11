// load function
const loadData = async (searchText, limit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  const response = await fetch(url);
  const data = await response.json();
  displayPhone(data.data, limit);
};

// function for data show
const displayPhone = (data, limit) => {
  const notFoundMessage = document.getElementById("no-found-message");
  if (data.length === 0) {
    notFoundMessage.classList.remove("d-none");
  } else {
    notFoundMessage.classList.add("d-none");
  }

  //limit data proces
  const showButtonElement = document.getElementById("show-all");
  console.log(limit);
  if (limit && data.length > 10) {
    data = data.slice(0, 10);
    showButtonElement.classList.remove("d-none");
  } else {
    showButtonElement.classList.add("d-none");
  }

  // stop loader
  showLoader(false);

  const phoneContainerElement = document.getElementById("phones-container");
  phoneContainerElement.innerHTML = ``;

  data.forEach((element) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("col");

    cardElement.innerHTML = `
    <div class="card p-4">
      <img src="${element.image}" class="card-img-top" alt="${element.brand}" />
      <div class="card-body">
        <h5 class="card-title">${element.phone_name}</h5>
        <p class="card-text">
          This is a longer card with supporting text below as a natural lead-in
        </p>
        <button onClick="config('${element.slug}')" type="button" class="btn btn-primary w-100"
         data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
        configaration
       </button>

      </div>
    </div>
          `;

    phoneContainerElement.appendChild(cardElement);
  });
};
//  search process
const searchProcess = (limit) => {
  // start loader
  showLoader(true);

  const searchFieldEleent = document.getElementById("search-field");

  const searchText = searchFieldEleent.value;
  loadData(searchText, limit);
};

// function for search
document.getElementById("btn-search").addEventListener("click", () => {
  searchProcess(10);
});

//function show all phone
document.getElementById("btn-show-all").addEventListener("click", () => {
  searchProcess();
  const searchFieldEleent = document.getElementById("search-field");
  searchFieldEleent.value = "";
});

// input field event handeling
document.getElementById("search-field").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchProcess(10);
  }
});

//show configaration
function config(id) {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  loadPhoneConfig(url);
}
//load phone config
const loadPhoneConfig = async (url) => {
  const response = await fetch(url);
  const config = await response.json();
  setConfig(config.data);
};

// show data in to model
const setConfig = (data) => {
  document.getElementById("phoneDetailModalLabel").innerText = data.name;
  document.getElementById("phone-details").innerHTML = `
      <p><span class="fw-bold">Release Date:</span> ${data.releaseDate}</p>
      <p><span class="fw-bold">Storage:</span> ${data.mainFeatures.storage}</p>
      <p><span class="fw-bold">Memory:</span> ${data.mainFeatures.memory}</p>
      <p><span class="fw-bold">Sensors:</span> ${
        data.mainFeatures.sensors
          ? data.mainFeatures.sensors.join(", ")
          : "No sensore implemented"
      }</p>
      <p><span class="fw-bold">Display Size:</span> ${
        data.mainFeatures.displaySize
      }</p>
        `;
};

// loader function
const showLoader = (boolean) => {
  const loaderElement = document.getElementById("loader");

  if (boolean) {
    loaderElement.classList.remove("d-none");
  } else {
    loaderElement.classList.add("d-none");
  }
};
