import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import FullPageSlider from './FullPageSlider'
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        height: ''
    },
    loader:{
        color: 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1
        }
}))



const SmartFrame = () => {
    const cssTheme = useStyles();
    const [galleryItems, setGalleryItems] = useState([])
    const [loading, setLoading] = useState(true);
    const [imageIdData, setImageIdDate] = useState([])

    useEffect(() => {    
        async function fetchImages() {
            const imagesIDData = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects`);
            console.log(imagesIDData.data.objectIDs);
            setImageIdDate(imagesIDData);
            let images = [];
            let j = 0;
            for(let i = imagesIDData.data.objectIDs[0] ; i <= imagesIDData.data.objectIDs.length; i++){
            await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${imagesIDData.data.objectIDs[i]}`)
            // eslint-disable-next-line no-loop-func
            .then(response => {
               // console.log(response.data.primaryImage);
                if(response.data.primaryImage !== '') {
                    images.push(<img src = {response.data.primaryImage} alt={response.data.objectID} style = {{height:'1200px', width: '1920px'}}/>);
                    j = j + 1;
                }
                if(j === 8){
                    console.log('calling from parent')
                    setGalleryItems(images); 
                    setLoading(false);
                    j = 0
                }if(i === imagesIDData.data.objectIDs.length){
                    i = 1;
                }
                
            })
        }
        
        }
        fetchImages()     
    },[]);

   
    
    return (
        <div>
          {
                   loading &&
                   <CircularProgress size={50} className={cssTheme.loader} />
          }

            {
                    !loading && <FullPageSlider images={galleryItems} dataLength = {imageIdData}/>
            }
        </div>
    );
}

export default SmartFrame
