import http from "@/lib/http";
import {
  ModelBodyType,
  UploadImageModelBodyType,
} from "@/schemaValidations/model.schema";

const modelApiRequest = {
  getModels: async () => {
    try {
      return http.get(`/services/app/ModelAppSerivce/GetModels`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  createModel: async (body: ModelBodyType) => {
    try {
      return http.post(`/services/app/ModelAppSerivce/CreateModel`, {
        ...body,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  useTrainingModel: async () => {
    try {
      return http.post(`/services/app/ModelAppSerivce/Training`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  pushlishProject: async () => {
    try {
      return http.post(`/services/app/ModelAppSerivce/PushlishProject`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  checkStatusModel: async () => {
    try {
      return http.post(`/services/app/ModelAppSerivce/CheckTrainingStatus`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  uploadImageModel: async (body: any) => {
    try {
      return http.post(`/services/app/ModelAppSerivce/AddImageToModel`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  predictImage: async (body: any) => {
    try {
      return http.post(`/services/app/ModelAppSerivce/Predict`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default modelApiRequest;
