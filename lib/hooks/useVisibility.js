import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";
import useScrollPosition from '@react-hook/window-scroll'

const initialState = {
  ratio: 0,
  scrollRatio: 0,
  step: 0,
  wasVisible: false, 
  wasPassed: false, 
  isVisible: false, 
  direction: undefined
}
const useVisibility = (id, threshold = 0, steps = 100) => {
  const scrollY = useScrollPosition(60)
  const [state, setState] = useState({id, ...initialState})
  const { ref, entry } = useInView({ trackVisibility:true, delay: 100, threshold: threshold || new Array(steps).fill(0).map((x,t)=> (t/steps))});
  const { intersectionRatio: ratio , intersectionRect : pos, boundingClientRect : bounds  } = entry || {};
  
  useEffect(()=>{
    if(ratio === undefined) return 

    const { innerHeight } = window;
    const { clientHeight, offsetTop } = entry.target;
    
    setState({
      id,
      ratio,
      scrollRatio: Math.min(1, Math.max(0, (scrollY+innerHeight)-(offsetTop)) / (innerHeight+clientHeight)),
      step: Math.ceil(ratio*steps),
      isVisible: ratio > 0,
      wasVisible: state.wasVisible || ratio ? true : false,
      wasPassed: state.wasPassed || ratio >= 0.90 ? true : false,
      direction: (bounds.top < 0) ? 'out' : 'in'
    })
  }, [ratio, scrollY])
  return [ref, state]
}

export default useVisibility