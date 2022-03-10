import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

function Picture({id, url, validTarget}) {

    const [{ isDrop, canDrop }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => console.log(`You're dropping ${item.id} on ${id}, valid? ${!!validTarget}`),
        collect: (monitor) => ({
            isDrop: !!monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    // drag will be used to reference the item that is to be made draggable

    const [{isDragging, canDrag}, drag] = useDrag(() => ({
        type: "image",
        item: { id: id},
        // collection function defines different states and props accessible 
        collect: (monitor) => ({
            // double bang just returns the truthy-ness
            isDragging: id === monitor?.getItem()?.id,
            canDrag: monitor.canDrag(),
        })
    }))

    return(
        <div style={{position: 'relative', width: 50, height: 50}}>
            <div
                ref={drop}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: !isDragging && canDrop ? 2: 'auto',
                    border: (canDrop && validTarget) ? "5px solid blue" : "0px",
                }} 
            />
            <img
                ref={drag}
                src={url} 
                style={{
                    border: isDragging ? "5px solid pink" : "0px",
                    position: 'absolute',
                    left: 0,
                    top: 0,
                }}
            />
            {/* <div
                ref={drag}
                style={{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0,
                pointerEvents: !isDragging && canDrop ? 'auto' : 'auto'
                }} 
            /> */}
            
        </div>
    )
}

export default Picture