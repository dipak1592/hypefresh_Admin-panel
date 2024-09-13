import { useState, useEffect, useRef } from 'react';
import Countcomment from '../Countcomments';

const useCommentStats = (timeFrame: string) => {
    const totalComments = Countcomment(timeFrame); // Assuming this returns a number
    const [rateChange, setRateChange] = useState<string>('0.00%');
    const [levelUp, setLevelUp] = useState<boolean>(true);
    const previousCountRef = useRef<number | null>(null);
  
    useEffect(() => {
      if (previousCountRef.current !== null) {
        const difference = totalComments - previousCountRef.current;
        const changeRate = ((difference / previousCountRef.current) * 100).toFixed(2);
        setRateChange(`${changeRate}%`);
        setLevelUp(difference >= 0);
      }
  
      // Update previousCountRef to current totalComments after calculating rateChange
      previousCountRef.current = totalComments;
    }, [totalComments]);
  
    return { totalComments, rateChange, levelUp };
  };
  
  export default useCommentStats;