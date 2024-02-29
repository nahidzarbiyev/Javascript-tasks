const movieID = new URLSearchParams(location.search).get("id");
const detailPage = document.querySelector(".detailPage");
let api = "https://api.tvmaze.com/shows";
let title = document.querySelector("title");
let details;
fetch(api + "/" + movieID)
  .then((res) => res.json())
  .then((data) => {
    renderDetails(data);
  });

function renderDetails(data) {
  detailPage.innerHTML = "";
  title.innerHTML = data.name;
  detailPage.innerHTML = `
   
      <div class="  container-xl">
        <div class="  d-flex gap-5">
          <div style="height: 90%; width: 40%">
            <img
              style="height: 100%; width: 100%"
              src="${data.image.original}"
              alt=""
            />
          </div>
          <div
            class="content pt-5 pe-5 d-flex gap-4 flex-column justify-content-start align-items-start"
            style="flex: 1"
          >
            <h1 class="fs-1 fw-semibold">${data.name}</h1>
            <p>
            ${data.summary}
            </p>
            <ul
              style="list-style-type: disc; list-style-position: inside"
              class="d-flex flex-column gap-2"
            >
            <li><span>IMDP point</span> ${data.rating.average}</li>
              <li><span class="fw-semibold">Language</span> ${data.language}</li>
              <li><span class="fw-semibold">Genre</span> ${data.genres[0]}</li>
              <li><span class="fw-semibold">Premiered</span> ${data.premiered}</li>
              <li><span class="fw-semibold">Ended</span> ${data.ended}</li>
            </ul>
            <div class="card-body d-flex gap-2 align-items-start">
              <a    href="${data.officialSite}" class="btn btn-success">Go To Website</a>
              <a
                href="index.html"
                class="btn btn-primary"
                  
              >
                Go Back
              </a>
            </div>
          </div>
        </div>
      </div>
   
      `;
}
