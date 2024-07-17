import React, { useState, useEffect } from "react";
import University from "../../models/University";
import './Listing.css';
import Search from "../common/Search/Search";
import { Link } from "react-router-dom";
import SortingToggle from "../common/Sorting/Sorting";
import "../../App.css";
import ListingController from "./ListingController";

const Listing: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ListingController.fetchUniversities();
        setUniversities(data);
      } catch (error) {
        setError("Failed to load universities. Please try again later.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = universities.filter((university) =>
      university.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUniversities(filtered);
  }, [searchTerm, universities]);

  const handleDelete = (name: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this university? This action cannot be reverted."
    );
    if (confirmDelete) {
      const updatedUniversities = universities.filter(
        (university) => university.name !== name
      );
      setUniversities(updatedUniversities);
      localStorage.setItem("universities", JSON.stringify(updatedUniversities));
    }
  };

  const handleSort = (value: string) => {
    const sorted =
      value === ""
        ? universities
        : [...filteredUniversities].sort((a, b) => {
            return value === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });

    setSortOrder(value);
    setFilteredUniversities(sorted);
  };

  return (
    <div className="listing-page">
      <header className="header">
        <h1>University Explorer</h1>
        <div className="filters">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SortingToggle onChange={handleSort} />
        </div>
      </header>
      {error && <div className="error-message">{error}</div>}
      <div className="university-grid">
        {filteredUniversities.map((university) => (
          <div key={university.name} className="university-card">
            <div className="card-content">
              <h2>{university.name}</h2>
              <p className="country">{university.country}</p>
              <div className="card-actions">
                <Link
                  to={`/university/${encodeURIComponent(university.name)}`}
                  className="action-button view-button"
                  title="Explore"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(university.name)}
                  title="Remove"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;