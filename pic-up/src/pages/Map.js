import { NavLink } from 'react-router-dom';
import '../Map.css';

function Map() {
    return (
        <div className="cover-container">
            <img src="Map.svg" alt="UMass Map"  class="w-90 position-absolute top-0 left-0" />
        </div>
    )
}

export default Map;