// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=829f9b56&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       // console.log(movies);

//       movies.forEach((movie) => {
//         cards += showCards(movie);
//       });
//       $(".movie-container").html(cards);

//       // ketika tombol detail diklik
//       $(".modal-detail-button").on("click", function () {
//         //   console.log($(this).data("imdbid"));

//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=829f9b56&i=" +
//             $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = showMovieDetail(m);

//             $(".modal-body").html(movieDetail);
//           },
//           error: function (e) {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// USING FETCH API
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=829f9b56&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";
      movies.forEach((movie) => (cards += showCards(movie)));
      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      // ketika tombol detail diklik
      const modalDetailButton = document.querySelectorAll(
        ".modal-detail-button"
      );
      modalDetailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          // console.log(this);
          const imdbid = this.dataset.imdbid;
          // console.log(imdbid);

          fetch("http://www.omdbapi.com/?apikey=829f9b56&i=" + imdbid)
            .then((response) => response.json())
            .then((movie) => {
              // console.log(movie);
              const movieDetail = showMovieDetail(movie);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});

function showCards(movie) {
  return `<div class="col-md-4 my-3">
                    <div class="card">
                        <img src="${movie.Poster}" class="card-img-top" />
                        <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
      data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Detail</a>
                        </div>
                    </div>
                </div>`;
}

function showMovieDetail(movie) {
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${movie.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${movie.Title} (${movie.Year})</h4></li>
                    <li class="list-group-item">
                      <strong>Director : </strong> ${movie.Director}
                    </li>
                    <li class="list-group-item">
                      <strong>Actors : </strong> ${movie.Actors}
                    </li>
                    <li class="list-group-item">
                      <strong>Writer : </strong> ${movie.Writer}
                    </li>
                    <li class="list-group-item">
                      <strong>Plot : </strong> ${movie.Plot}
                    </li>
                  </ul>
                </div>
              </div>
            </div>`;
}
