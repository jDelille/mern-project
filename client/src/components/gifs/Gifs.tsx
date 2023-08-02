import { Dispatch, SetStateAction, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import ResizeObserver from "react-resize-observer";
import { IImage } from "@giphy/js-types";

import './Gifs.scss';

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

type Props = {
 setGif?: Dispatch<SetStateAction<IImage>>
}


const Gifs: React.FC<Props> = ({ setGif }) => {
 const [width, setWidth] = useState(window.innerWidth);

 const fetchGifs = (offset: number) =>
  giphyFetch.trending({ offset, limit: 10 });


 return (
  <div className="gifs">
   <Grid
    onGifClick={(gif, e) => { e.preventDefault() }}
    fetchGifs={fetchGifs}
    width={width}
    columns={3}
    gutter={2}
    className='gif-grid'
   />
   <ResizeObserver
    onResize={({ width }) => {
     setWidth(width);
    }}
   />
  </div>
 );
}

export default Gifs;