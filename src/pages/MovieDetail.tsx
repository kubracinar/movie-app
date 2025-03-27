import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../api/api";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const navigate = useNavigate();

  // Varsayılan poster resmini döndüren fonksiyon
  const getPoster = (poster: string) => {
    return poster === "N/A" || !poster ? "/default_poster.jpg" : poster;
  };

  useEffect(() => {
    const loadMovieDetails = async () => {
      const data = await fetchMovieDetails(id!);
      setMovie(data);
    };

    loadMovieDetails();
  }, [id]);

  if (!movie) return <p className="text-center mt-4">Yükleniyor...</p>;

  // Belirli alanları kontrol edip dinamik olarak göstermek için yardımcı fonksiyon
  const renderDetail = (label: string, value: string) => {
    if (!value || value === "N/A") return null;
    return (
      <p>
        <strong>{label}:</strong> {value}
      </p>
    );
  };

  return (
    <div className="container movie-details-container">
      <button
        onClick={() => navigate("/")}
        className="btn btn-outline-primary movie-details-back-btn mb-3"
      >
        <i className="bi bi-arrow-left-circle"></i> Geri Dön
      </button>

      <div className="card shadow-lg p-3">
        <div className="row g-4">
          {/* Poster Alanı */}
          <div className="col-md-4 text-center">
            <img
              src={getPoster(movie.Poster)}
              alt={movie.Title}
              className="img-fluid rounded movie-details-poster"
            />
          </div>

          {/* Film Detayları */}
          <div className="col-md-8">
            <h1 className="fw-bold">{movie.Title}</h1>
            {renderDetail("Yıl", movie.Year)}
            {renderDetail("IMDb ID", movie.imdbID)}

            <hr />

            <div className="row">
              <div className="col-md-6">
                {renderDetail("Yayın Tarihi", movie.Released)}
                {renderDetail("Süre", movie.Runtime)}
                {renderDetail("Tür", movie.Genre)}
                {renderDetail("Yönetmen", movie.Director)}
                {renderDetail("Yazar", movie.Writer)}
              </div>

              <div className="col-md-6">
                {renderDetail("Oyuncular", movie.Actors)}
                {renderDetail("Ülke", movie.Country)}
                {renderDetail("Dil", movie.Language)}
                {renderDetail("Ödüller", movie.Awards)}
                {renderDetail("Sezon Sayısı", movie.totalSeasons)}
              </div>
            </div>

            <hr />

            {/* IMDb ve Metascore Alanı */}
            <div className="row text-center">
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="col">
                  <span className="badge bg-warning text-dark fs-5">
                    IMDb: {movie.imdbRating} ⭐
                  </span>
                </div>
              )}
              {movie.Metascore && movie.Metascore !== "N/A" && (
                <div className="col">
                  <span className="badge bg-secondary fs-5">
                    Metascore: {movie.Metascore}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
