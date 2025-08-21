import axios, { AxiosError } from "axios";
import { Log, LogFilters } from "../types/log";

const API = axios.create({
  baseURL: "http://localhost:5000", // Query Service
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log("🚀 Making API request:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log("✅ API response received:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error("❌ API response error:", {
      message: error.message,
      code: error.code,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      } : "No response received",
      request: error.request ? {
        url: error.request.responseURL || "No URL",
        method: error.request.method || "No method"
      } : "No request made"
    });
    return Promise.reject(error);
  }
);

export const fetchLogs = async (filters: LogFilters): Promise<{ logs: Log[] }> => {
  try {
    console.log("📊 Fetching logs with filters:", filters);
    
    // Test if the service is reachable first
    console.log("🔍 Testing connection to query service...");
    
    const res = await API.get("/logs", { params: filters });
    console.log("✅ Successfully fetched logs:", res.data);
    return res.data;
  } catch (error: unknown) {
    // Import AxiosError from axios
    const err = error as AxiosError;
    console.error("❌ fetchLogs error details:", {
      error,
      isNetworkError: err?.code === 'NETWORK_ERROR',
      isTimeoutError: err?.code === 'ECONNABORTED',
      isServerError: err?.response?.status && err?.response?.status >= 500,
      isClientError: err?.response?.status && err?.response?.status >= 400 && err?.response?.status < 500,
      message: err?.message,
      stack: err?.stack
    });
    throw error;
  }
};
