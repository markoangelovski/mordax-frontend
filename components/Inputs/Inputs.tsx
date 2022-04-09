import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";

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
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export const Input = ({
  className,
  label,
  placeholder,
  defaultValue,
  value,
  disabled,
  name,
  id,
  required,
  onChange,
  onKeyDown
}: InputProps) => {
  if (value || value?.length === 0) {
    // value?.length === 0 for initial values from props that are set to "" by default
    return (
      <div className={`${className ? className : ""} last:mr-0`}>
        {label ? (
          <label className="text-xs font-semibold uppercase text-slate-500">
            {label}
          </label>
        ) : null}
        {value || value?.length === 0 ? (
          <div
            className={`mt-1 mr-4 flex h-10 items-center overflow-hidden rounded border ${
              disabled ? "border-gray-300 bg-gray-200" : ""
            }`}
          >
            <input
              className="grow pl-3 focus:outline-none disabled:bg-gray-200"
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
              onKeyDown={onKeyDown}
            />
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className={`${className} last:mr-0`}>
        {label ? (
          <label className="text-xs font-semibold uppercase text-slate-500">
            {label}
          </label>
        ) : null}
        {defaultValue || defaultValue?.length === 0 ? (
          <div
            className={`mt-1 mr-4 flex h-10 items-center overflow-hidden rounded border ${
              disabled ? "border-gray-300 bg-gray-200" : ""
            }`}
          >
            <input
              className="grow pl-3 focus:outline-none disabled:bg-gray-200"
              type="text"
              placeholder={placeholder}
              maxLength={150}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={onChange}
              autoComplete="off"
            />
          </div>
        ) : null}
      </div>
    );
  }
};

interface SelectInputProps {
  label: string;
  placeholder?: string;
  className: string;
  currentField: string;
  setCurrentField: Function;
  data: string[];
}

export const SelectInput = ({
  className,
  label,
  placeholder,
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
          <span>
            {currentField ? (
              currentField
            ) : placeholder ? (
              <span className="text-sm">{placeholder}</span>
            ) : (
              "Select field..."
            )}
          </span>
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
            className="fixed inset-0 z-50 bg-black opacity-20"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute z-50 mr-4 min-w-[200px] overflow-hidden rounded border bg-white shadow-xl">
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
