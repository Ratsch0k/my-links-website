import {ComponentPropsWithoutRef} from 'react';

/**
 * Available sizes.
 */
export type Sizes = 'small' | 'medium' | 'large';

/**
 * Props for Icons.
 */
export interface IconPropsNoDefault extends ComponentPropsWithoutRef<'svg'> {
  size?: Sizes;
}

/**
 * Available sizes for icons.
 */
export const sizes = {
  small: 16,
  medium: 24,
  large: 32,
}

/**
 * Default props for icons.
 */
export const defaultIconProps = {
  size: 'medium',
}

export type IconProps = IconPropsNoDefault & typeof defaultIconProps;