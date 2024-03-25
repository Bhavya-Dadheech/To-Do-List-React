import React from "react";
import ListComponent from "./ListComponent";
import TaskComponent from "./TaskComponent";
import Navbar from "./Navbar";
import usePersistState from "../services/usePresistState";

export default function Dashboard() {
  const [counter, setCounter] = usePersistState(null);

  const updateListId = async (list) => {
    setCounter(list);
  };
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex justify-center translate-y-24">
          <div className="w-4/6 flex flex-row border border-slate-100 bg-amber-50 rounded-xl h-[75vh]">
            <ListComponent updateListId={updateListId} />
            <TaskComponent listId={counter?.id} listName={counter?.name} updateListId={updateListId} />
          </div>
        </div>
      </main>
    </>
  );
}
