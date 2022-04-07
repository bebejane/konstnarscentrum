import styles from "./Scroller.module.scss";
import useVisibility from "/lib/hooks/useVisibility"
import cn from 'classnames'
import { useState, useEffect } from "react";

export default function Scroller({page}) {
  const [el, setEl] = useState(undefined)
  const [setRef, state] =  useVisibility('anim', 0, 10)
	const { wasPassed, wasVisible, direction : dir , ratio, scrollRatio, step } = state;
	
  useEffect(async ()=>{
    if(!el || wasVisible) return
    
    await el.animate({
      'transform' : 'translateX(100%)',
    }, { duration: 500, fill: 'forwards' }).finished
    
    await el.animate({
      'transform' : 'translateX(0%)'
    }, { duration:800, fill: 'forwards' }).finished

  }, [scrollRatio, wasVisible])


	return (
		<div className={styles.container}>
			<div className={styles.header}>top</div>
      <div className={cn(styles.header, styles.white)} ref={(ref)=>{setRef(ref); setEl(ref)}}>
        {(100*scrollRatio).toFixed(0)}%
      </div>
			<div className={styles.header}>
				bottom
			</div>
		</div>
	);
}

