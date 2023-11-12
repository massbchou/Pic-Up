// Import React and React DOM libraries
import ReactDOM from 'react-dom';
import camera from "../Camera_Black.svg"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';
import goldfish from "../goldfish.jpg";

let trashy = {}

function parseString(inputString) {
  // Split the string into pairs based on commas
  const pairs = inputString.split('\n');

  // Create an empty object to store key-value pairs
  const resultObject = {};

  // Iterate over each pair and split based on ':'
  pairs.forEach(pair => {
    //a = pair
    const [key, value] = pair.split(': ');
    resultObject[key] = pair;
  });
  return resultObject;
}

// Define a custom component to display the whole page
export default function PicInfo(props) {
  // Use props to pass data to the component
  // console.log("This is the prop: " + props)
  const { imageSrc, imageName, itemName, impactText } = props;
  // const info = props;
  // console.log("This is the info: " + info);
  
  // const location = useLocation();
  // const info = location.state;

  let trash = "Goldfish (snack)";
  let recycle = "Recyclable: No";
  let compost = "Compostable: No";
  let reuse = "Reusable: No";
  let points = "Score: 3";
  let description = "Goldfish snacks, although popular and widely consumed, contribute to environmental harm due to their non-recyclable packaging and non-compostable nature";
  
  // console.log(info);
  

  const [fetchedData, setFetchedData] = React.useState(null);
  // let data;


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/read-file');
        //console.log('response!', response);
        if (response.status === 200) {
          console.log(response);
          console.log(response.data);
          let data = response.data;
          setFetchedData(data);
          // trash = data.Item;
          // recycle = response.data.recycle;
        } else {
          // Handle error, e.g., show an error message
          console.error('Failed to get data from /read-file');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

    // Define the styles for the component
    const styles = {
      pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
      },
      imageContainer: {
        width: '300px',
        height: '300px',
      },
      image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
      itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
      },
      itemTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
      },
      itemList: {
        listStyle: 'none',
      },
      impactContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
      },
      impactTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
      impactText: {
        fontSize: '16px',
      },
    };

    if (fetchedData) {
      console.log(fetchedData);
      trash = fetchedData.Item;
      recycle = fetchedData.Recyclable;
      compost = fetchedData.Compostable;
      reuse = fetchedData.Reusable;
      points = fetchedData.Score;
      description = fetchedData.Blurb;
    }

    return (
      <div style={styles.pageContainer}>
      <div style={styles.imageContainer}>
        <img
          style={styles.image}
          src={goldfish}
          alt={imageName}
        />
      </div>
      <div style={styles.itemContainer}>
        <h2 style={styles.itemTitle}>{trash}</h2>
        <ul style={styles.itemList}>
          <li>{recycle}</li>
          <li>{compost}</li>
          <li>{reuse}</li>
          <li>{points}</li>
        </ul>
      </div>
      <div style={styles.impactContainer}>
        <h3 style={styles.impactTitle}>
          {description}
        </h3>
        {/* <p style={styles.impactText}>{impactText}</p> */}
      </div>
    </div>
    );
  

}

// Render the page component to the root element with some placeholder values
ReactDOM.render(
  <PicInfo
    imageSrc={camera}
    imageName="Pic Up!"
    itemName="Golfish (snack)"
    impactText="Goldfish snacks, although popular and widely consumed, contribute to environmental harm due to their non-recyclable packaging and non-compostable nature"
  />,
  document.getElementById('root')
);

