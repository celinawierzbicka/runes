import React from "react";
import { Alert, Input as AntInput } from "antd";

interface IInputProps {
  number: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const Input = ({ number, onChange, error }: IInputProps) => {
  return (
    <div className="input-wrapper">
      <AntInput
        className="input"
        type="number"
        min={1}
        max={9999}
        placeholder="Enter number..."
        value={number || ""}
        onChange={onChange}
      />
      {error && <Alert className="alert" message={error} type="error" />}
    </div>
  );
};

export default Input;
