import axios, { Axios, AxiosInstance } from "axios";

export class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    });
  }
}
