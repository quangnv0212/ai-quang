import modelApiRequest from "@/apiRequests/model";
import { ModelBodyType } from "@/schemaValidations/model.schema";

export const useCreateModel = () => {
  async function request(
    params: ModelBodyType,
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    try {
      setLoading(true);
      const response = await modelApiRequest.createModel({
        ...params,
      });
      if (response.status === 200) {
        onSuccess(response.data);
        setLoading(false);
      } else {
      }
    } catch (error) {
      onError(error);
      setLoading(false);
    }
  }
  return [request];
};
