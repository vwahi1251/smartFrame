import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import FullPageSlider from './FullPageSlider'
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
    main: {
        width: '100%',
        height: '100%'
    },
    loader: {
        color: 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1
    },
 })
);



const SmartFrame = () => {
    const cssTheme = useStyles();
    const [loading, setLoading] = useState(true);
    const [imageIdData, setImageIdDate] = useState([]);

    async function fetchImages() {
        const imagesIDData = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects`);
        setImageIdDate(imagesIDData.data);
        setLoading(false);
    
    }

    useEffect(() => {    
        fetchImages()     
    },[]);

    return (
        <div className={cssTheme.main}>
            {
                loading && <CircularProgress size = {50} className = {cssTheme.loader} />
            }

            {
                !loading && <FullPageSlider dataLength = {imageIdData} />
            }
        </div>
    );
}

export default SmartFrame;