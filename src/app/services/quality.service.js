import httpService from "../services/http.services";

const qualityEndPoint = "quality/";

const qualityService = {
  update: async (id, content) => {
    const { data } = await httpService.put(
      qualityEndPoint + id + "178",
      content
    );
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(qualityEndPoint + id);
    return data;
  },
  getAll: async () => {
    const { data } = await httpService.get(qualityEndPoint);
    return data;
  },
};
export default qualityService;
