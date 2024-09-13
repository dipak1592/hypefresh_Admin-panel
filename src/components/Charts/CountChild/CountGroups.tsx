import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the interface for the API response
interface GroupData {
  start: string;
  end: string;
  users: number;
  posts: number;
  comments: number;
  groups: number; // Assuming each data item has a 'groups' property
}

const useTotalGroupCount = (timeFrame: string) => {
  const [totalGroupCount, setTotalGroupCount] = useState<number>(0);

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

        // Calculate total group count
        let totalCount = response.data.reduce(
          (acc: number, item: GroupData) => acc + item.groups,
          0
        );

        setTotalGroupCount(totalCount);
      } catch (error) {
        console.error('Error fetching the API data', error);
      }
    };

    fetchData();
  }, [timeFrame]);

  return totalGroupCount;
};

export default useTotalGroupCount;
