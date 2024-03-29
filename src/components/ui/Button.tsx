"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  className?: string;
  outline?: boolean;
  small?: boolean;
  custom?: boolean;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  className,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    disabled:opacity-70
    disabled:cursor-pointer
    hover:opacity-40
    transition
    w-full
    border-sky-500
    flex
    items-center
    justify-center
    gap-2
    cursor-pointer
    ${outline ? "bg-white" : "bg-sky-500"}
    ${outline ? "text-sky-500" : "text-white"}
    ${small ? "text-sm font-light" : "text-md font-semibold"}
    ${small ? "py-1 px-2 border-[1px]" : "py-2 px-4 border-2"} 
    ${custom ? custom : ""}
    ${className ? className : ""}
  `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
