import modelApiRequest from "@/apiRequests/model";

export const useUploadImageModel = () => {
  async function request(
    body: any,
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    try {
      setLoading(true);
      const response = await modelApiRequest.uploadImageModel(body);
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
