import React, { useState } from 'react'
import Picture from './Picture'
import {useDrop} from "react-dnd"
import "./App.css"

const PictureList = [
    {
        id: 1,
        url: "https://image.ec21.com/image/actradingbv/bimg_GC11286195_CA11292266/Wholesale-Soft-Drinks-Fanta-Coca.jpg",
    },
    {
        id: 2,
        url: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/d70421dcdccbc09009ec4d58aa527308-1574366796906/f9c86a32-e5c1-4d23-ab96-2909078a8e92.jpg",
    },
    {
        id: 3,
        url: "https://www.rpgmakercentral.com/uploads/profile/photo-15053.png",
        validTarget: true,
    },
]

function DragDrop() {
    const [board, setBoard] = useState([]);
  
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "image",
      // function to run when item is dropped
      drop: (item) => addImageToBoard(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    const addImageToBoard = (id) => {
      const pictureList = PictureList.filter((picture) => id === picture.id);
      setBoard((board) => [...board, pictureList[0]]);
    };
    return (
      <>
        <div className="Pictures">
          {PictureList.map((picture) => {
            return <Picture url={picture.url} id={picture.id} key={picture.id} validTarget={picture.validTarget}/>;
          })}
        </div>
        <div className="Board" ref={drop}>
          {board.map((picture) => {
            return <Picture url={picture.url} id={picture.id}/>;
          })}
        </div>
      </>
    );
  }
  
  export default DragDrop;