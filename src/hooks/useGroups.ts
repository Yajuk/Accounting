import * as GroupService from "@/services/product/groupService";
import { useEffect, useState } from "react";

const useGroups = () => {
  const [groupsOptions, setGroupsOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const getGroups = async () => {
    try {
      const response = await GroupService.getGroups();
      if (response.success) {
        const groups = response.data.data;
        const groupOptions = groups.map((group: GroupService.IGroup) => ({
          label: group.groupName,
          value: group._id,
        }));
        setGroupsOptions(groupOptions);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return { groupsOptions, getGroups };
};

export default useGroups;
