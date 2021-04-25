import React, { Component, useCallback } from "react";

interface SelectProps {
  options: ReadonlyArray<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  onChange: (value: string) => void;
}

const Select = ({ options, onChange }: SelectProps) => {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  return (
    <select onChange={handleChange}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
