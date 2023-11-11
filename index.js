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

    label_words = [];
    logo_words = [];

    labels.forEach(label => label_words.push(label.description));
    logos.forEach(logo => logo_words.push(logo.description));
    
    //console.log('Labels:');
    //labels.forEach(label => console.log(label.description));

    return [label_words, logo_words];

  }

analyse_image('./images/doritos.jpg').then((data) => console.log(data));
