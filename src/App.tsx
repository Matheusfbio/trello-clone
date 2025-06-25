import React, { useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Column from "./components/Column";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: "7bb5627f-7662-566d-b3a2-0ac5fc629f68",
      title: "Bolivia",
    },
    {
      id: "7fdf2669-d974-55eb-a1b8-2e274c98bb37",
      title: "Iran",
    },
    {
      id: "9f7eaf5c-95e7-5577-a7e8-c3fcc8af23a8",
      title: "Egypt",
    },
  ]);

  return (
    <>
      <p className="text-2xl text-center p-10">Trello clone</p>
      <div className="flex- bg-red-500 p-12">
        <DndContext collisionDetection={closestCorners}>
          <Column tasks={tasks} />
        </DndContext>
      </div>
    </>
  );
}
