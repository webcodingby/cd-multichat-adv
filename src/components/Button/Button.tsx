import styles from './Button.module.scss';
import { FC } from 'react'
import I, { buttonVariantType } from './types';
import getClassNames from '@utils/getClassNames';
import { PulseLoader } from 'react-spinners';

const switchVariants = (variant: buttonVariantType) => {
	switch(variant) {
		case 'default':
			return '';
		case 'danger':
			return styles.danger;
		case 'green':
			return styles.green
		case 'dark':
			return styles.dark
	}
}


const Button:FC<I> = (props) => {
	const {
		children,
		variant = 'default',
		isFill,
		isLoading,
		indicator,
		...buttonProps
	} = props

	return (
		<button
			{...buttonProps}
			className={getClassNames([styles.wrapper, 'text-ellipsis', switchVariants(variant), isFill && styles.fill, 'scale-effect-on-click', isLoading && styles.loading, props.className])}>
			{indicator && <div className={styles.ind}>{indicator}</div>}
			{isLoading && <div className={styles.loader}><PulseLoader color='#fff'/></div>}
			<div className={styles.in}>{children}</div>
		</button>
	)
}

export default Button;