import { useState } from "react";
import PlusIcon from "../icon/PlusIcon";
import type { Column } from "../types/column";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  // console.log(columns);
  return (
    <>
      <div className="m-auto flex gap-5">
        {columns.map((col) => (
          <div key={col.id}>{col.title}</div>
        ))}
      </div>
      <button onClick={() => createNewColumn()}>
        <div className="h-[50px] w-[300px] bg-gray-500 rounded-xl items-center flex gap-4 pl-3">
          <PlusIcon />
        </div>
      </button>
    </>
  );
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
}
