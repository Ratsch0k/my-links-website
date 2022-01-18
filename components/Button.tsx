import React, {FC} from 'react';
import {ComponentProps} from "../next-env";

export interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
}

export const Button: FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & ComponentProps & ButtonProps> = (props) => {
  const {id, className, style, children, size, ...rest} = props;

  return (
    <button
      id={id}
      className={'bg-primary border-radius text-primary p-4 bold pointer button ' + className}
      style={{
        border: 'white 3px solid',
        fontSize: 'larger',
        textTransform: 'uppercase',
        height: size === 'small' ? 32 : size === 'large' ? 64 : 46,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;