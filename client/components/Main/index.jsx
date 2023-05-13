import React, {useState} from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import styles from "./Main.module.css";
import { Upload,  Typography } from "antd";
import GreenCoverageComputation from "./GreenCoverageComputation";
import InputFields from "./input"
const { Title } = Typography;


const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const [showBtns, setShowBtns] = useState(false);
  const handleClick = () => {
    setShowBtns(true);
  };

  const handleBack = () => {
    setShowBtns(false);
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Green Computation</h1>
        <Button
          className={styles.white_btn}
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </nav>
      {!showBtns ? (
        <div className={styles.content_container}>
          <img
            src="growingTree.gif" // Replace with the URL of your image or GIF
            alt="Green compute"
            className={styles.image}
          />
          <div className={styles.text_container}>
            <h2 className={styles.title}>Welcome to Green Coverage Computation</h2>
            <p className={styles.description}>
              Green coverage refers to the extent or percentage of an area that is covered by vegetation, such as trees,
              plants, grass, and other forms of greenery. It is a measure of the amount of land that is naturally or
              intentionally covered with vegetation, which plays a vital role in maintaining ecological balance and
              providing various environmental benefits.
            </p>
            <Button type="primary" onClick={handleClick} size="large">
                Compute Yourself
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.compute_container}>
          <Title level={2}>Green Coverage Computation</Title>
          <GreenCoverageComputation />
		  {/* <InputFields /> */}
          <Button onClick={handleBack} style={{ marginTop: 16 }}>
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default Main;
