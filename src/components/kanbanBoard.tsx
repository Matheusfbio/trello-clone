import { useState } from "react";
import PlusIcon from "../icon/PlusIcon";
import type { Column, Id } from "../types/column";
import ColumnContainer from "./Column/ColumnContainer";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  return (
    <>
    <DndContext>

      <div className="m-auto flex gap-5">
        <SortableContext items={columnsId}>
        {columns.map((col) => (
          <ColumnContainer column={col} key={col.id}  deleteColumn={deleteColumn}/>
        ))}
        </SortableContext>
      </div>
      <button onClick={() => createNewColumn()}>
        <div className="h-[50px] w-[300px] bg-gray-300 rounded-xl items-center flex gap-4 pl-3">
          <PlusIcon />
        </div>
      </button>
    </DndContext>
    </>
  );
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }


  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
}
