import React, { useEffect, useState } from "react";
import { fetchTasks, editTasks, saveTasks, deleteTask } from "../services/TaskService";
import { Button, message, Modal } from "antd";
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";
import NewTask from "../modals/NewTask";
import EditList from "../modals/EditList";
import EditTask from "../modals/EditTask";

export default function TaskComponent({ listId, listName, updateListId }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState();
  const [editListOpen, setEditListOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState("");

  const listUpdate = (id, val) => {
    updateListId({ id: id, name: val });
  };
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const showModal = () => {
    setOpen(true);
  };

  const showListEdit = () => {
    setEditListOpen(true);
  };

  const showTaskEdit = (val) => {
    setCurrentTask(val);
    setEditTaskOpen(true);
  };

  const handleSaveTask = async (val) => {
    if (val === "save") {
      const task = {
        taskId: "",
        taskName: newTask,
        userList: null
      };
      const response = await saveTasks(listId, task);
      if (response) {
        messageApi.open({
          type: "success",
          content: "task saved successfully",
          duration: 1
        });
        fetchData();
      }
    }
    setOpen(false);
    setNewTask("");
  };

  const deleteT = async (id) => {
    try {
      const response = await deleteTask(id);
      if (response) {
        messageApi.open({
          type: "warning",
          content: "deleted successfully",
          duration: 1
        });
        fetchData();
      }
      // setTasks(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetchTasks(listId);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const taskStatusUpdate = async (task) => {
    task.status = !task.status;
    try {
      const response = await editTasks(listId, task);
      if (response) {
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    if (listId !== null && listId !== undefined) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  return (
    <div className="flex text-center flex-col gap-2 w-3/4 p-8">
      <span className="inline-flex items-center justify-center text-lg font-medium mb-2 p-1 bg-slate-300 rounded-md">
        {listName ? (
          <>
            {listName}
            <Button
              shape="circle"
              icon={<EditOutlined />}
              size="small"
              onClick={showListEdit}
              className="float-right mx-1 bg-slate-50"
            />
          </>
        ) : (
          "Task"
        )}

        <EditList
          editOpen={editListOpen}
          listId={listId}
          setEditOpen={setEditListOpen}
          listName={listName}
          updateListId={listUpdate}
        />
      </span>
      {contextHolder}
      <div className="flex text-center flex-col gap-2 w-full overflow-y-scroll">
        {listId ? (
          <>
            {tasks.map((task) => (
              <div
                className={`hover:bg-slate-200 w-full bg-slate-100 p-1 cursor-pointer rounded-md border border-blue-200 ${
                  task.status === true ? "line-through bg-slate-400" : ""
                }`}
                key={task.taskId}
                onClick={() => {
                  taskStatusUpdate(task);
                }}
              >
                <span className="w-[90%] mx-2 break-words">{task.taskName}</span>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    Modal.confirm({
                      title: "Delete this task ?",
                      icon: <ExclamationCircleOutlined />,
                      content: "This action cannot be undone!",
                      centered: true,
                      onOk: () => {
                        deleteT(task.taskId);
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
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => [showTaskEdit({ id: task.taskId, name: task.taskName })]}
                  className="float-right mx-1 bg-slate-50"
                />
                <EditTask
                  setEditTaskOpen={setEditTaskOpen}
                  editTaskOpen={editTaskOpen}
                  currentTask={currentTask}
                  listId={listId}
                  fetchData={fetchData}
                />
              </div>
            ))}
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal} className="w-max self-center">
              Add Task{" "}
            </Button>
            <NewTask
              open={open}
              handleSaveTask={handleSaveTask}
              handleInputChange={handleInputChange}
              newTask={newTask}
            />
          </>
        ) : (
          <div>Add tasks here / Click on list to add</div>
        )}
      </div>
    </div>
  );
}
