import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";
import useScrollPosition from '@react-hook/window-scroll'

const initialState = {
  ratio:0,
  wasVisible:false, 
  wasPassed:false, 
  isVisible:false, 
  direction:'none'
}
const useVisibility = (id, threshold = 0, steps = 100) => {
  const scrollY = useScrollPosition(10)
  const [state, setState] = useState({id, ...initialState})
  const { ref, entry } = useInView({ trackVisibility:true, delay:100, threshold: threshold || new Array(steps).fill(0).map((x,t)=> (t/steps))});
  const { intersectionRatio: ratio , intersectionRect : pos, boundingClientRect : bounds  } = entry || {};

  useEffect(()=>{
    if(ratio === undefined) return 
    const { innerHeight } = window;
    const { clientHeight, offsetTop } = entry.target;
    const pageRatio = Math.min(1, Math.max(0, (scrollY+innerHeight)-(offsetTop)) / (innerHeight+clientHeight) )

    setState({
      id,
      ratio,
      step: Math.ceil(ratio*steps),
      isVisible: ratio > 0,
      wasVisible: state.wasVisible || ratio ? true : false,
      wasPassed: state.wasPassed || ratio >= 0.90 ? true : false,
      direction: (bounds.top < 0) ? 'out' : 'in',
      pageRatio
    })
  }, [ratio, scrollY])
  return [ref, state]
}

export default useVisibility