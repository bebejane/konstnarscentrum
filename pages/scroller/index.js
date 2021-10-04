import styles from "./Scroller.module.scss";
import useVisibility from "/lib/hooks/useVisibility"
import cn from 'classnames'

export default function Scroller({page}) {
  const blocks = new Array(20).fill({})
	return (
		<div className={styles.container}>
      {blocks.map((b, index) => <Block {...{index}}/>)}
		</div>
	);
}

const Block  = ({index, odd}) => {

	const [ref, state] =  useVisibility(index, 0.3, 100)
	const { wasPassed, wasVisible, direction, ratio, step} = state;
	const scrollStyle = {}
	
	return (
		<div className={styles.block} ref={ref} >
			<div className={cn(styles.status, direction === 'out' && styles.out)}>{step} {state.id}</div>
			<div className={cn(styles.box, wasPassed && styles.boxAnim)} style={scrollStyle}></div>
		</div>
	)
}