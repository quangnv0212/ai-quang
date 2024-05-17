import modelApiRequest from "@/apiRequests/model";

export const useCheckStatusModel = () => {
  async function request(
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    setLoading(true);
    const response = await modelApiRequest.checkStatusModel();
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
