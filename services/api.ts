export const TMDB_CONFIG = {
    BASE_URL : 'https://api.themoviedb.org/3',
    API_KEY : process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers : {
        'accept': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async({ query, page = 1 }: { query: string, page?: number }) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data.results as Movie[];
};



export const fetchMovieDetails = async(movieId : string) : Promise<MovieDetails> =>{
    try{
    const respoonse =  await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
        method: 'GET',
        headers : TMDB_CONFIG.headers,

    });
    if(!respoonse.ok) throw new Error('Failed to fetch movie details');
    const data = await respoonse.json();
    return data;
    }catch(error){
        console.log(error);
        throw error;
    }
}



// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjM3YTVhNGUwY2MyMDFkY2U3OGY0MmZjMzZmNDI4ZCIsIm5iZiI6MTc0NDY1Mzc2Ny4yNTQwMDAyLCJzdWIiOiI2N2ZkNGRjNzlkMWY3NzhhYjg5OTMwMDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lZMorseTUNuBd9rHrRziig5h1mbF1M5_P6AgSoE391I'
//     }
// };
//
// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error(err));