import {useEffect, useRef} from "react";
import {Button} from "@/components/ui/button.tsx";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

function Modal({children, isOpen, handleClose}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const close = () => {
        dialogRef.current?.close();
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen && !dialogRef.current?.open) {
            dialog?.showModal(); // 👈 usage propre à l'élément <dialog>
        } else {
            dialog?.close(); // 👈 usage propre à l'élément <dialog>
        }
    }, [isOpen]);

    return (
        <dialog className="h-96 w-96" ref={dialogRef} onClose={handleClose}>
            {children}
            <Button onClick={close}>Fermer</Button>
        </dialog>
    );
}

export default Modal;