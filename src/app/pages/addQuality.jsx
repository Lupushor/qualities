import React from "react";
import QualityForm from "../components/ui/quallityForm";
const AddQualityPage = () => {
  const handleSubmit = (data) => {
    console.log(data);
    // updadeQuality(data);
  };

  return (
    <>
      <h1>Add Quality</h1>
      <QualityForm onSubmit={handleSubmit} />
    </>
  );
};

export default AddQualityPage;
