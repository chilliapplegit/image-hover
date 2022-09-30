import { MouseEvent, ReactElement, useState } from "react";
import ImageType from "../../type/ImageType";

interface ImagesData {
  data: ImageType,
  onImageHover: (e:MouseEvent<HTMLImageElement>, item:ImageType|null, x?:number, y?:number) =>void,
  id: string,
}
interface Coords {
  x: number,
  y: number
}

const ImagesHover = (props: ImagesData) => {

  const { data : { serail, name, image , caption }, onImageHover, id } = props;
  const [currentCoords, setCurrentCoords] = useState<Coords|null>(null);
  const [show, setshow] = useState<boolean>(false);
  

  const calculateBounds = (cursorX:number, cursorY:number, imageWidth:number, imageHeight:number):{x:number, y:number} => {
    let width = 100;
    let height = 100;
    let x = cursorX- width/2;
    let y = cursorY- height/2;
    if(x<0) x=0;
    if(y<0) y=0;
    console.log('cursorX, cursorY :>> ', cursorX, cursorY);

    if(x+width>imageWidth)x=imageWidth-width;
    if(y+height>imageHeight) y=imageHeight-height;
    setCurrentCoords({x,y})

    console.log('x,y  :>> ', x,y );
    return {
      x,y
    }
  }
  const checkHover = (event: MouseEvent<HTMLImageElement>) => {
    const currentItem:HTMLElement|null = document.getElementById(`${id}`);
    setshow(true);
    if(currentItem){
      let X = (event.pageX - currentItem?.offsetLeft);
      let Y = (event.pageY - currentItem?.offsetTop);
      const {x, y} = calculateBounds(X,Y, 200, 300)
      onImageHover(event, props.data, x, y)
    }
    
  }
  return (
    <div>
      <img id={`${id}`} src={image} alt={name} style={{ width: `200px` , height: `300px` }} 
      onMouseEnter={(e) => checkHover(e)}
      onMouseMove={(e) => checkHover(e)}
      onMouseLeave={(e) => onImageHover(e, null)} 
      />
      {/* {
        currentCoords && (
          <div onMouseMove={() => setshow(true)} onMouseEnter={() => setshow(true)} style={{ position: 'absolute', top: `${currentCoords?.x}px`, left: `${currentCoords?.y}px`, width: '100px', height: '100px', background: "rgba(0,0,0,0.4)", opacity: show? '1': '0' }}></div>
        )
      } */}
    </div>
  )
}

export default ImagesHover;