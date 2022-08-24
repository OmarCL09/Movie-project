let historyArr = [];
let page = 1;

previewSearchButton.addEventListener("click", () => {
  if (historyArr.length > 1) {
    location.hash = historyArr[historyArr.length - 2];
    historyArr.splice(-2,2);
  } else {
    historyArr.pop();
    location.hash = "#home";
  }
});

titleOfTheHeader.addEventListener('click', () => {
  location.hash = '#home';
});

searchMovieButton.addEventListener('click', () => {
  location.hash = `#search=${inputToSearchMovie.value}`;
  previewSearchButton.classList.remove('inactive');
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
    historyArr.push(location.hash);
    previewSearchButton.classList.add('inactive');
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
    historyArr.push(location.hash);
    previewSearchButton.classList.remove('inactive');
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
    historyArr.push(location.hash);
    previewSearchButton.classList.add('inactive');
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
    historyArr.push(location.hash);
    previewSearchButton.classList.add('inactive');
  } else {
    homePage();
    previewSearchButton.classList.add('inactive');
  }

  function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo (0,currentScroll - (currentScroll/5));
    }
  };
  smoothscroll();
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
  mainLikedContainer.classList.remove('inactive');
  getCategoriesHome();
  getTrendingMoviesHome();
  getLikedMovies();
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
  mainLikedContainer.classList.add('inactive');
  const [_, categoryData] = location.hash.split('='); //['#category', 'id-name']
  const [categoryId, categoryName] = categoryData.split('-');
  titleOfTheCategory.innerHTML = categoryName;

  getMoviesByCategory(categoryId);
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
  mainLikedContainer.classList.add('inactive');
  const [_, movieId] = location.hash.split('='); //['#movie', 'id-movie']
  getMovieById(movieId);
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
  mainLikedContainer.classList.add('inactive');

  const [_, query] = location.hash.split('='); //['#search', 'query']
  getMoviesByQuery(query);
  titleOfSearchedMovie.innerHTML = `Because you searched '${query}'`;
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
  mainLikedContainer.classList.add('inactive');
  getAllTrendingMovies();
}