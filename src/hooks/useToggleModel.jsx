import React from "react";

const useToggleModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const switchModal = (fn) => {
    setIsOpen(false);
    setTimeout(() => {
      fn();
    }, 300);
  };

  return [isOpen, toggleModal, switchModal];
};

export default useToggleModal;