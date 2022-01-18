import {FC} from "react";
import CloseIcon from "./icons/CloseIcon";

export interface DialogTitleProps {
  onClose(): void;
}

/**
 * ## Dialog Title
 * Shows the children is a label and a close icon button on the right.
 * Default way of
 *
 * @param props
 * @constructor
 */
const DialogTitle: FC<DialogTitleProps> = (props) => {
  const {onClose, children} = props;

  return (
    <h2>
      {children}
      <div className='pointer' onClick={onClose} style={{display: 'inline', textAlign: 'end', float: 'right'}}>
        <CloseIcon />
      </div>
    </h2>
  )
};

export default DialogTitle;