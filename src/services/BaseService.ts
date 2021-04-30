import { axiosInstance } from "@/Axios";

export class BaseService {
  private static instance: BaseService;
  private static axiosInstance: any;

  constructor(axiosInstance: any) {
    BaseService.axiosInstance = axiosInstance;
  }

  public static getInstance(): BaseService {
    if (this.instance === undefined) {
      this.instance = new BaseService(axiosInstance);
    }
    return this.instance;
  }

  public async get(path: string) {
    return await axiosInstance.get(path).then((response) => response.data);
  }

  public async post(path: string, payload) {
    return await axiosInstance.post(path, payload).then((response) => response);
  }
}