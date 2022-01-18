import {defaultIconProps, IconProps, sizes} from './Icon';

const CloseIcon = (props: IconProps) => {
  const dimensions = sizes[props.size];

  return (
    <svg height={dimensions} width={dimensions} version='1.1' viewBox='0 0 26.458 26.458' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='m3.175 1.3229-1.8521 1.8521 21.96 21.96 1.8521-1.8521zm21.96 1.8521-1.8521-1.8521-21.96 21.96 1.8521 1.8521z' stroke='currentColor' strokeWidth='.26458px'/>
    </svg>
  );
};

CloseIcon.defaultProps = defaultIconProps;

export default CloseIcon;