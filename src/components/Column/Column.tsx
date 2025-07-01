import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../Task";

export default function Column({ tasks }) {
  return (
    <div className=" w-1/4 bg-gray-200 rounded-xl p-4 pl-2  flex flex-col gap-3">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task id={task.id} title={task.title} key={task.id} />
        ))}
      </SortableContext>
    </div>
  );
}
