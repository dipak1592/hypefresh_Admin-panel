import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
  users: number;
  start: string;
}

const useTotalUserCount = (timeFrame: string) => {
  const [totalUserCount, setTotalUserCount] = useState(0);

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
          response.data.forEach((item: UserData) => {
            const month = new Date(item.start).getMonth();
            if (month >= 0 && month <= 11) {
              monthlyData[month] += item.users;
            }
          });
          totalCount = monthlyData.reduce((a, b) => a + b, 0);
        } else if (timeFrame === 'weekly') {
          totalCount = response.data.reduce(
            (acc: number, item: UserData) => acc + item.users,
            0
          );
        }

        setTotalUserCount(totalCount);
      } catch (error) {
        console.error('Error fetching the API data', error);
      }
    };

    fetchData();
  }, [timeFrame]);

  return totalUserCount;
};

export default useTotalUserCount;
