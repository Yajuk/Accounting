import { ILookupParams } from "@/utils/types/productTypes";
import { apiClient } from "@/config/apiClient";
import { SuccessResponse } from "@/utils/error/types";

export const lookups = async (
  params?: ILookupParams,
): Promise<SuccessResponse<any>> => {
  const model = params?.model;
  const url = model
    ? `/lookups/${model.charAt(0).toUpperCase()}${model.slice(1)}`
    : "/lookups";

  return apiClient({
    url,
    method: "GET",
    params,
  });
};
