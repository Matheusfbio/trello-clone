import { useMemo, useState } from "react";
import PlusIcon from "../icon/PlusIcon";
import type { Column, Id } from "../types/column";
import ColumnContainer from "./Column/ColumnContainer";
import { DndContext, DragOverlay, type DragStartEvent, type DragEndEvent, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors  = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 300,
      },
    })
  )


  return (
    <>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-5">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                column={col}
                key={col.id}
                deleteColumn={deleteColumn}
              />
            ))}
          </SortableContext>
        </div>
        <button onClick={() => createNewColumn()}>
          <div className="h-[50px] w-[300px] bg-gray-300 rounded-xl items-center flex gap-4 pl-3">
            <PlusIcon />
            <p>nova coluna</p>
          </div>
        </button>
        {createPortal(
          <DragOverlay>
           {activeColumn && (
            <ColumnContainer 
              column={activeColumn}
              deleteColumn={deleteColumn}
              key={activeColumn.id}
            />
           )} 
          </DragOverlay>,document.body
        )}
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

  function onDragStart(event: DragStartEvent) {
    console.log("Drag Start", event);
    if (event.active.data.current?.type === "column") 
    setActiveColumn(event.active.data.current.column) 
    return
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId =  active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);

      const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
}
