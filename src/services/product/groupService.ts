import { apiClient } from "@/config/apiClient";

export interface IGroupPayload {
  groupName: string;
  nature: string;
  isPrimary: boolean;
}
export interface IGroup {
  _id: string;
  groupName: string;
  parentGroupID: string | null;
  nature: string;
  isPrimary: boolean;
  description: string;
}

export const createGroup = async (payload: IGroupPayload) => {
  try {
    const response = await apiClient({
      url: "/groups",
      method: "POST",
      data: { ...payload },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGroups = async () => {
  try {
    const response = await apiClient({
      url: "/groups",
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
