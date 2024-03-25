import axiosInstance from "./AxiosInterceptor";

const baseURL = "http://localhost:8080/api/lists/";

const fetchLists = async (userId) => {
  try {
    const response = await axiosInstance.get(`${baseURL}get_lists/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
};

const saveList = async (userId, listData) => {
  try {
    const response = await axiosInstance.post(`${baseURL}save_list/${userId}`, listData);
    return response.data;
  } catch (error) {
    console.error("Error saving list:", error);
    throw error;
  }
};

const editList = async (updatedList, userId) => {
  try {
    const response = await axiosInstance.put(`${baseURL}update_list/${userId}`, updatedList);
    return response.data;
  } catch (error) {
    console.error("Error saving list:", error);
    throw error;
  }
};

const deleteList = async (listId) => {
  try {
    const response = await axiosInstance.delete(`${baseURL}delete_list/${listId}`);
    return response.data;
  } catch (error) {
    console.error("Error saving list:", error);
    throw error;
  }
};

export { fetchLists, saveList, deleteList, editList };
