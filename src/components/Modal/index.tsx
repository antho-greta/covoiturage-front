import {Button} from "@/components/ui/button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

function Modal({children, isOpen, handleClose}: ModalProps) {
    return (
        <div id="static-modal" data-modal-backdrop="static"  aria-hidden="true"
             className={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed inset-0 z-50
              ${isOpen ? 'block' : 'hidden'}`}
             onClick={handleClose}
        >
            {isOpen && <div className="fixed inset-0 bg-black opacity-50"></div>}
            <div className="relative p-4 w-full max-w-2xl max-h-[500px]" onClick={(e) => e.stopPropagation()}>
                <div className="relative bg-white rounded-lg shadow dark:bg-bleuFonce">
                    <div>
                        <Button className="absolute top-4 right-4" onClick={handleClose}><FontAwesomeIcon
                            icon={faClose}/></Button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;