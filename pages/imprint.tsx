import Dialog, {DialogProps} from '../components/Dialog';
import DialogTitle from '../components/DialogTitle';

export interface ImprintProps extends DialogProps {
  close(): void;
}

const Imprint = (props: ImprintProps) => {
  const {close, open} = props;

  return (
    <Dialog open={open}>
      <DialogTitle onClose={close}>
        Imprint
      </DialogTitle>


      Simon Lukas Kurz<br/>
      Kornweg, 1A<br/>
      64291 Darmstadt<br/><br/>

      <h4>Kontakt</h4>
      Telefon: +49 06151 2739858<br/>
      Telefax: +49 06151 2739858<br/>
      E-Mail: simon.kurz@rocketmail.com<br/>
    </Dialog>
  )
}

export default Imprint;