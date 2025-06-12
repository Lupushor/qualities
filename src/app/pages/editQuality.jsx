import React from "react";
import { useParams } from "react-router-dom";

import QualityForm from "../components/ui/quallityForm";
import { useQualities } from "../hooks/useQualities";
import { useHistory } from "react-router-dom";

const EditQualityPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const { getQuality, updateQuality } = useQualities();
  const quality = getQuality(id);

  console.log("quality", quality);

  const handleSubmit = (data) => {
    updateQuality(data).then((data) => {
      if (data) {
        history.push("/");
      }
    });
  };

  return (
    <>
      <h1>Edit Quality Page</h1>{" "}
      <QualityForm data={quality} onSubmit={handleSubmit} />
    </>
  );
};

export default EditQualityPage;
