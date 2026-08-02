import { api } from "./axios";

import type { ApiResponse } from "../types/ApiResponse";
import type { Dashboard } from "../types/dashboard/Dashboard";

export const dashboardApi = {
  async getDashboard() {
    const { data } =
      await api.get<ApiResponse<Dashboard>>(
        "/dashboard",
      );

    return data.data;
  },
};