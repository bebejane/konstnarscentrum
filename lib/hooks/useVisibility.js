import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";

const initialState = {
  ratio:0,
  wasVisible:false, 
  wasPassed:false, 
  isVisible:false, 
  direction:'none'
}
const useVisibility = (id, threshold = 0, steps = 100) => {
  const [state, setState] = useState({id, ...initialState})
  const { ref, inView, entry } = useInView({ 
    threshold: new Array(steps).fill(0).map((x,t)=> t/100) 
  });
  let { intersectionRatio: ratio , intersectionRect : pos, boundingClientRect : bounds  } = entry || {};
  ratio = (ratio)/(steps/100)
  useEffect(()=>{
    if(!ratio) return 
    setState({
      id, 
      ratio,
      step:Math.round(ratio*steps),
      isVisible: ratio > 0,
      wasVisible: state.wasVisible || ratio ? true : false,
      wasPassed: state.wasPassed || ratio >= 0.99 ? true : false,
      direction: (bounds.top < 0) ? 'out' : 'in'
    })
  }, [ratio])
  return [ref, state]
}

export default useVisibility