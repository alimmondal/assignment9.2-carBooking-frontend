import { getUserInfo } from "@/services/auth.service";
import { Modal } from "antd";
import { ReactElement, ReactNode } from "react";

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
  title: string | ReactNode;
  children: ReactElement;
  handleOk?: () => void;
  showCancelButton?: boolean;
  showOkButton?: boolean;
}

const UMModal = ({
  isOpen,
  closeModal,
  title,
  children,
  handleOk,
  showCancelButton = true,
  showOkButton = true,
}: IModal) => {
  const { role } = getUserInfo() as any;

  const okButtonProps = role
    ? {
        style: {
          display: showOkButton ? "inline" : "none",
          backgroundColor: "skyblue",
        },
        className: "text-black", // Replace with your custom class
      }
    : {
        style: { display: "none" },
        disabled: true,
      };

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={closeModal}
      cancelButtonProps={{
        style: { display: showCancelButton ? "inline" : "none" },
      }}
      okButtonProps={okButtonProps}
    >
      {children}
    </Modal>
  );
};

export default UMModal;
