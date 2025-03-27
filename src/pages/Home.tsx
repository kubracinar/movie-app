import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies, fetchMovieDetails } from "../api/api";
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("Pokemon");
  const [year, setYear] = useState("");
  const [type, setType] = useState(""); // movie, series, episode
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const navigate = useNavigate();

  // Filmleri yükle
  useEffect(() => {
    loadMovies();
  }, [searchTerm, year, type, currentPage]);

  // Filmleri almak
  const loadMovies = async () => {
    const data = await fetchMovies(searchTerm, year, type, currentPage);
    if (data.Search) {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
    } else {
      setMovies([]);
      setTotalResults(0);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);

  // Sayfa numaralarını oluştur
  const generatePageNumbers = () => {
    const pages = [];
    let startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    let endPage = startPage + 9;
    endPage = endPage > totalPages ? totalPages : endPage;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Varsayılan poster resmini döndüren fonksiyon
  const getPoster = (poster: string) => {
    if (poster === "N/A" || !poster) {
      return "/default_poster.jpg"; // Varsayılan poster yolu
    }
    return poster;
  };

  // IMDb Rating değerini almak ve kontrol etmek
  const getImdbRating = (rating: string) => {
    return rating ? rating : "N/A";
  };
console.log(movies);
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Film Listesi 🎬</h1>

      {/* Arama ve Filtreleme */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Film adı ara..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Sayfa yenileme
            }}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Yıl girin"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setCurrentPage(1); // Sayfa yenileme
            }}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCurrentPage(1); // Sayfa yenileme
            }}
          >
            <option value="">Tümü</option>
            <option value="movie">Filmler</option>
            <option value="series">Diziler</option>
            <option value="episode">Dizi Bölümleri</option>
          </select>
        </div>
      </div>

      {/* Film Listesi Tablosu */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th scope="col">Poster</th>
              <th scope="col">Film Adı</th>
              <th scope="col">Yayın Yılı</th>
              <th scope="col">IMDb Puanı</th>
              <th scope="col">IMDb ID</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr
                key={movie.imdbID}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <img
                    src={getPoster(movie.Poster)} // Varsayılan resim kontrolü burada yapılır
                    alt={movie.Title}
                    className="img-fluid"
                    style={{ width: "50px", height: "75px" }}
                  />
                </td>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                {/* IMDb Puanı */}
                <td>{getImdbRating(movie.imdbRating)}</td>

                <td>{movie.imdbID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  {/* Sayfalama (Bootstrap Icons ile) */}
  <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {/* Önceki Sayfa */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>

          {/* Geri 10 Sayfa */}
          <li className={`page-item ${currentPage <= 10 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 10)}
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
          </li>

          {generatePageNumbers().map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            </li>
          ))}

          {/* İleri 10 Sayfa */}
          <li className={`page-item ${currentPage + 10 > totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 10)}
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </li>

          {/* Sonraki Sayfa */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Home;
