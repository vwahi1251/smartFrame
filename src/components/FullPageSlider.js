/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useMemo,useEffect, useState  } from 'react'
import Slider from "react-slick";
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import { makeStyles } from '@material-ui/core/styles'
import "slick-carousel/slick/slick-theme.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        height: '100%'
    },
    loader:{
        color: 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1
        }
}))

const FullPageSlider = ({...props}) => {
    const cssTheme = useStyles();
    const [galleryItems, setGalleryItems] = useState([])
    const [sliderLoading, setSliderLoading] = useState(true);
    let newImages = [];
    const sliderRef = useRef(null);
    useEffect(() => {    
        fetchImages() 
    },[]);

    async function fetchImages() {
        for(let i = 0 ; i < props.dataLength.total; i++){
          await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.dataLength.objectIDs[i]}`)
          // eslint-disable-next-line no-loop-func
          .then(response => {
            console.log('call number ', i, newImages?.length);
               if(response.data.primaryImage !== '') {
            //      console.log(response);
                   newImages?.push(<img src = {response.data.primaryImage} alt={response.data.objectID} style = {{height:'1200px', width: '1920px'}}/>);
               }
           if(newImages?.length === 5){
                  console.log('calling from parent')
                  setSliderLoading(false);
                  setGalleryItems(newImages); 
               }
               if(i === props.dataLength.total - 1){
                  console.log('call outside')
                  setGalleryItems([newImages, ...galleryItems]);
               }
               
           })
        }
      }
    
    const settingsOver = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        lazyLoad: true,
        autoplay: false,
        speed: 1000,
       // autoplaySpeed: 4000,
        adaptiveHeight: true,
        beforeChange:(next) =>  setGalleryItems([...galleryItems, newImages])
          };
    const settingsIn = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    lazyLoad: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus:true,
    adaptiveHeight: true,
    beforeChange:(next) =>  setGalleryItems([...galleryItems, newImages])
        };    
    let settings = settingsIn;      
    return (
        <div onMouseOver = {()=> settings= settingsOver} onMouseMove = {()=> settings= settingsOver} onMouseEnter = {()=> settings= settingsIn} className = {cssTheme.main}>
        {
                 sliderLoading &&
                 <CircularProgress size={50} className = {cssTheme.loader}/>
        }

          {
                  !sliderLoading && 
                   <Slider {...settings} ref={sliderRef}  >
                        {
                            galleryItems.map((image, index) => (
                                <div >
                                    {image}
                                </div>
                                
                            ))
                        }
                  </Slider>
          }
      </div>

    )
}

export default FullPageSlider