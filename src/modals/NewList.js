import React from "react";
import { Modal, Input } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

export default function NewList({ open, handleSaveList, handleInputChange, newList }) {
  return (
    <Modal
      title={
        <span>
          <UnorderedListOutlined style={{ marginRight: "8px" }} /> Add New List
        </span>
      }
      titleFontSize={22}
      titleColor="rgb(245 158 11)"
      open={open}
      centered
      closable={true}
      onOk={() => {
        handleSaveList("save");
      }}
      onCancel={handleSaveList}
      okText="Save"
      cancelText="Cancel"
    >
      <Input size="large" value={newList} onChange={handleInputChange} placeholder="Enter List Name" />
    </Modal>
  );
}
