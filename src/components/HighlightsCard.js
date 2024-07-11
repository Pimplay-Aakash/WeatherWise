import React from 'react';
import feelsLike from '../assets/imgs/temperature.png'
import windIcon from '../assets/imgs/wind.png'
import HumidityIcon from '../assets/imgs/humidity.png'
import UVIndexIcon from '../assets/imgs/uv-index.png'
import VisibilityIcon from '../assets/imgs/low-visibility.png'


const HighlightsCard = ({ title, value }) => {
   let imglink = feelsLike

   switch (title){
        case 'Feels Like':
            imglink = feelsLike;
            break;
        case 'Wind':
            imglink = windIcon;
            break;
        case 'Humidity':
            imglink = HumidityIcon;
            break;
        case 'UV Index':
            imglink = UVIndexIcon;
            break;
        case 'Visibility':
            imglink = VisibilityIcon
            break
        default:
            imglink = feelsLike
   }

  return (
    <div className="border rounded-lg p-4 bg-gray-50 shadow-md flex justify-around items-center max-w-56 ">
        <img src={imglink} alt='feels Like temperature icon' className='w-16'/>
        <div>
            <h3 className="text-md font-bold">{title}</h3>
            <p className="text-lg">{value}</p>
        </div>
    </div>
  );
};

export default HighlightsCard;
