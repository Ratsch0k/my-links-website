import Dialog from "../components/Dialog";
import DialogTitle from "../components/DialogTitle";
import licensesText from './_licenses';

export interface LicensesProps {
  close(): void;
}

const Licenses = (props: LicensesProps) => {
  const {close} = props;

  return (
    <Dialog sx={{content: {maxWidth: 600}}}>
      <DialogTitle onClose={close}>
        Lizensen
      </DialogTitle>

      <pre style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: 600, whiteSpace: 'break-spaces'}}>
        {licensesText}
      </pre>
    </Dialog>
  )
}


export default Licenses;