import {ComponentPropsWithoutRef, CSSProperties, FC} from 'react';

export interface DialogProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Styling for specific components this component uses.
   */
  sx?: {
    root?: CSSProperties;
    content?: CSSProperties;
  }
}

/**
 * ## Dialog
 * Component for showing a dialog. Will fill the full available screen, and darken it a bit.
 * Children are rendered in the center of the screen with a background.
 */
const Dialog: FC<DialogProps> = (props) => {
  const {children, id, className, style, sx} = props;

  return (
    <div
      id={id}
      className={'absolute h-full w-full flex ' + className}
      style={{backgroundColor: 'rgba(0.0, 0.0, 0.0, 0.6)', alignSelf: 'center', ...style, ...sx?.root}}
    >
      <div className='p-16 border-radius bg-white' style={{margin: 'auto', ...sx?.content}}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;