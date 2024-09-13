import React, { useState,useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import TotalUsersChart from '../../components/Charts/ChartTotalUsers'
import TotalRepostedChart from '../../components/Charts/ChartTotalReposted';
import TotalGroupsChart from '../../components/Charts/ChartTotalGroups';
import TotalCommentChart from '../../components/Charts/ChartTotalComment';
import Countuser from '../../components/Charts/CountChild/Countusers'
import Countpost from '../../components/Charts/CountChild/Countposts'
import Countcomment from '../../components/Charts/CountChild/Countcomments'
import CountGroup from '../../components/Charts/CountChild/CountGroups'

const ECommerce: React.FC = () => {
  
  //users-datastate box
  const totalusers = Countuser("monthly");
  const [previousUserCount, setPreviousUserCount] = useState<number | null>(null);
  useEffect(() => {
     setPreviousUserCount(totalusers);
  }, [totalusers, previousUserCount]);
   
  //Groups-datastate-box
  const totalgroups = CountGroup("monthly"); // Use the custom hook for groups
  const [previousGroupCount, setPreviousGroupCount] = useState<number | null>(null);
  useEffect(() => {
    setPreviousGroupCount(totalgroups);
  }, [totalgroups, previousGroupCount]);

  //post-datastate box
  const totalposts = Countpost("monthly");
  const [previousPostCount, setPreviousPostCount] = useState<number | null>(null);
  useEffect(() => {
    setPreviousPostCount(totalposts);
  }, [totalposts, previousPostCount]);

  //comment-datastate-box
  const totalcomment = Countcomment("monthly");
  const [previousCommentCount, setPreviousCommentCount] = useState<number | null>(null);
  useEffect(() => {
    setPreviousCommentCount(totalcomment);
  }, [totalcomment, previousCommentCount]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Users" total={totalusers.toString()}>
          <svg
            className="fill-primary dark:fill-white w-10 h-10"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 9.5C13.2091 9.5 15 7.70914 15 5.5C15 3.29086 13.2091 1.5 11 1.5C8.79086 1.5 7 3.29086 7 5.5C7 7.70914 8.79086 9.5 11 9.5Z"
              fill=""
            />
            <path
              d="M3 16.5C3 13.4624 7.02944 11 11 11C14.9706 11 19 13.4624 19 16.5V17.5H3V16.5Z"
              fill=""
            />
          </svg>

        </CardDataStats>
        <CardDataStats title="Groups" total={totalgroups.toString()}>
         <svg
            className="fill-primary dark:fill-white w-10 h-10"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>

        </CardDataStats>
        <CardDataStats title="Posts" total={totalposts.toString()}>
        <svg
            className="fill-primary dark:fill-white w-10 h-10"
            width="18"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V4C22 3.44772 21.5523 3 21 3ZM12 17H6C5.44772 17 5 16.5523 5 16V13C5 12.4477 5.44772 12 6 12H12C12.5523 12 13 12.4477 13 13V16C13 16.5523 12.5523 17 12 17ZM18 17H14C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10H18C18.5523 10 19 10.4477 19 11V16C19 16.5523 18.5523 17 18 17Z"
                fill=""
            />
        </svg>


        </CardDataStats>
        <CardDataStats title="Comments" total={totalcomment.toString()}>
        <svg
          className="fill-primary dark:fill-white w-10 h-10 "
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            fill=""
          />
        </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TotalUsersChart />
        <TotalRepostedChart/>
        <TotalCommentChart/>
        <TotalGroupsChart/>
      </div>
    </>
  );
};

export default ECommerce;
