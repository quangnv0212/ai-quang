import modelApiRequest from "@/apiRequests/model";

export const useGetListModel = () => {
  async function request(
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    setLoading(true);
    const response = await modelApiRequest.getModels();
    if (response?.status === 200) {
      onSuccess(response.data);
      setLoading(false);
    } else {
      onError(response);
      setLoading(false);
    }
  }

  return [request];
};
