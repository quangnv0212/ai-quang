import http from "@/lib/http";

const modelApiRequest = {
  getModels: async () => {
    try {
      return http.get(`/services/app/ModelAppSerivce/GetModels`);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default modelApiRequest;
