import React, { useState, useEffect } from "react";
import { Upload, Button, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import Chart from "chart.js";
// import { Chart } from "react-chartjs-2";
import { useRef } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GreenCoverageComputation() {
  const [imageData1, setImageData1] = useState(null);
  const [imageData2, setImageData2] = useState(null);
  //   const [greenCoveragePercentage, setGreenCoveragePercentage] = useState(null);
  const [greenCoveragePercentage, setGreenCoveragePercentage] = useState(null);
  const [greenCoveragePercentageImg1, setGreenCoveragePercentageImg1] =
    useState(null);
  const [greenCoveragePercentageImg2, setGreenCoveragePercentageImg2] =
    useState(null);

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

  const handleImageUpload = (file, setImageData) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;
        setImageData(imageData);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleCalculate = () => {
    if (imageData1 && imageData2) {
      const differenceImageData = new Uint8ClampedArray(imageData1.length);
      for (let i = 0; i < imageData1.length; i += 4) {
        for (let j = i; j < i + 3; j++) {
          differenceImageData[j] = Math.abs(imageData1[j] - imageData2[j]);
        }
        differenceImageData[i + 3] = 255; // Set alpha channel to opaque
      }
      // Perform image computation and update the green coverage percentage
      const percentage = computeGreenCoveragePercentage(differenceImageData);
      const percentage1 = computeGreenCoveragePercentage(imageData1);
      const percentage2 = computeGreenCoveragePercentage(imageData2);
      setGreenCoveragePercentage(percentage);
      setGreenCoveragePercentageImg1(percentage1);
      setGreenCoveragePercentageImg2(percentage2);
    }
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            weight: 600,
          },
        },
      },
    },
    layout: {
      padding: 0,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            weight: 600,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          font: {
            weight: 600,
          },
        },
      },
    },

    maintainAspectRatio: true,
  };

  const labels = ["Image 1", "Image 2"];

  const data = {
    labels,
    datasets: [
      {
        data: [greenCoveragePercentageImg1, greenCoveragePercentageImg2],
        label: "Image 1 vs Image 2",
        backgroundColor: "rgba(100, 0, 255, 0.8)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      {/* <Title level={2}>Green Coverage Computation</Title> */}
      <div>
        <Upload
          beforeUpload={(file) => false}
          onChange={(info) => handleImageUpload(info.file, setImageData1)}
        >
          <Button icon={<UploadOutlined />} style={{ margin: '10px' }}>
  Upload Image 1
</Button>

        </Upload>
      </div>
      <div>
        <Upload
          beforeUpload={(file) => false}
          onChange={(info) => handleImageUpload(info.file, setImageData2)}
        >
          <Button icon={<UploadOutlined />} style={{ margin: '10px' }}>
  Upload Image 2
</Button>
        </Upload>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  <Button type="primary" onClick={handleCalculate}>
    Calculate
  </Button>
</div>

      <div>
        {greenCoveragePercentage !== null && (
          <>
            <h3>Total color Coverage Difference Percentage: {greenCoveragePercentage}%</h3>
            <div style={{ height: "200px" , width:"50%", margin:"20px"}}>
            <h3>Compare the green coverage area</h3>
        <div style={{ height: "100%" }}>
          <Bar data={data} options={options} />
        </div>
      </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GreenCoverageComputation;