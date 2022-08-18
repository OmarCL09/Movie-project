const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});

async function getTrendingMoviesHome(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    moviesHomeContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('trending-card');
        const movieImg = document.createElement('img');
        movieImg.classList.add('trending-movie-image');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w400' + movie.poster_path);
        movieDiv.appendChild(movieImg);
        moviesHomeContainer.appendChild(movieDiv);
    })
}

async function getCategoriesHome(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    categoriesHomeContainer.innerHTML = '';
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        const categoryName = document.createElement('h4');
        categoryName.textContent = category.name;
        categoryName.setAttribute('id', 'id' + category.id);
        categoryDiv.appendChild(categoryName);
        categoriesHomeContainer.appendChild(categoryDiv);
    })
}