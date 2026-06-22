const API_KEY='3a8b2e92e9ba8bd7b2e2557c6619c87a';
const BASE_URL='https://api.themoviedb.org/3';

export const getPopularMovies = async()=>{
    const response= await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data= await response.json();
    return data.results
}

export const searchMovies = async(query)=>{
    const response= await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data= await response.json();
    return data.results
}