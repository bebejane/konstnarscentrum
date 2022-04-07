import styles from "./Scroller.module.scss";
import useVisibility from "/lib/hooks/useVisibility"
import cn from 'classnames'
import { useState, useEffect } from "react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import lottieSearch from './83948-search.json'
import lottiePharmacy from './22477-pharmacy-store-drug-home-building-maison-mocca-animation.json'
import lottieFloating from './83030-floating-app-loading.json'
import lottieHubit from './83685-hubit.json'

export default function Scroller({page}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>top</div>
      <TextBlock/>
			<Animation src={lottieSearch} position="left"/>
			<Animation src={lottiePharmacy} position="right"/>
			<Animation src={lottieFloating} loop={true} autoplay={true} id={'last'} position="left"/>
			<Animation src={lottieHubit} loop={false} autoplay={false} id={'last'}/>
			<div className={styles.header}>
				bottom
			</div>
		</div>
	);
}

const TextBlock = ({index, odd}) => {

	const [ref, state] =  useVisibility(index, 0, 100)
	const { wasPassed, wasVisible, direction : dir , ratio, pageRatio, step} = state;
	const scrollStyle = {padding:'5%'}
	
	const content = 'Die frühere Grünen-Kanzlerkandidatin Annalena Baerbock will die Inbetriebnahme der mittlerweile zu Ende gebauten Erdgastrasse „Nord Stream 2“ verhindern, u. a. wegen eines Pokerspiels mit dem Gaspreis, das sie Präsident Putin unterstellt. Sie beweist damit eine Ideologisierung der grünen Außenpolitik, die hoffen lässt, dass in der Ampelkoalition das Auswärtige Amt durch eine kompetente Person aus den Reihen von SPD oder FDP besetzt wird.'
	const words = content.split(' ');
	const end = Math.floor(words.length*pageRatio)
	const text = words.filter((w, idx)=> idx < end).join(' ')

	return (
		<div className={styles.block} ref={ref} >
			<Status {...state} />
			<div style={scrollStyle} >
				{text}
			</div>
		</div>
	)
}


const Animation  = ({src, loop = true, autoplay = false, id, position = 'center'}) => {

	const [ref, state] =  useVisibility('anim', 0, 10)
	const { wasPassed, wasVisible, direction : dir , ratio, scrollRatio, step} = state;
	const [player, setPlayer] = useState()
	const [style, setStyle] = useState({})

	useEffect(()=>{
		if( !player ) return
		if( autoplay ) return wasVisible && player.isPaused && player.play()

		const { totalFrames } = player
		//const frame = wasPassed ? totalFrames : Math.min(totalFrames*(pageRatio*2), totalFrames)
		const frame = Math.min(totalFrames*(scrollRatio), totalFrames)
		player.setCurrentRawFrameValue(frame)
		setStyle({
			transform: `translateX(${(-2 + (scrollRatio*4))*50}%)`
		})
	}, [scrollRatio, wasVisible])

	return (
		<div className={cn(styles.block, styles[position])} ref={ref} >
			<Player
        lottieRef={(p)=>setPlayer(p)}
        loop={loop}
        controls={false}
				keepLastFrame={true}
				src={src}
        //style={style}
      />
			<Status {...state} />
		</div>
	)
}

const Status = ({step, ratio, scrollRatio, direction}) =>{
	const statusStyle = cn(styles.status, direction === 'out' && styles.out)
	
	return (
		<div className={statusStyle}>
			Dir: {direction} Step: {step}, Ratio: {ratio.toFixed(2)}, scrollRatio: {(scrollRatio*100).toFixed(0)}%
		</div>
	)
}