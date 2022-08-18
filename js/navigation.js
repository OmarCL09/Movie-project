searchMovieButton.addEventListener('click', () => {
    location.hash = '#search=';
});
seeMoreTrendingMovies.addEventListener('click', () => {
    location.hash = '#trends';
});
backButtonHome.addEventListener('click', () => {
    location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
}

function homePage() {
  console.log('Home!!');
  trendingMoviesHome.classList.remove('inactive');
  categoriesHome.classList.remove('inactive');
  selectedMovieDescription.classList.add('inactive');
  moreTrendingMovies.classList.add('inactive');
  principalBanner.classList.remove('inactive');
  backButtonHome.classList.add('inactive');
  titleOfTheMainMovie.classList.add('inactive');
  movieBannerComplete.classList.add('inactive');
  containerOfTheMovieDescription.classList.add('inactive');
  descriptionOfTheMovie.classList.add('inactive');
  containerOfTheSearchedMovie.classList.add('inactive');
  containerOfTheCategoryMovies.classList.add('inactive');
  getCategoriesHome();
  getTrendingMoviesHome();
}

function categoriesPage() {
  console.log('categories!!');
  trendingMoviesHome.classList.add('inactive');
  categoriesHome.classList.add('inactive');
  selectedMovieDescription.classList.add('inactive');
  moreTrendingMovies.classList.add('inactive');
  principalBanner.classList.add('inactive');
  backButtonHome.classList.remove('inactive');
  movieBannerComplete.classList.add('inactive');
  titleOfTheMainMovie.classList.add('inactive');
  containerOfTheMovieDescription.classList.add('inactive');
  descriptionOfTheMovie.classList.add('inactive');
  containerOfTheSearchedMovie.classList.add('inactive');
  containerOfTheCategoryMovies.classList.remove('inactive');
}

function movieDetailsPage() {
  console.log('Movie!!');
  trendingMoviesHome.classList.add('inactive');
  categoriesHome.classList.add('inactive');
  selectedMovieDescription.classList.add('inactive');
  moreTrendingMovies.classList.add('inactive');
  principalBanner.classList.add('inactive');
  backButtonHome.classList.remove('inactive');
  movieBannerComplete.classList.remove('inactive');
  titleOfTheMainMovie.classList.remove('inactive');
  containerOfTheMovieDescription.classList.remove('inactive');
  descriptionOfTheMovie.classList.remove('inactive');
  containerOfTheSearchedMovie.classList.add('inactive');
  containerOfTheCategoryMovies.classList.add('inactive');
}

function searchPage() {
  console.log('Search!!');
  trendingMoviesHome.classList.add('inactive');
  categoriesHome.classList.add('inactive');
  selectedMovieDescription.classList.add('inactive');
  moreTrendingMovies.classList.add('inactive');
  principalBanner.classList.add('inactive');
  backButtonHome.classList.remove('inactive');
  movieBannerComplete.classList.add('inactive');
  titleOfTheMainMovie.classList.add('inactive');
  containerOfTheMovieDescription.classList.add('inactive');
  descriptionOfTheMovie.classList.add('inactive');
  containerOfTheSearchedMovie.classList.remove('inactive');
  containerOfTheCategoryMovies.classList.add('inactive');
}

function trendsPage() {
  console.log('TRENDS!!');
  trendingMoviesHome.classList.add('inactive');
  categoriesHome.classList.add('inactive');
  selectedMovieDescription.classList.add('inactive');
  moreTrendingMovies.classList.remove('inactive');
  principalBanner.classList.add('inactive');
  backButtonHome.classList.remove('inactive');
  titleOfTheMainMovie.classList.add('inactive');
  movieBannerComplete.classList.add('inactive');
  containerOfTheMovieDescription.classList.add('inactive');
  descriptionOfTheMovie.classList.add('inactive');
  containerOfTheSearchedMovie.classList.add('inactive');
  containerOfTheCategoryMovies.classList.add('inactive');
}