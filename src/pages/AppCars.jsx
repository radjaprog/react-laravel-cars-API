import React, { useState, useEffect } from "react";
import SingleCar from "../components/SingleCar";
import { Link } from "react-router-dom";
import CarService from "../services/CarService";
import { useHistory } from "react-router-dom";

export default function AppCars() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const history = useHistory();

  const fetchCars = async (page) => {
    const { data } = await CarService.getAll(page);
    setCars(data.data);
    setLastPage(data.last_page);
  };

  useEffect(() => {
    fetchCars(1);
  }, []);

  const handleEdit = (id) => {
    history.push("/edit/" + id);
  };

  const handleDelete = async (id) => {
    const deleted = await CarService.delete(id);

    if (deleted > 0) {
      const newCars = cars.filter((car) => car.id !== id);
      setCars(newCars);
    } else {
      alert("Doslo je do greske");
    }
  };

  const previousPage = () => {
    const previousPage = currentPage - 1;
    fetchCars(previousPage);
    setCurrentPage(previousPage);
  };

  const nextPage = () => {
    const nextPage = currentPage + 1;
    fetchCars(nextPage);
    setCurrentPage(nextPage);
  };

  const handleViewDetails = (id) => {
    history.push("/car/" + id);
  };

  return (
    <div>
      <h2>Cars</h2>
      <ul
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        {cars.map((car) => (
          <SingleCar
            key={car.id}
            car={car}
            onEditCallback={handleEdit}
            onDeleteCallback={handleDelete}
            onViewDetails={handleViewDetails}
          />
        ))}
      </ul>
      <div style={{ display: " flex" }}>
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === lastPage}>
          Next
        </button>
      </div>
    </div>
  );
}
