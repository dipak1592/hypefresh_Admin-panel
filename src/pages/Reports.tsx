import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
// import TableThree from '../components/Tables/TableThree';
// import TableTwo from '../components/Tables/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Reported Posts" />

      <div className="flex flex-col gap-10">
        <TableOne />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </>
  );
};

export default Tables;
