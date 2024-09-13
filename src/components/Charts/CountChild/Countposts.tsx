import { useEffect, useState } from 'react';
import axios from 'axios';

// Update the interface to reflect post data
interface PostData {
  posts: number; // Assuming the API returns post counts under this key
  start: string;
}

const useTotalPostCount = (timeFrame: string) => {
  const [totalPostCount, setTotalPostCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      const startDate = `${currentYear}-01-01`;
      const endDate = `${currentYear}-12-31`;

      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(
          `${baseUrl}/statistics/timeline?from=${startDate}&to=${endDate}&timeFrame=${timeFrame}`
        );

        let totalCount = 0;

        if (timeFrame === 'monthly') {
          const monthlyData = Array(12).fill(0);
          response.data.forEach((item: PostData) => {
            const month = new Date(item.start).getMonth();
            if (month >= 0 && month <= 11) {
              monthlyData[month] += item.posts; // Update to use `item.posts`
            }
          });
          totalCount = monthlyData.reduce((a, b) => a + b, 0);
        } else if (timeFrame === 'weekly') {
          totalCount = response.data.reduce(
            (acc: number, item: PostData) => acc + item.posts, // Update to use `item.posts`
            0
          );
        }

        setTotalPostCount(totalCount);
      } catch (error) {
        console.error('Error fetching the API data', error);
      }
    };

    fetchData();
  }, [timeFrame]);

  return totalPostCount;
};

export default useTotalPostCount;
