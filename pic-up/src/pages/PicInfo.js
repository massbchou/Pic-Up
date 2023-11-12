// Import React and React DOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import camera from "../Camera_Black.svg"

// Define a custom component to display the whole page
export default function PicInfo(props) {
  // Use props to pass data to the component
  const { imageSrc, imageName, itemName, impactText } = props;

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

  // Return the JSX element
  return (
    <div style={styles.pageContainer}>
      <div style={styles.imageContainer}>
        <img
          style={styles.image}
          src={imageSrc}
          alt={imageName}
        />
      </div>
      <div style={styles.itemContainer}>
        <h2 style={styles.itemTitle}>Item: {itemName}</h2>
        <ul style={styles.itemList}>
          <li>Non-reusable</li>
          <li>Compostable</li>
        </ul>
      </div>
      <div style={styles.impactContainer}>
        <h3 style={styles.impactTitle}>
          How you like them apples? Environmental impact
        </h3>
        <p style={styles.impactText}>{impactText}</p>
      </div>
    </div>
  );
}

// Render the page component to the root element with some placeholder values
ReactDOM.render(
  <PicInfo
    imageSrc={camera}
    imageName="Pic Up!"
    itemName="Food"
    impactText="This is a placeholder text for the environmental impact of the item."
  />,
  document.getElementById('root')
);

