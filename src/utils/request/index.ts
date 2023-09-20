import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import { apiUrl } from "@/config/baseHost.ts";

export interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  contentType: string;
}

export interface Result<T> {
  code: number;
  message: string;
  result: T;
}

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  instance: AxiosInstance;
  baseConfig: AxiosRequestConfig = { baseURL: apiUrl, timeout: 20000 };

  constructor() {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig));

    this.instance.interceptors.request.use(
      async (reqConfig: InternalAxiosRequestConfig) => {
        // 一般会请求拦截里面加token，用于后端的验证
        return reqConfig;
      },
      async (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return await Promise.reject(err);
      },
    );

    this.instance.interceptors.response.use(
      async ({ data }: AxiosResponse) => {
        return data;
      },
      async (err: any) => {
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        try {
          return await Promise.reject(err.response);
        } catch {}
      },
    );
  }

  // 定义请求方法
  public async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.instance.request(config);
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return await this.instance.get(url, { ...config });
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & { contentType?: string },
  ): Promise<AxiosResponse<Result<T>>> {
    const { contentType = "json", ...restConfig } = config ?? {};
    const _data = contentType === "formData" ? qs.stringify(data) : data;
    return await this.instance.post(url, _data, {
      ...restConfig,
      headers: { contentType: "application/x-www-form-urlencoded" },
    });
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return await this.instance.put(url, data, config);
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return await this.instance.delete(url, config);
  }
}

// 默认导出Request实例
export default new Request();
