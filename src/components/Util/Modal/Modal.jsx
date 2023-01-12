import './Modal.css'


const Modal = ({title,onClose,children,modal,noClose =''}) => {
    return modal? (
        <>
        <div className = "modal-bg">
            <div className='modal'>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <span className={`modal-close-btn no-close-${noClose}`}onClick ={onClose}>X</span>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
        </> 
     ) :null;
}
 
export default Modal;