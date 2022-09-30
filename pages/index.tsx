import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import { MouseEvent, useRef, useState } from 'react'
import ImagesHover from '../components/ImagesHover'
import styles from '../styles/Home.module.css'
import ImageType from '../type/ImageType'



const Home: NextPage = () => {

  

  const imagesHoverEffect: ImageType[] = [
    {
      serail: '01',
      name: 'Image 01',
      image: 'images/image_1.jpg',
      caption: 'Hola this is Image 01',
    },
    {
      serail: '02',
      name: 'Image 02',
      image: 'images/image_2.jpg',
      caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    },
    {
      serail: '03',
      name: 'Image 03',
      image: 'images/image_3.jpg',
      caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      serail: '04',
      name: 'Image 04',
      image: 'images/image_4.jpg',
      caption: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      serail: '05',
      name: 'Image 05',
      image: 'images/image_5.jpg',
      caption: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      serail: '06',
      name: 'Image 06',
      image: 'images/image_6.jpg',
      caption: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,",
    },
    
  ]
  const [activeImage, setActiveImage] = useState<ImageType|null>(null);
  const canvasReference = useRef<HTMLCanvasElement| null>(null);

  
  
  const showCurrentActiveImageZoom = (event:MouseEvent<HTMLImageElement>, item: ImageType|null, x:number = 0, y:number = 0) => {
    if(!item) setActiveImage(null)
    setActiveImage(item)
    let ctx: CanvasRenderingContext2D | null;
    let canvas: HTMLCanvasElement ;
    
    const currentItem = document.getElementById(`${item?.serail}`);
    
    if(canvasReference?.current && item?.image && currentItem){
      canvas = canvasReference?.current;
      
      ctx = canvas.getContext("2d");
      const image = new Image();
      image.src = item?.image;
      
      image.onload = (function(){
        canvas.height=1000;
        canvas.width=1000
        const ratioWidth = (image.width / 200)
        const ratioHeight = (image.height / 300)
        
        ctx?.drawImage(image, x * ratioWidth, y * ratioHeight , 100*ratioWidth,100*ratioHeight, 0,0 , 1000, 1000, )
        
      })
      
      
    }
  }

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Images Hover Effect</title>
        <meta name="description" content="Images Hover Effect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={{ alignItems: 'flex-start' }}>
        {
          imagesHoverEffect.map(item => {
            return (
              <div style={{ marginBottom: '10px' }} key={item.serail}>
                <ImagesHover 
                  data={item}
                  onImageHover={showCurrentActiveImageZoom}
                  id={item.serail}
                />
              </div>
            )
          })
        }
        {
          activeImage && (
            <div style={{ height: '95vh', position: 'fixed', width: '85vw', top:'0px', left: 'calc(250px)', bottom: '0px', margin: 'auto', overflow: 'visible' }}>
              <canvas
                ref={canvasReference}
                // style={{ height: '400px', width: '400px' }}
              >
            </canvas>
            </div>
            
          )

        }
        
      </main>
    </div>
  )
}

export default Home
