import axiosInstance from "./AxiosInterceptor";

const baseURL = "http://localhost:8080/api/task/";

const fetchTasks = async (listId) => {
  try {
    const response = await axiosInstance.get(`${baseURL}get_tasks/${listId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
};

const saveTasks = async (listId, listData) => {
  try {
    const response = await axiosInstance.post(`${baseURL}save_task/${listId}`, listData);
    return response.data;
  } catch (error) {
    console.error("Error saving list:", error);
    throw error;
  }
};

const editTasks = async (listId, updatedTask) => {
  try {
    const response = await axiosInstance.put(`${baseURL}update_task/${listId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error saving list:", error);
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await axiosInstance.delete(`${baseURL}delete_task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error saving list:", error);
    throw error;
  }
};

export { fetchTasks, saveTasks, deleteTask, editTasks };
