// Landing.js
import { NavLink } from 'react-router-dom';
import title from "../Title_Black.svg"

function Landing() {
    return (
        <div className="cover-container">
            {/* <img src="/background.jpg" alt="background" class="h-100 w-100 position-absolute top-0 left-0 z-n1" /> */}
            <div className="container text-center text-white">
                <h1>Welcome to <img class="pb-2" src={title} height="40"></img></h1>
                <p className="lead">
                    <NavLink to="/home" className="btn btn-lg btn-primary">Let's pic up some trash!</NavLink>
                </p>
            </div>
        </div>
    )
}

export default Landing;