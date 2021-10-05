import styles from "./Scroller.module.scss";
import useVisibility from "/lib/hooks/useVisibility"
import cn from 'classnames'

export default function Scroller({page}) {
  const blocks = new Array(20).fill({})
	return (
		<div className={styles.container}>
      {blocks.map((b, index) => <Block key={index} {...{index}}/>)}
		</div>
	);
}

const Block  = ({index, odd}) => {

	const [ref, state] =  useVisibility(index, 0.3, 100)
	const { wasPassed, wasVisible, direction : dir , ratio, step} = state;
	const scrollStyle = {}
	const statusStyle = cn(styles.status, dir === 'out' && styles.out)
	const boxStyle = cn(styles.box, {
		[styles.out] : dir === 'out',
		[styles.in] : dir === 'in' && ratio > 0.7,
		[styles.reset] : dir === 'out',

	})
	return (
		<div className={styles.block} ref={ref} >
			<div className={statusStyle}>{}<br/>{step}<br/>{ratio.toFixed(2)}</div>
			<div className={boxStyle} style={scrollStyle}>
				{step}
			</div>
		</div>
	)
}