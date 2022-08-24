//Data
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});

function likedMoviesList(){
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if(item) {
        movies = item;
    } else{
        movies = {};
    }
    return movies;
}

function likeMovie(movie){
    const likedMovies = likedMoviesList();
    if(likedMovies[movie.id]){
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
    if(location.hash == ''){
        homePage();
    }
}



//DRY Functions to put objects
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    } )
});

function putMovies(
    movies,
    container,
    {
      lazyLoading = false,
      clean = true,
    } = {},
)   {
    if (clean){
        container.innerHTML = '';
    }
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('trending-card');
        const movieImg = document.createElement('img');
        movieImg.classList.add('trending-movie-image');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoading ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w400' + movie.poster_path);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', '../assets/notfound.webp');
        });
        movieImg.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');



        likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');


        movieBtn.addEventListener('click', () =>{ 
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
            getLikedMovies();
        })

        if(lazyLoading){
        lazyLoader.observe(movieImg);
        }
        movieDiv.appendChild(movieImg);
        movieDiv.appendChild(movieBtn);
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
    putMovies(movies, moviesHomeContainer, true);
}

async function getAllTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    putMovies(movies, ContainerAllTrending, {lazyLoading: true, clean: false});
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;
    putMovies(movies, ContainerOfTheMovieByCategory, true);
}

async function getMoviesByQuery(query){
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });
    const movies = data.results;
    putMovies(movies, ContainerOfMoviesByQuery, true);
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
    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;
    putMovies(relatedMovies, relatedMoviesContainer, true);
}

function getLikedMovies() {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    putMovies(moviesArray, containerOfLikedMovies, { lazyLoading: true, clean: true});
}
