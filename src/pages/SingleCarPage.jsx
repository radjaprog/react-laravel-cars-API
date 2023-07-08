import React, { useEffect, useState } from "react";
import SingleCar from "../components/SingleCar";
import { useParams } from "react-router-dom";
import CarService from "../services/CarService";

export default function SingleCarPage() {
  const [car, setCar] = useState({});
  const { id } = useParams();

  const handleGetSingleCar = async (id) => {
    const response = await CarService.get(id);

    // if (response.status === 200) {
    setCar(response);
    // }
  };

  useEffect(() => {
    handleGetSingleCar(id);
  }, [id]);

  useEffect(() => {
    console.log(car);
  }, [car]);

  return (
    // <>
    //   <h1>
    //     {car.brand} {car.model} {car.year}
    //   </h1>
    // </>
    <SingleCar car={car} />
  );
}
