import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface IDownloadButtonProps {
  number: number;
  href?: string;
}

const DownloadButton = ({ number, href }: IDownloadButtonProps) => {
  return (
    <a download={`${number}.png`} href={href}>
      <Button icon={<DownloadOutlined />}>Download</Button>
    </a>
  );
};

export default DownloadButton;
