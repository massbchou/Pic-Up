import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../Icon_Black.svg"
import title from "../Title_Black.svg"
import camera from "../Camera_Black.svg"
import '../Home.css';

function Home() {
    const [image, setImage] = useState(null);

    const handleFileInputChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUploadButtonClick = async (event) => {
        // Code to upload the selected file to the server goes here
        console.log('Selected file:', image);
        
        if (!image) {
          console.error('No image selected');
          return;
        }
        
        try {
          const files = event.target;
          console.log(files)
          const response = await fetch('/identify-image', {
          method: 'GET',
          headers: {'Content-Type': 'image'},
          body: null,
        });
        if (response.ok) {
          // Handle success, e.g., show a success message
          console.log('Image successfully sent to /identify-image');
        } else {
          // Handle error, e.g., show an error message
          console.error('Failed to send image to /identify-image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      
    };

    return (
        <div className="container-fluid text-center bg-body-secondary border-bottom border-black d-flex flex-column overflow-hidden" id="container-header">
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

            <div className="body-container">
                {/* <img src="/background.jpg" alt="background" class="h-100 w-100 position-absolute top-0 left-0 z-n1" /> */}
                <div className="container text-center text-black">
                    <div className="img-container"><img src={camera} height="200" class="mb-5"></img></div>
                    <div className="input-container">
                        <input type="file" accept='image/*' class="mb-5" onChange={handleFileInputChange} />
                        {/* <button type='submit'>Submit</button> */}
                        <NavLink to="/pic-info" className="" onClick={handleUploadButtonClick}>Submit</NavLink>
                    </div>
                    <NavLink to="/map" className="btn btn-lg btn-primary position-absolute bottom-0 end-0 m-5">Find a trash can</NavLink>
                </div>       

                
            </div>    
        </div>
    );
}

export default Home;
