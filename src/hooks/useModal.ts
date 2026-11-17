import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return { showModal, setShowModal, openModal, closeModal };
};

export default useModal;
