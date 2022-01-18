import Dialog, {DialogProps} from '../components/Dialog';
import DialogTitle from '../components/DialogTitle';
import licensesText from '../components/license-disclaimer';

export interface LicensesProps extends DialogProps {
  close(): void;
}

const Licenses = (props: LicensesProps) => {
  const {close, open} = props;

  return (
    <Dialog sx={{content: {maxWidth: '100%', width: 600}}} open={open}>
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