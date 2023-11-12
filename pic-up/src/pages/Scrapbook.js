// Import React and React-DOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Create a ScrapBook component
function ScrapBook(props) {
  // Use props to pass the text and color of each circle
  return (
    <div className="scrapbook">
      <h1>Pic Up! Ryan's Scrap Book</h1>
      <div className="camera-icon"></div>
      <div className="pages">
        <div className="left-page">
          <div className="circle" style={{backgroundColor: props.leftColor}}></div>
          <p>{props.leftText}</p>
        </div>
        <div className="right-page">
          <div className="circle" style={{backgroundColor: props.rightColor}}></div>
          <p>{props.rightText}</p>
        </div>
      </div>
    </div>
  );
}

// Render the ScrapBook component with some sample props
ReactDOM.render(
  <ScrapBook
    leftText="Text Text Text"
    leftColor="red"
    rightText="Text Text Text"
    rightColor="blue"
  />,
  document.getElementById('root')
);
