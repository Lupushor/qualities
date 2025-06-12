import React, { useContext, useEffect, useRef, useState } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

// const qualities = [{ _id: "123456", name: "Quality" }];
export const QualitiesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const prevState = useRef();
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        errorCatcher(error);
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
      errorCatcher(error);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prev) => [...prev, content]);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const deleteQuality = async (id) => {
    prevState.current = qualities;
    try {
      const { content } = await qualityService.delete(id);
      setQualities((prev) => {
        return prev.filter((quality) => quality._id !== content._id);
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  /*
 !== оставляет все элементы, КРОМЕ того, который мы удаляем
 === оставляет ТОЛЬКО тот элемент, который мы удаляем, а остальные убирает
 */

  function errorCatcher(error) {
    const { message, code } = error.response.data;
    setErrors({ message, code });
  }

  useEffect(() => {
    if (errors !== null) {
      toast(errors);
      setErrors(null);
    }
  }, [errors]);

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        updateQuality,
        addQuality,
        deleteQuality,
        isLoading,
      }}
    >
      {isLoading ? <h1>Loading...</h1> : children}
      {errors && <div className="alert alert-danger">{errors.message}</div>}
    </QualitiesContext.Provider>
  );
};
