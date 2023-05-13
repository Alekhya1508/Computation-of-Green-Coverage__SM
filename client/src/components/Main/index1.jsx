import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";
import { Upload, Button, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function computeGreenCoveragePercentage(imageData) {
	const threshold = 100; // Adjust this threshold value based on your requirements
	let greenPixels = 0;
	let totalPixels = 0;
  
	// Loop through each pixel in the image
	for (let i = 0; i < imageData.length; i += 4) {
	  const red = imageData[i];
	  const green = imageData[i + 1];
	  const blue = imageData[i + 2];
  
	  // Calculate the average intensity of RGB values
	  const intensity = (red + green + blue) / 3;
  
	  if (intensity > threshold) {
		greenPixels++;
	  }
	  totalPixels++;
	}
  
	// Calculate the green coverage percentage
	const greenCoveragePercentage = (greenPixels / totalPixels) * 100;
	return greenCoveragePercentage.toFixed(2); // Round to 2 decimal places
  }

  function GreenCoverageComputation() {
	const [imageData1, setImageData1] = useState(null);
	const [imageData2, setImageData2] = useState(null);
	const [greenCoveragePercentage, setGreenCoveragePercentage] = useState(0);
  
	useEffect(() => {
	  if (imageData1 && imageData2) {
		// Perform image differencing
		const differenceImageData = new Uint8ClampedArray(imageData1.length);
		for (let i = 0; i < imageData1.length; i += 4) {
		  for (let j = i; j < i + 3; j++) {
			differenceImageData[j] = Math.abs(imageData1[j] - imageData2[j]);
		  }
		  differenceImageData[i + 3] = 255; // Set alpha channel to opaque
		}
  
		// Compute green coverage percentage from the difference image
		const percentage = computeGreenCoveragePercentage(differenceImageData);
		setGreenCoveragePercentage(percentage);
	  }
	}, [imageData1, imageData2]);
  
	const handleImageUpload = (event, setImageData) => {
	  const file = event.target.files[0];
	  const reader = new FileReader();
  
	  reader.onload = function (e) {
		const img = new Image();
		img.onload = function () {
		  const canvas = document.createElement('canvas');
		  canvas.width = img.width;
		  canvas.height = img.height;
		  const ctx = canvas.getContext('2d');
		  ctx.drawImage(img, 0, 0);
		  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		  setImageData(imageData);
		};
		img.src = e.target.result;
	  };
  
	  reader.readAsDataURL(file);
	};
  
	return (
	  <div>
		<h1>Green Coverage Computation</h1>
		<div>
		  <label>Upload Image 1:</label>
		  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImageData1)} />
		</div>
		<div>
		  <label>Upload Image 2:</label>
		  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImageData2)} />
		</div>
		<div>
		  <h2>Green Coverage Percentage: {greenCoveragePercentage}%</h2>
		</div>
	  </div>
	);
  }


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Green compute</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<GreenCoverageComputation onLogout={handleLogout} />
		</div>
	);
};

export default Main;
