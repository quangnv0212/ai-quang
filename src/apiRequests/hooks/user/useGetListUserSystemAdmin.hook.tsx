import userApiRequest from "@/apiRequests/user";

export const useGetListUserSystemAdmin = () => {
  async function request(
    params: {
      keyword?: string;
      isActive?: boolean;
      SkipCount: number;
      MaxResultCount: number;
    },
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    setLoading(true);
    const response = await userApiRequest.getListUserSystemAdmin(params);
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
