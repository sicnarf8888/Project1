// Initial Values
const INITIAL_SEARCH_VALUE = 'date night';
const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector('#searchMovies');
const searchInput = document.querySelector('#movietitle');
const moviesContainer = document.querySelector('#movies-container');
const moviesSearchable = document.querySelector('#movies-searchable');

function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
        <img src="${imageUrl}" alt=" " data-movie-id="${id}">
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}

function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

function createIframe(video) {
    const videoKey = (video && video.key) || 'No key found!!!';
    const iframe = document.createElement('iframe');
    iframe.src = `http://www.youtube.com/embed/${videoKey}`;
    iframe.width = 250;
    iframe.height = 250;
    iframe.allowFullscreen = true;
    return iframe;
}

function insertIframeIntoContent(video, content) {
    const videoContent = document.createElement('div');
    const iframe = createIframe(video);

    videoContent.appendChild(iframe);
    content.appendChild(videoContent);
}


//----------------------------------------------------

/*
function createReviewTemplate(data){
    const content = this.content;
    content.innerHTML = '<p id="content-close">X</p><div id=linkOut><a href = "https://www.themoviedb.org/movie/now-playing?language=en-US" style="font-size:30px;"><h3>Click to Find Out More Where to Watch </h3></a><div>';

    
    for(var i = 0; i<data.results.length; i++){
        var movieDiv = $("<div class='movieReview'>");
        var totalresults = data.results[i];
        var totalAuthor = totalresults.author;
        var totalUrl = totalresults.url;
        var pOne = $("<p>").text("Author: " + totalAuthor);
        var pThree = $("<a>").html("This url:<a href = '"+totalUrl+"'>Link</a>");
    
        movieDiv.append(pOne);
        movieDiv.append(pThree);
    
    // Putting the entire movie above the previous movies
    $(".content-display").append(movieDiv);

};

};
*/
//------------------------------------------------------


function createVideoTemplate(data) {
    const content = this.content;
    content.innerHTML = '<p id="content-close">X</p><button type="button" id="reviewContent" class="btn btn-primary btn-lg"><a id="linkOut" href = "https://www.themoviedb.org/movie/now-playing?language=en-US" style="font-size:30px;"><h4>Click to Find Out More Where to Watch</h4></a></button>';
   
    const videos = data.results || [];

    if (videos.length === 0) {
        content.innerHTML = `
            <p id="content-close">X</p>
            <p>No Trailer found for this video id of ${data.id}</p>
        `;
        return;
    }

    for (let i = 0; i < 1; i++) {
        const video = videos[i];
        insertIframeIntoContent(video, content);
    }
}


function createSectionHeader(title) {
    const header = document.createElement('h2');
    header.innerHTML = title;
    return header;
}


function renderMovies(data) {
    const moviesBlock = generateMoviesBlock(data);
    const header = createSectionHeader(this.title);
    moviesBlock.insertBefore(header, moviesBlock.firstChild);
    moviesContainer.appendChild(moviesBlock);
}

function renderSearchMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    moviesSearchable.appendChild(moviesBlock);
}

function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class', 'section');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) {
            const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;
    
            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }

    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}



// Inserting section before content element
function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const template = `
        <div class="content">
            <p id="content-close">X</p>
        </div>
        
    `  ;

    movieElement.innerHTML = template;
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
}

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value

   if (value) {
    searchMovie(value);
   }
    resetInput();
}



// Click on any movies
// Event Delegation
document.onclick = function (event) {
    
    log('Event: ', event);
    const { tagName, id } = event.target;
    if (tagName.toLowerCase() === 'img') {
      
        const movieId = event.target.dataset.movieId;
        const section = event.target.parentElement.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
       
        getVideosByMovieId(movieId, content);
   
    }


    if (id === 'content-close') {
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }
}






// Initial Values
const MOVIE_DB_API = 'a4b437085eed3fcd667466edf8751b37';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
    return url;
}

/*
function getTopRatedMovies() {
    const url = generateMovieDBUrl(`/movie/top_rated`);
    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    requestMovies(url, render, handleGeneralError);
} */

/*
function getTrendingMovies() {
    const url = generateMovieDBUrl('/trending/movie/day');
    const render = renderMovies.bind({ title: 'Trending Movies' })
    requestMovies(url, render, handleGeneralError);
} */

/*
function getNowPlayingMovies() {
    const url = generateMovieDBUrl('/movie/now_playing');
    const render = renderMovies.bind({ title: 'Now Playing' })
    requestMovies(url, render, handleGeneralError);
} */

/*
function searchUpcomingMovies() {
    const url = generateMovieDBUrl('/movie/upcoming');
    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    requestMovies(url, render, handleGeneralError);
} */

/*
function searchPopularMovie() {
    const url = generateMovieDBUrl('/movie/popular');
    const render = renderMovies.bind({ title: 'Popular Movies' });
    requestMovies(url, render, handleGeneralError);
} */



// Invoke a different function for search movies
function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);
}


function getVideosByMovieId(movieId, content) {
    const url = generateMovieDBUrl(`/movie/${movieId}/videos`);
    const render = createVideoTemplate.bind({ content });
    requestMovies(url, render, handleGeneralError);
}

function getReviewsByMovieId(movieId, content) {
    const url = generateMovieDBUrl(`/movie/${movieId}/reviews`);
    const render = createReviewTemplate.bind({ content });
    requestMovies(url, render, handleGeneralError);
}


//  .on("click") function associated with the clear button
$("#clear-all").on("click", function(){
    location.reload(true);
});




// Initialize the search
searchMovie(INITIAL_SEARCH_VALUE);
/*searchUpcomingMovies();
getTopRatedMovies();
searchPopularMovie();
getTrendingMovies();
getNowPlayingMovies(); */





    

    