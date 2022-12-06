import useStudentTabHook from "./useStudentTabHook";

export interface StudentTabProps {
  courseId: number;
  sectionId: number;
}

const FallbackSuspense = () => <div>Fallback Suspense</div>;
const ReloadComponent = ({ action }: any) => (
  <button onClick={action}>Reload</button>
);
const TableFilter = ({ children }: any) => <div>{children}</div>;
const TableComponent = ({ tableData }: any) => <div>{tableData}</div>;
const renderNoResultsFound = () => <div>No results found</div>;

const StudentTab = ({ courseId, sectionId }: StudentTabProps) => {
  const {
    isLoading,
    searchKeyword,
    fallback,
    onSearch,
    fetchStudentData,
    tableData,
  } = useStudentTabHook({ courseId, sectionId });

  if (isLoading) {
    return <FallbackSuspense />;
  }

  if (fallback) {
    return <ReloadComponent action={fetchStudentData} />;
  }

  return (
    <div>
      <h3>How are my students performing across assignments?</h3>
      <TableFilter
        filterHidden
        searchKeyword={searchKeyword}
        onSearch={onSearch}
        searchPlaceholder="Search by student name"
      >
        <h4>
          Displaying 50 of 50 students&apos; engagement from best assignment
          attempt
        </h4>
      </TableFilter>
      <TableComponent tableData={tableData} />
      {!tableData.length && renderNoResultsFound()}
    </div>
  );
};

export {
  FallbackSuspense,
  ReloadComponent,
  TableFilter,
  TableComponent,
  renderNoResultsFound,
};
export default StudentTab;
