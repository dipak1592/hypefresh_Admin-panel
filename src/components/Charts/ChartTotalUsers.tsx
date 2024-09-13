import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [], // This will be dynamically set based on the time frame
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Users',
        data: Array(12).fill(0), // Initialize with 12 zeros for 12 months
      },
    ],
  });

  const [timeFrame, setTimeFrame] = useState('monthly'); // State to track the time frame
  const [categories, setCategories] = useState<string[]>([
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]); // Categories for the x-axis

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

        let userData:any = [];
        let xCategories = [];

        // console.log(response.data)
        if (timeFrame === 'monthly') {
          userData = Array(12).fill(0);
          response.data.forEach((item: any) => {
            const month = new Date(item.start).getMonth();
            if (month >= 0 && month <= 11) {
              userData[month] += item.users;
            }
          });
          xCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        } else if (timeFrame === 'weekly') {
          // Assume the API response has weekly data with each entry for one week
          userData = response.data.map((item: any) => item.users);
          xCategories = response.data.map((item: any) => new Date(item.start).toLocaleDateString());
        }

        setCategories(xCategories);
        setState({
          series: [
            {
              name: 'Users',
              data: userData,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching the API data', error);
      }
    };

    fetchData();
  }, [timeFrame]); // Dependency array includes timeFrame to refetch data when it changes

  const handleTimeFrameChange = (frame: string) => {
    setTimeFrame(frame);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Users</p>
              <p className="text-sm font-semibold">{state.series[0].data.reduce((a, b) => a + b, 0)}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-items-center ">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            {/* <button
              className={`rounded py-1 px-3 text-xs font-medium ${timeFrame === 'day' ? 'bg-white shadow-card' : 'hover:bg-white hover:shadow-card'} dark:text-white dark:hover:bg-boxdark`}
              onClick={() => handleTimeFrameChange('day')}
            >
              Day
            </button> */}
            <button
              className={`rounded py-1 px-3 text-xs font-medium ${timeFrame === 'weekly' ? 'bg-white dark:bg-black shadow-card' : 'hover:bg-white hover:shadow-card'} dark:text-white dark:hover:bg-boxdark`}
              onClick={() => handleTimeFrameChange('weekly')}
            >
              Week
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium ${timeFrame === 'monthly' ? 'bg-white dark:bg-black shadow-card' : 'hover:bg-white hover:shadow-card'} dark:text-white dark:hover:bg-boxdark`}
              onClick={() => handleTimeFrameChange('monthly')}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{ ...options, xaxis: { ...options.xaxis, categories } }}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
