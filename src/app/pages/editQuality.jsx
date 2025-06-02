import React, { useEffect, useState } from "react";
import EditForm from "../components/ui/editForm";
import { useParams } from "react-router-dom";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

// import config from "../config.json";

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const [errors, setErrors] = useState(null);
  const { id } = useParams();
  // const qualityEndPoint = `quality/${id}`;

  const updadeQuality = async (content) => {
    try {
      const data = await qualityService.update(id, content);
      return data.content;
    } catch (error) {
      const { message, code } = error.response.data;
      setErrors({ message, code });
      toast.error(message);
    }
  };

  const getQuality = async (id) => {
    try {
      const data = await qualityService.get(id);
      console.log(data);
      return data.content;
    } catch (error) {
      console.log("Expected error", error);
    }
  };

  const handleSubmit = (data) => {
    updadeQuality(data);
  };

  useEffect(() => {
    getQuality(id).then((data) => setQuality(data));
    // const fetchData = async () => {
    //   const { data } = await httpService.get(qualityEndPoint);
    //   setQuality(data.content);
    // };
    // fetchData();
  }, [id]);

  return (
    <>
      <h1>Edit Quality Page</h1>{" "}
      {quality !== null ? (
        <EditForm data={quality} onSubmit={handleSubmit} />
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default EditQualityPage;
