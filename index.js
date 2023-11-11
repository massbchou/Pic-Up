async function analyse_image(trash) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [label_result] = await client.labelDetection(trash);
    const labels = label_result.labelAnnotations;

    const [logo_result] = await client.logoDetection(trash);
    const logos = logo_result.logoAnnotations;

    label_data = [];
    logo_data = [];

    labels.forEach(label => label_data.push(label.description));
    logos.forEach(logo => logo_data.push(logo.description));

    return [label_data, logo_data, text_data];

  }

analyse_image('./images/doritos.jpg').then((data) => data.forEach(datum => console.log(datum)));
