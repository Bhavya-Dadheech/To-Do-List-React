import React, { useEffect, useState } from "react";
import { Modal, Input, message } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { editList, fetchLists } from "../services/ListService";
const userDetails = JSON.parse(localStorage.getItem("userDetails"));

export default function EditList({ editOpen, setEditOpen, listId, listName, updateListId }) {
  const [newListName, setNewListName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleInputChange = (event) => {
    setNewListName(event.target.value);
  };

  const ListEdit = async (val, name) => {
    if (val === "edit") {
      const response = await fetchLists(userDetails.user_id);
      const updatedList = response.data.find((v) => v.list_id === listId);
      updatedList.list_name = name;
      try {
        const response = await editList(updatedList, userDetails.user_id);
        if (response) {
          messageApi.open({
            type: "success",
            content: "list updated successfully",
            duration: 1
          });
          updateListId(updatedList.list_id, updatedList.list_name);
        }
        // setTasks(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    }
    setEditOpen(false);
  };

  useEffect(() => {
    setNewListName(listName);
  }, [listName]);

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <span>
            <UnorderedListOutlined style={{ marginRight: "8px" }} /> Edit {listName}
          </span>
        }
        titleFontSize={22}
        titleColor="rgb(245 158 11)"
        open={editOpen}
        centered
        closable={true}
        onOk={() => {
          ListEdit("edit", newListName);
        }}
        onCancel={() => {
          ListEdit();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Input size="large" value={newListName} onChange={handleInputChange} placeholder="Enter List Name" />
      </Modal>
    </>
  );
}
