import React from "react";
import { useHistory } from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import { useQualities } from "../hooks/useQualities";
// import qualityService from "../services/quality.service";

const QualitiesListPage = () => {
  // const [qualities, setQualitites] = useState([]);
  const history = useHistory();

  const { qualities } = useQualities(); // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await qualityService.fetchAll();
  //     setQualitites(data.content);
  //   };
  //   fetchData();
  // }, []);

  const handleEdit = (param) => {
    console.log(param);
    history.push(`/edit/${param}`);
  };
  const handleDelete = (param) => {
    console.log(param);
  };
  return (
    <>
      <h1>Qualitites List Page</h1>
      <QualitiesTable
        onDelete={handleDelete}
        onEdit={handleEdit}
        data={qualities}
      />
    </>
  );
};

export default QualitiesListPage;
