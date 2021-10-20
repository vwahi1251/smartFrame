import React, { useRef } from 'react'
import Slider from "react-slick";
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FullPageSlider = ({...props}) => {
    const state = {
        sliders: props
            
    }
    // const setSliders = async () => {
    //     let images = [];
    //     let j = 0;
    //     for(let i = props.imagesIDData.data.objectIDs[6] ; i <= props.imagesIDData.data.objectIDs.length; i++){
    //         await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.imagesIDData.data.objectIDs[i]}`)
    //         // eslint-disable-next-line no-loop-func
    //         .then(response => {
    //            // console.log(response.data.primaryImage);
    //             if(response.data.primaryImage !== '') {
    //                 images.push(<img src = {response.data.primaryImage} alt={response.data.objectID} style = {{height:'1200px', width: '1920px'}}/>);
    //                 j = j + 1;
    //             }
    //             if(j === 5){
    //                 console.log('calling from parent')
    //                 state.sliders = images;
    //             }if(i === props.imagesIDData.data.objectIDs.length){
    //                 i = 1;
    //             }
                
    //         })
    //     }
    // }
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
      };
    return (

        <div>
            <Slider {...settings}>
            {
                    state.sliders.images.map((image, index) => (
                        <div>
                            {image}
                        </div>
                    ))
                }
                </Slider>

        </div>
    )
}

export default FullPageSlider