async function analyse_image(trash) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
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

  //function call
analyse_image('./images/doritos.jpg').then((data) => data.forEach(datum => console.log(datum)));
