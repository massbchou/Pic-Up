/**
 * @async
 * Inputs a link to an image, outputs (as a Promise) a 2d array where [0] is an array of all label data as strings, [1] is an array of all logo data as strings.
 */
async function analyse_image(trash) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
    const path = require('path');
    require('dotenv').config();

    // Specify the path to your service account key JSON file
    const serviceAccountKeyFile = path.join(__dirname, GOOGLE_API_AUTHENTICATOR); // Update with your actual file path

    // Creates a client with the service account key
    const client = new vision.ImageAnnotatorClient({
        keyFilename: serviceAccountKeyFile,
    });
  
    // Creates a client
    //const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [label_result] = await client.labelDetection(trash);
    const labels = label_result.labelAnnotations;

    // Performs logo detection on the image file
    const [logo_result] = await client.logoDetection(trash);
    const logos = logo_result.logoAnnotations;

    //these will be returned
    label_data = [];
    logo_data = [];

    //format the data into arrays to return
    labels.forEach(label => label_data.push(label.description));
    logos.forEach(logo => logo_data.push(logo.description));

    //2d array
    return [label_data, logo_data];
}

//
async function prompt_engineering() {
    return null;
}

analyse_image("../public/campus-map-1.jpg").then(data => data.forEach(datum => console.log(datum)));

export { analyse_image };