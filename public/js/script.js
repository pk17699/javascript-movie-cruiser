function getMovies() {
  console.log("Fetch All Movies");
  fetch("http://localhost:3000/movies")
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((movies) => {
      let tbody = document
        .getElementById("moviesList")
        .getElementsByTagName("li")[0];
      let tbodyhtml = "";
      movies.forEach((movie) => {
    tbodyhtml += `<li>
		<div class="row">
		<div class="col-12 col-md-6">
		<img src="${movie.poster}"  class="img-response img-thumbnail"/>
		</div>
		<div class="col-12 col-md-6">
		<div><h4> ${movie.title} </h4></div>
		<div class="desc"> ${movie.overview} </div>
		<div><button onclick="getMovieById(${movie.id})" type="button" 
		class="btn btn-outline-success btn-sm">Add to favourite</button></div>
		</div>
		</div>
		</li>`;
      });
      tbody.innerHTML = tbodyhtml;
    })
    .catch((error) => {
      console.log(error);
    });
}
let movieId;
let movieName;
let movieOverview;
let moviePoster;

function getMovieById(id) {
  fetch(`http://localhost:3000/movies/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((movie) => {
      (movieId = movie.id), (movieName = movie.title), (movieOverview = movie.overview), (moviePoster = movie.poster);

      addFavourite();
    });
}

function addFavourite() {
  const newfav = {
    id: movieId,
    title: movieName,
    overview: movieOverview,
	  poster: moviePoster
  };
  console.log(JSON.stringify(newfav));
  //post
  fetch("http://localhost:3000/favourites", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newfav),
  })
    .then((response) => {
      if (response.status === 201) {
        console.log("data added ");
        getFavourites();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getFavourites() {
  console.log("Fetch All Movies");
  fetch("http://localhost:3000/favourites")
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((favourites) => {
      let tbody = document
        .getElementById("favouritesList")
        .getElementsByTagName("li")[0];
      let tbodyhtml1 = "";
      favourites.forEach((favourite) => {
        // eslint-disable-next-line max-len
        tbodyhtml1 += `<li id=${favourite.id}>
        <div class="row">
        <div class="col-12 col-md-6">
        <img src="${favourite.poster}"  class="img-response img-thumbnail"/>
        </div>
        <div class="col-12 col-md-6">
        <div><h4> ${favourite.title} </h4></div>
        <div class="desc"> ${favourite.overview} </div>
        <div><button  class="btn btn-outline-danger btn-sm" 
        onclick="deleteFavMovieById(${favourite.id})">Delete</button>
        </div>
        </div>
        </div>
        </li>`;
      });
      tbody.innerHTML = tbodyhtml1;
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteFavMovieById(id) {
  console.log("delete faviourite");
  fetch(`http://localhost:3000/favourites/${id}`, { method: "DELETE" })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(() => {
      document.getElementById(id).remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

getMovies();
getMovieById();
getFavourites();
module.exports = {
  getMovies,
  getFavourites,
  addFavourite,
  getMovieById,
  // delete,
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution