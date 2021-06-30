import React from "react";
import { Typography } from "antd";

const Header = () => {
  return (
    <>
      <Typography.Title className="title">Runic numbers</Typography.Title>
      <Typography.Text className="subtitle">
        Enter number between 1 and 9999 to reveal it's runic symbol!
      </Typography.Text>
    </>
  );
};

export default Header;
