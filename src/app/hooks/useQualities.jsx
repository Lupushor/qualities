import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

// const qualities = [{ _id: "123456", name: "Quality" }];
export const QualitiesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        const { message, code } = error.response.data;
        setErrors({ message, code });
      }
    };
    getQualities();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities((prev) =>
        prev.map((quality) => (quality._id === id ? content : quality))
      );
      return content;
    } catch (error) {
      const { message, code } = error.response.data;
      setErrors({ message, code });
    }
  };

  return (
    <QualitiesContext.Provider value={{ qualities, getQuality, updateQuality }}>
      {isLoading ? <h1>Loading...</h1> : children}
      {errors && <div className="alert alert-danger">{errors.message}</div>}
    </QualitiesContext.Provider>
  );
};
