import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

function Picture({id, url}) {

    const [{ isDrop, canDrop }, drop] = useDrop(() => ({
        accept: "image",
        drop: () => console.log("You're dropping shit on this"),
        collect: (monitor) => ({
            isDrop: !!monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    // drag will be used to reference the item that is to be made draggable

    const [{isDragging, canDrag}, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        // collection function defines different states and props accessible 
        collect: (monitor) => ({
            // double bang just returns the truthy-ness
            isDragging: !!monitor.isDragging(),
            canDrag: monitor.canDrag(),
        })
    }))

    return(
        <div style={{position: 'relative', width: 50, height: 50}}>
            <img
                src={url} 
                style={{border: isDragging ? "5px solid pink" : "0px", opacity: canDrop ? .5 : 1}}
            />
            <div
                ref={drag}
                style={{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0,
                pointerEvents: canDrag ? 'auto' : 'none'
                }} 
            >
                <div
                    ref={drop}
                    style={{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0,
                    }} 
                />
            </div>
        </div>
    )
}

export default Picture