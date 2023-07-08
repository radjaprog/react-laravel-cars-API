import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CarService from "../services/CarService";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorMessage } from "../components/ErrorMessage";

const YEARS = Array(2018 - 1990 + 1)
  .fill(1990)
  .map((el, index) => el + index);

const ENGINES = ["diesel", "petrol", "electric", "hybrid"];

const getDefaultCarValues = () => ({
  brand: "",
  model: "",
  year: YEARS[0],
  is_automatic: false,
  engine: "",
  number_of_doors: "",
  max_speed: "",
});

function AddCar() {
  const history = useHistory();
  const { id } = useParams();

  const [car, setCar] = useState(getDefaultCarValues());
  const [errors, setErrors] = useState({});

  const getCar = async (id) => {
    const data = await CarService.get(id);
    setCar(data);
  };

  useEffect(() => {
    if (id) {
      getCar(id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await CarService.edit(car);
    } else {
      const response = await CarService.add(car);

      if (response.status === 422) {
        setErrors(response.data.errors);
        return;
      }
    }
    history.push("/cars");
  };

  const handleReset = () => {
    setCar(getDefaultCarValues());
  };

  const handlePreview = () => {
    alert(`
      Brand: ${car.brand} \n
      Model: ${car.model} \n
      Year: ${car.year} \n
      Is Automatic: ${car.is_automatic ? "Yes" : "No"} \n
      Engine: ${car.engine} \n
      Number of doors: ${car.number_of_doors} \n
      Max speed: ${car.max_speed} \n
    `);
  };

  const getLabel = () => {
    return id ? "Edit" : "Add" + "car";
  };

  const renderErrors = (fieldKey) => {
    if (!errors[fieldKey]) {
      return;
    }

    return errors[fieldKey].map((error) => {
      return <ErrorMessage message={error} />;
    });
  };

  return (
    <div>
      <h2> {getLabel()} </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 200,
          marginLeft: 15,
        }}
      >
        <input
          type="text"
          value={car.brand}
          placeholder="Brand"
          onChange={({ target }) => setCar({ ...car, brand: target.value })}
        />
        {renderErrors("brand")}
        <input
          type="text"
          value={car.model}
          placeholder="Model"
          onChange={({ target }) => setCar({ ...car, model: target.value })}
        />
        {renderErrors("model")}
        <select
          style={{ width: 200 }}
          onChange={({ target }) =>
            setCar({ ...car, year: Number(target.value) })
          }
          value={car.year}
        >
          {YEARS.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <span>
          <label>Is automatic?</label>
          <input
            type="checkbox"
            checked={car.is_automatic}
            onChange={({ target }) => {
              setCar({ ...car, is_automatic: target.checked });
            }}
          />
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4>Pick engine:</h4>
          {ENGINES.map((engine, index) => (
            <span key={index}>
              <input
                type="radio"
                name="engine"
                checked={engine === car.engine}
                value={engine}
                onChange={() => setCar({ ...car, engine })}
              />
              {engine.toUpperCase()}
            </span>
          ))}
        </div>
        <input
          type="number"
          value={car.number_of_doors}
          placeholder="Number of door"
          onChange={({ target }) =>
            setCar({ ...car, number_of_doors: target.value })
          }
        />
        {renderErrors("number_of_doors")}
        <input
          type="number"
          value={car.max_speed}
          placeholder="Max speed"
          onChange={({ target }) => setCar({ ...car, max_speed: target.value })}
        />
        {renderErrors("max_speed")}

        <button>{getLabel()}</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="button" onClick={handlePreview}>
          Preview
        </button>
      </form>
    </div>
  );
}

export default AddCar;
