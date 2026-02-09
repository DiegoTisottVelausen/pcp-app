import { Droppable, Draggable } from "@hello-pangea/dnd"
import Card from "../card/Card"

export default function Column({ data, ordens }) {
  return (
    <div className="column">
      <h3>{data}</h3>

      <Droppable droppableId={data}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="column-body"
          >
            {ordens.map((ordem, index) => (
              <Draggable
                key={ordem.id}
                draggableId={ordem.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card ordem={ordem} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}








