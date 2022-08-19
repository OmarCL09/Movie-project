const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});

//DRY Functions to put objects
function putMovies(movies, container){
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('trending-card');
        movieDiv.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('trending-movie-image');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w400' + movie.poster_path);
        movieDiv.appendChild(movieImg);
        container.appendChild(movieDiv);
    })
}
function putCategories(categories, container){
    container.innerHTML = '';
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryName = document.createElement('h4');
        categoryName.textContent = category.name;
        categoryName.setAttribute('id', 'id' + category.id);
        categoryDiv.appendChild(categoryName);
        container.appendChild(categoryDiv);
    })
}

async function getTrendingMoviesHome(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    putMovies(movies, moviesHomeContainer);
}

async function getAllTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    putMovies(movies, ContainerAllTrending);
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;
    putMovies(movies, ContainerOfTheMovieByCategory);
}

async function getMoviesByQuery(query){
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });
    const movies = data.results;
    putMovies(movies, ContainerOfMoviesByQuery);
}

async function getCategoriesHome(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    putCategories(categories, categoriesHomeContainer);
}

async function getMovieById(id){
    const { data: movie } = await api('movie/' + id);
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
    movieBannerComplete.style.backgroundImage = `
    linear-gradient(rgb(46 46 46 / 53%), rgb(0 0 0 / 93%)),
    url(${movieImgUrl})`;
    movieTitle.textContent = movie.title;
    movieDescription.textContent = movie.overview;
    movieScore.textContent = movie.vote_average;
    putCategories(movie.genres, recommendedCategories);
}