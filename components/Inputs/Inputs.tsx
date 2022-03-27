import { ChangeEventHandler, useState } from "react";

import { Arrow } from "../LocalesDropdown/LocalesDropdown.icons";

interface InputProps {
  className?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({
  className,
  label,
  placeholder,
  defaultValue,
  value,
  disabled,
  onChange,
  name,
  id,
  required
}: InputProps) => {
  if (value || value?.length === 0) {
    // value?.length === 0 for initial values from props that are set to "" by default
    return (
      <div className={`${className} last:mr-0`}>
        {label ? (
          <label className="text-xs font-semibold uppercase text-slate-500">
            {label}
          </label>
        ) : null}
        <div
          className={`mt-1 mr-4 flex h-10  items-center rounded border ${
            disabled ? "border-gray-300 bg-gray-200" : ""
          }`}
        >
          <input
            className="pl-3 focus:outline-none disabled:bg-gray-200"
            type="text"
            placeholder={placeholder}
            maxLength={150}
            value={value}
            disabled={disabled}
            onChange={onChange}
            autoComplete="off"
            id={id}
            name={name}
            required={required}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${className} last:mr-0`}>
        <label className="text-xs font-semibold uppercase text-slate-500">
          {label}
        </label>
        <div
          className={`mt-1 mr-4 flex h-10  items-center rounded border ${
            disabled ? "border-gray-300 bg-gray-200" : ""
          }`}
        >
          <input
            className="w-full pl-3 focus:outline-none disabled:bg-gray-200"
            type="text"
            placeholder={placeholder}
            maxLength={150}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            autoComplete="off"
          />
        </div>
      </div>
    );
  }
};

interface SelectInputProps {
  label: string;
  className: string;
  currentField: string;
  setCurrentField: Function;
  data: string[];
}

export const SelectInput = ({
  className,
  label,
  data,
  currentField,
  setCurrentField
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={`${className}`}>
      <span className="text-xs font-semibold uppercase text-slate-500">
        {label}
      </span>
      <div className="mt-1 mr-4 flex h-10 items-center rounded border">
        <button
          type="button"
          className="flex flex-1 items-center justify-between pl-3"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{currentField ? currentField : "Select field..."}</span>
          <div className="border-l border-gray-300 p-2">
            {isOpen ? (
              <Arrow className="mx-2 h-3 w-3 rotate-180" />
            ) : (
              <Arrow className="mx-2 h-3 w-3" />
            )}
          </div>
        </button>
      </div>
      {isOpen ? (
        <div>
          <div
            className="fixed inset-0  bg-black opacity-20"
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className={`${className} absolute mr-4 overflow-hidden rounded border bg-white shadow-xl`}
          >
            {data.map((item, i) => (
              <span
                key={i}
                className="flex h-10 cursor-pointer items-center items-center py-2.5 pl-3 pr-3 hover:bg-gray-100"
                onClick={() => {
                  setCurrentField(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
