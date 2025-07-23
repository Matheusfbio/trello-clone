import TrashIcon from "../../icon/TrashIcon";
import type { Column, Id } from "../../types/column";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

export default function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;
  return (
    <div className="bg-gray-500 w-[300px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="flex bg-gray-700
      text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-500 border-4 items-center justify-between ">
      <div className="flex gap-2">
        <div className="flex justify-center items-center bg-gray-500 px-2 py-1 text-sm rounded-full">0

        </div>
      {column.title}
        </div>
        <button onClick={() => {
        deleteColumn(column.id);
      }} className="stroke-gray-700 hover:stroke-white
        hover:bg-gray-700 rounded px-2 py-2"><TrashIcon/></button>
      </div>
      <div className="flex flex-grow">
        Content
      </div>
      <div>
        Footer
      </div>
    </div>
  );
}
