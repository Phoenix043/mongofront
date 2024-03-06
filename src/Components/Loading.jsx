import React from 'react'; 
import img1 from '../assets/ball-triangle.svg'
import img2 from '../assets/bars.svg'
import img3 from '../assets/circles.svg'
import img4 from '../assets/grid.svg'
import img5 from '../assets/hearts.svg'
import img6 from '../assets/oval.svg'
import img7 from '../assets/puff.svg'
import img8 from '../assets/react.svg'
import img9 from '../assets/rings.svg'
import img10 from '../assets/spinning-circles.svg'
import img11 from '../assets/tail-spin.svg'
import img12 from '../assets/three-dots.svg'

const svgFiles=[img1,img2,img3,img4,img5,img6,img7,img7,img8,img9,img10,img11,img12]
const Loading = ({ message }) => {
  // Function to get a random SVG path from your assets folder
  const getRandomSvgPath = () => {
    const randomSvgFile = svgFiles[Math.floor(Math.random() * svgFiles.length)];
    return randomSvgFile;
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <img src={getRandomSvgPath()} alt="loading" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loading;
