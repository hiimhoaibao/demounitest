import { useCallback, useEffect, useState } from "react";
import { getStudentReports } from "@/services";

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

const filterData = (studentData: number[], searchKeyword: string): number[] => {
  return studentData.filter((s) =>
    s.toString().toLowerCase().includes(searchKeyword.toLowerCase().trim())
  );
};

const StudentTab = ({ courseId, sectionId }: StudentTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [fallback, setFallback] = useState("");

  const fetchStudentData = useCallback(() => {
    setIsLoading(true);
    getStudentReports(courseId, sectionId)
      .then((res) => {
        const { data, fallbackMessage } = res.data;
        if (fallbackMessage) {
          setFallback(fallbackMessage);
          setStudentData([]);
        } else {
          setFallback("");
          setStudentData(data);
        }
      })
      .catch(() => {
        setStudentData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [courseId, sectionId]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  const onSearch = (searchText: string): void => {
    setSearchKeyword(searchText);
  };

  const tableData = filterData(studentData, searchKeyword);

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
