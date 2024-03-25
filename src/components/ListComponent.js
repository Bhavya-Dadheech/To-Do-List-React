import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { fetchLists, saveList, deleteList } from "../services/ListService";
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import NewList from "../modals/NewList";

export default function ListComponent({ updateListId }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [newList, setNewList] = useState("");

  const handleInputChange = (event) => {
    setNewList(event.target.value);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleSaveList = async (val) => {
    if (val === "save") {
      const list = {
        list_id: "",
        list_name: newList,
        user: null
      };
      const response = await saveList(userDetails.user_id, list);
      if (response) {
        messageApi.open({
          type: "success",
          content: "list saved successfully",
          duration: 1
        });
        const response = await fetchLists(userDetails.user_id);
        setLists(response.data);
      }
    }
    setOpen(false);
    setNewList("");
  };

  const deleteL = async (listId) => {
    const response = await deleteList(listId);
    if (response) {
      messageApi.open({
        type: "warning",
        content: "deleted successfully",
        duration: 1
      });
      const response = await fetchLists(userDetails.user_id);
      setLists(response.data);
      updateListId();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLists(userDetails.user_id);
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateListId]);

  return (
    <div className="flex flex-col gap-2 text-center bg-amber-100 p-8 h-full w-1/3 rounded-s-xl">
      <span className="text-lg font-medium mb-2 p-1 bg-slate-300 rounded-md">List</span>
      {contextHolder}
      <div className="flex flex-col gap-2 text-start overflow-y-scroll">
        {lists ? (
          lists.map((list) => (
            <div
              key={list.list_id}
              className="rounded-md bg-emerald-400 p-1 mx-1 cursor-pointer"
              onClick={() => {
                updateListId({ id: list.list_id, name: list.list_name });
              }}
            >
              <span className="mx-1 text-gray-700 w-9/12 break-words">{list.list_name}</span>
              <Button
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                size="small"
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  Modal.confirm({
                    title: "Delete the list ?",
                    icon: <ExclamationCircleOutlined />,
                    content: "This action cannot be undone!",
                    centered: true,
                    onOk: () => {
                      deleteL(list.list_id);
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    )
                  });
                }}
                className="float-right mx-1"
              />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Button className="self-center" type="primary" shape="circle" icon={<PlusOutlined />} onClick={showModal} />
      <NewList open={open} handleSaveList={handleSaveList} handleInputChange={handleInputChange} newList={newList} />
    </div>
  );
}
