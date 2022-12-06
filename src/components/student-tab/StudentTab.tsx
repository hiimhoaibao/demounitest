import useStudentTabHook from "./useStudentTabHook";

export interface StudentTabProps {
  courseId: number;
  sectionId: number;
}

const FallbackSuspense = () => <div>Fallback Suspense</div>;
const ReloadComponent = () => <div>ReloadComponent</div>;
const TableComponent = ({ tableData }: any) => <div>{tableData}</div>;
const renderNoResultsFound = () => <div>No results found</div>;

const StudentTab = ({ courseId, sectionId }: StudentTabProps) => {
  const { isLoading, fallback, fetchStudentData, tableData } =
    useStudentTabHook({ courseId, sectionId });

  if (isLoading) {
    return <FallbackSuspense />;
  }

  if (fallback) {
    return <ReloadComponent />;
  }

  return (
    <div>
      <h3>How are my students performing across assignments?</h3>
      <TableComponent tableData={tableData} />
      {!tableData.length && renderNoResultsFound()}
    </div>
  );
};

export {
  FallbackSuspense,
  ReloadComponent,
  TableComponent,
  renderNoResultsFound,
};
export default StudentTab;
