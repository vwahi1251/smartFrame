/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState  } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from "@material-ui/core/CircularProgress";
/* 
    React Slick is a widely used carousel component with extensive functionality that matches the existing usecase.
*/
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        height: '100%'
    },
    loader: {
        color: 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1,
    },
 })
);

const FullPageSlider = ({ ...props }) => {
    const cssTheme = useStyles();
    const [galleryItems, setGalleryItems] = useState([]);
    const [sliderLoading, setSliderLoading] = useState(true);
    const sliderRef = useRef(null);
    let newImages = [];

    async function fetchImages() {
        for(let i = 0 ; i < props.dataLength.total; i++) {
          await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.dataLength.objectIDs[i]}`)
          // eslint-disable-next-line no-loop-func
          .then(response => {
               if(response.data.primaryImage !== '') {
                   newImages?.push(<img src = {response.data.primaryImage} alt={response.data.objectID} style = {{height:'1200px', width: '1920px'}}/>);
               }
                if(newImages?.length === 5) {
                    setSliderLoading(false);
                    setGalleryItems(newImages); 
                }
                if(i === props.dataLength.total - 1) {
                    setGalleryItems([newImages, ...galleryItems]);
                } 
            })
        }
    }
    
    useEffect(() => {    
        fetchImages() 
    },[]);

    const settingsOver = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        lazyLoad: true,
        autoplay: false,
        speed: 1000,
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
        <div 
            onMouseOver = { () => { settings = settingsOver } } 
            onMouseMove = { () => { settings = settingsOver } } 
            onMouseEnter = { () => { settings = settingsIn } } 
            className = { cssTheme.main }
        >
            {
                sliderLoading && <CircularProgress size={50} className = { cssTheme.loader }/>
            }

            {
                !sliderLoading && 
                    <Slider {...settings} ref={sliderRef}  >
                        {
                            galleryItems.map((image, index) => (
                                <div key={index}>
                                    {image}
                                </div>
                            ))
                        }
                    </Slider>
            }
      </div>
    );
}

export default FullPageSlider;