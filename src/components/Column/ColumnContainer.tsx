import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../../icon/TrashIcon";
import type { Column, Id } from "../../types/column";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

export default function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column.id, data: {
    type: "column",
    column
  } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-500 w-[300px] h-[500px] opacity-60 border-2 border-black-500 max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style} 
      {...attributes}
      {...listeners}
      className="bg-gray-500 w-[300px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      >
      {/*Column title*/}
      <div
        className="flex bg-gray-700
        text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-500 border-4 items-center justify-between "
        >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-gray-500 px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-400 hover:stroke-white
        hover:bg-gray-700 rounded px-2 py-2"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
}
