import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../redux/ui/ui-slice";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal} >
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={() => dispatch(uiActions.hideModal())} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
