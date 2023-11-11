async function analyse_image(trash) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection(trash);
    const labels = result.labelAnnotations;

    label_words = [];

    labels.forEach(label => label_words.push(label.description));
    
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));

    return new Promise((resolve, reject) => {
          resolve(label_words);
      });

  }

console.log(analyse_image('./images/doritos.jpg'));