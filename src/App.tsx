import React, { useState } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import KanbanBoard from "./components/kanbanBoard";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: "7bb5627f-7662-566d-b3a2-0ac5fc629f68",
      title:
        "truck hall night immediately hold hat past pair price pitch fun door particular allow ocean jar gravity too gently hole down sang light couple",
    },
    {
      id: "7fdf2669-d974-55eb-a1b8-2e274c98bb37",
      title:
        "actually soft shore composition by failed length bottle summer evidence crop graph speed closely rubbed silk teeth sell sides establish correct quickly get yard",
    },
    {
      id: "9f7eaf5c-95e7-5577-a7e8-c3fcc8af23a8",
      title:
        "only center stranger condition remain field substance number grabbed metal hole remember rocket wore concerned weight exactly progress gun chicken mostly gate explanation freedom",
    },
  ]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <>
      <p className="text-2xl text-center p-10">{/** Title bar */}</p>
      <div className="flex p-12 gap-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <KanbanBoard />
          {/* <Column tasks={tasks} /> */}
        </DndContext>
      </div>
    </>
  );
}
