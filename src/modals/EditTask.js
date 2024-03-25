import React, { useEffect, useState } from "react";
import { Modal, Input, message } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { editTasks, fetchTasks } from "../services/TaskService";

export default function EditTask({ editTaskOpen, listId, currentTask, setEditTaskOpen, fetchData }) {
  const [newTaskName, setNewTaskName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleInputChange = (event) => {
    setNewTaskName(event.target.value);
  };

  const TaskEdit = async (val, name) => {
    if (val === "edit") {
      const response = await fetchTasks(listId);
      const updatedTask = response.data.find((v) => v.taskId === currentTask.id);
      updatedTask.taskName = name;
      try {
        const response = await editTasks(listId, updatedTask);
        if (response) {
          messageApi.open({
            type: "success",
            content: "task updated successfully",
            duration: 1
          });
          fetchData();
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    }
    setEditTaskOpen(false);
  };

  useEffect(() => {
    setNewTaskName(currentTask.name);
  }, [currentTask]);

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <span>
            <UnorderedListOutlined style={{ marginRight: "8px" }} /> Edit {currentTask.name}
          </span>
        }
        titleFontSize={22}
        titleColor="rgb(245 158 11)"
        open={editTaskOpen}
        centered
        closable={true}
        onOk={() => {
          TaskEdit("edit", newTaskName);
        }}
        onCancel={() => {
          TaskEdit();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Input size="large" value={newTaskName} onChange={handleInputChange} placeholder="Enter List Name" />
      </Modal>
    </>
  );
}
