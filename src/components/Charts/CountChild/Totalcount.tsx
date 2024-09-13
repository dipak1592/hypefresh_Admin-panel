import { useEffect, useState } from 'react';
import axios from 'axios';
const useTotalCount = (timeFrame: string, endpoint: string) => {
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        const currentYear = new Date().getFullYear();
        const startDate = `${currentYear}-01-01`;
        const endDate = `${currentYear}-12-31`;
  
        try {
          const response = await axios.get(
            `https://api-c.hypefresh.com/api/statistics/${endpoint}?from=${startDate}&to=${endDate}&timeFrame=${timeFrame}`
          );
  
          let count = 0;
          if (response.data && Array.isArray(response.data)) {
            if (timeFrame === 'monthly') {
              const monthlyData = Array(12).fill(0);
              response.data.forEach((item: { comments: number; start: string }) => {
                const month = new Date(item.start).getMonth();
                if (month >= 0 && month <= 11) {
                  monthlyData[month] += item.comments;
                }
              });
              count = monthlyData.reduce((a, b) => a + b, 0);
            } else if (timeFrame === 'weekly') {
              count = response.data.reduce(
                (acc: number, item: { comments: number }) => acc + item.comments,
                0
              );
            }
          }
  
          setTotalCount(count);
        } catch (error) {
          console.error('Error fetching the API data', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [timeFrame, endpoint]);
  
    return { totalCount, loading };
  };
  

export default useTotalCount;
