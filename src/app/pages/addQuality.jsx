import React from "react";
import QualityForm from "../components/ui/quallityForm";
import { useQualities } from "../hooks/useQualities";
import { useHistory } from "react-router-dom";

const AddQualityPage = () => {
  const history = useHistory();

  const { addQuality } = useQualities();

  const handleSubmit = (data) => {
    // console.log(data);
    addQuality(data).then((data) => {
      if (data) {
        history.push("/");
      }
    });
  };

  return (
    <>
      <h1>Add Quality</h1>
      <QualityForm onSubmit={handleSubmit} />
    </>
  );
};

export default AddQualityPage;
