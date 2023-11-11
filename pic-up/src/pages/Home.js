import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../Icon_Black.svg"
import title from "../Title_Black.svg"

function Home() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadButtonClick = () => {
        // Code to upload the selected file to the server goes here
        console.log('Selected file:', selectedFile);
    };

    return (
        <div className="container-fluid text-center bg-body-secondary border-bottom border-black" id="container-header">
            <div class="row pt-2">

            {/* <!-- this div holds the logo --> */}
            <div class="col-3 pt-2 text-start" id="logo"><img src={logo} width="40" height="40" fill="currentColor" class="" viewBox="0 0 16 16"></img></div>

            {/* <!-- this div holds the game name --> */}
            <div class="col-6 pt-2" id="title">
            <img src={title} height="40"></img>
            </div>

            {/* <!-- this div holds the button to log in or view profile (change text display depending on whether the player is signed in or not) --> */}

            {/* <div class="col-3 text-end" id="login">
            <button type="reset" class="btn bg-body-tertiary">Player Profile</button>
            </div> */}

            </div>

            <div className="cover-container">
                <img src="/background.jpg" alt="background" class="h-100 w-100 position-absolute top-0 left-0 z-n1" />
                <div className="container text-center text-black">
                    
                    <input type="file" onChange={handleFileInputChange} />
                    <button onClick={handleUploadButtonClick}>Upload</button>
                </div>       

                <NavLink to="/map" className="btn btn-lg btn-primary position-absolute bottom-0 end-0 m-5">Find a trash can</NavLink>
            </div>    
        </div>
    );
}

export default Home;
