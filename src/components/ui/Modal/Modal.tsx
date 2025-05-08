import styles from './Modal.module.scss';

interface ModalProps {
    className?: string
    isModalOpen: boolean
    closeModal: () => void
    children: React.ReactNode
}

const Modal = ({
    className,
    isModalOpen,
    closeModal,
    children,
}: ModalProps) => {

    return (
        <>
            {isModalOpen &&
                (<div className="fixed top-0 left-0 w-screen h-screen bg-opacity-50 flex items-center justify-center z-50 backdrop-blur" onClick={closeModal}>
                    <div className={`bg-(--component-color) rounded-md p-4 ${styles.modal} ${className} `} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
                )}
        </>
    )
}

export default Modal;