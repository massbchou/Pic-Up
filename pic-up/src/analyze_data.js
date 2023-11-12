/**
 * @async
 * Inputs a link to an image, outputs (as a Promise) a dictionary.
 * output.labels contains the general features of the image, and output.logos contains the logos found in the image.
 * both are arrays of dictionaries where for each item, item.description is a string containing its content, and item.score is its confidence value
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
    labels.forEach(label => {
        const label_datum = {
            description: label.description, // qualitative descriptor
            score: label.score, // confidence score
        };
        label_data.push(label_datum);
    });

    logos.forEach(logo => {
        const logo_datum = {
            description: logo.description, // qualitative descriptor
            score: logo.score, // confidence score
        };
        logo_data.push(logo_datum);
    });

    //labels.forEach(label => label_data.push(label.description));
    //logos.forEach(logo => logo_data.push(logo.description));

    //2d array
    return {labels: label_data, logos: logo_data};
}

//
async function prompt_engineering() {
    return null;
}

//analyse_image("../public/campus-map-1.jpg").then(data => data.forEach(datum => console.log(datum.description + " (" + datum.score + ")")));

module.exports = { analyse_image };