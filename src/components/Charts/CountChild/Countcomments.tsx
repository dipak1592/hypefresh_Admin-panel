import { useEffect, useState } from 'react';
import axios from 'axios';

// Update the interface to reflect comment data
interface CommentData {
  comments: number; // Assuming the API returns comment counts under this key
  start: string;
}

const useTotalCommentCount = (timeFrame: string) => {
  const [totalCommentCount, setTotalCommentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      const startDate = `${currentYear}-01-01`; // Use template literals
      const endDate = `${currentYear}-12-31`;   // Use template literals

      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(
          `${baseUrl}/statistics/timeline?from=${startDate}&to=${endDate}&timeFrame=${timeFrame}` // Use template literals
        );

        let totalCount = 0;
        // console.log(response.data)
        if (timeFrame === 'monthly') {
          const monthlyData = Array(12).fill(0);
          response.data.forEach((item: CommentData) => {
            const month = new Date(item.start).getMonth();
            if (month >= 0 && month <= 11) {
              monthlyData[month] += item.comments; // Update to use `item.comments`
            }
          });
          totalCount = monthlyData.reduce((a, b) => a + b, 0);
        } else if (timeFrame === 'weekly') {
          totalCount = response.data.reduce(
            (acc: number, item: CommentData) => acc + item.comments, // Update to use `item.comments`
            0
          );
        }

        setTotalCommentCount(totalCount);
      } catch (error) {
        console.error('Error fetching the API data', error);
      }
    };

    fetchData();
  }, [timeFrame]);

  return totalCommentCount;
};

export default useTotalCommentCount;
