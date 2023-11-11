import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
        <div className="cover-container">
            <img src="/background.jpg" alt="background" class="h-100 w-100 position-absolute top-0 left-0 z-n1" />
            <div className="container text-center text-white">
                <h1>Welcome to <span className="text-primary fw-bold">Pic Up!</span></h1>
                <p className="lead">
                    <NavLink to="/home" className="btn btn-lg btn-primary">Let's pic up some trash!</NavLink>
                </p>
            </div>       
            <input type="file" onChange={handleFileInputChange} />
            <button onClick={handleUploadButtonClick}>Upload</button>
            <button className="btn btn-lg btn-primary position-absolute bottom-0 end-0 m-5">Find a trash can</button>
        </div>    
    );
}

export default Home;
