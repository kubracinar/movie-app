import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <Link to={`/movie/${movie.imdbID}`}>Detayları Gör</Link>
    </div>
  );
};

export default MovieCard;
