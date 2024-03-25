import React from "react";
import { Modal, Input } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";

export default function NewTask({ open, handleSaveTask, handleInputChange, newTask }) {
  return (
    <Modal
      title={
        <span>
          <FileDoneOutlined style={{ marginRight: "8px" }} />
          Add New Task
        </span>
      }
      titleFontSize={22}
      titleColor="rgb(245 158 11)"
      open={open}
      centered
      closable={true}
      onOk={() => {
        handleSaveTask("save");
      }}
      onCancel={handleSaveTask}
      okText="Save"
      cancelText="Cancel"
    >
      <Input size="large" value={newTask} onChange={handleInputChange} placeholder="Enter Task Name" />
    </Modal>
  );
}
