import React, {ComponentPropsWithoutRef} from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'medium' | 'large';
}

const defaultProps = {
  size: 'medium',
};

const sizes = {
  small: 32,
  medium: 46,
  large: 64,
};


export const Button = (props: ButtonProps & typeof defaultProps) => {
  const {size: _size, className, style, ...rest} = props;
  const size = sizes[_size];

  return (
    <button
      className={'bg-primary border-radius text-primary p-4 bold pointer button ' + className}
      style={{
        border: 'white 3px solid',
        fontSize: 'larger',
        textTransform: 'uppercase',
        height: size,
        ...style,
      }}
      {...rest}
    />
  );
};

Button.defaultProps = defaultProps;

export default Button;