import ReactDOM from 'react-dom'
import { useEffect } from 'react';

type ModalProps = {
    children: React.ReactNode,
    onClose: () => void,
    actionBar: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ children, onClose, actionBar }) => {

    //block scrolling when modal opens
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        //cleanup
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    //fixed classes instead of absolute, so it displayed wherever we are scrolled
    return ReactDOM.createPortal(
        <div>
            <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className="fixed inset-40 p-10 bg-white rounded">
                <div className="flex flex-col justify-between h-full">
                    {children}
                    <div className="flex justify-end">{actionBar}</div>
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')!
    );
}

export default Modal;
export type { ModalProps };
