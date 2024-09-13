import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className=" ps-27 lg:ps-35 xl:ps-16 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-16.5  w-16.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="ps-2 xl:ps-2 text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="ps-2 text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
