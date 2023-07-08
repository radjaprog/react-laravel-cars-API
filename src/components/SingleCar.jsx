import React, { useState } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";

function SingleCar({ car, onEditCallback, onDeleteCallback, onViewDetails }) {
  const {
    id,
    brand,
    model,
    year,
    is_automatic,
    engine,
    number_of_doors,
    max_speed,
  } = car;
  console.log(car);

  const [showDialog, setShowDialog] = useState(false);

  const handleEdit = () => {
    onEditCallback(id);
  };

  const handleDelete = () => {
    onDeleteCallback(id);
  };

  const handleViewDetails = () => {
    onViewDetails(id);
  };

  return (
    <>
      <li
        style={{
          border: "1px, solid black",
          marginBottom: "5px",
          padding: "5",
          display: "flex",
          flexDirection: "column",
          maxWidth: 200,
          border: "1px solid black",
          padding: 10,
        }}
      >
        <p>Brand: {brand} </p>
        <p>Model: {model} </p>
        <p>Year: {year} </p>
        <p>Automatic: {is_automatic ? "Yes" : "No"}</p>
        <p>Engine: {engine}</p>
        <p>Number of doors: {number_of_doors}</p>
        <p>Max Speed: {max_speed} </p>

        {onDeleteCallback && (
          <button className="mb" onClick={handleEdit}>
            Edit
          </button>
        )}
        {onEditCallback && (
          <button className="mb" onClick={() => setShowDialog(true)}>
            Delete
          </button>
        )}
        {onViewDetails && (
          <button onClick={handleViewDetails}>View details</button>
        )}
      </li>

      {showDialog && (
        <ConfirmationDialog
          title="Delete car?"
          message="This action is irreversible"
          onSubmit={() => handleDelete(id)}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </>
  );
}

export default SingleCar;
