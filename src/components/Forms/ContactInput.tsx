"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value?: string;
  defaultValue?: string;
  readonly?: boolean;
  onChange?: any;
}

const ContactInput: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  value,
  defaultValue,
  readonly = false,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the input value
    register(id, { required }).onChange(e);
  };
  return (
    <div className="pt-4">
      <div className="w-full relative">
        <input
          autoComplete="off"
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          type={type}
          placeholder=""
          className={`
              peer
              w-full
              py-2
              pt-6
              outline-none
              bg-white
              font-light
              border-b-2
              transition
              disabled:opacity-70
              disabled:cursor-not-allowed
              ${errors[id] ? "border-rose-400" : "border-slate-300"}
              ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}
              `}
        />
        <label
          htmlFor={id}
          className={`absolute
      cursor-text
      text-md
      duration-150
      transform
      -translate-y-6
      top-5
      z-10
      origin-[0]
      left-0
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${errors[id] ? "text-rose-500" : "text-slate-400"}
      `}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default ContactInput;
