"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className='pt-4'>
      <div className='w-full relative'>
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=''
          className={`
              peer
              w-full
              py-4
              pt-6
              outline-none
              bg-white
              font-light
              border-b-2
              transition
              disabled:opacity-70
              disabled:cursor-not-allowed
              overflow-hidden
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
      top-6
      z-10
      origin-[0]
      left-0
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-6
      ${errors[id] ? "text-rose-500" : "text-slate-400"}
      `}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default TextArea;
