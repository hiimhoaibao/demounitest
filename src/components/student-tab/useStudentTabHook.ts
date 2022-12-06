import { useCallback, useEffect, useState } from "react";
import { getStudentReports } from "../../services";

interface StudentTabHookProps {
  courseId: number;
  sectionId: number;
}

type StudentTabHookResponseType = {
  isLoading: boolean;
  studentData: number[];
  searchKeyword: string;
  fallback: string;
  onSearch: (searchText: string) => void;
  fetchStudentData: () => void;
  tableData: number[];
};

const filterData = (studentData: number[], searchKeyword: string): number[] => {
  return studentData.filter((s) =>
    s.toString().toLowerCase().includes(searchKeyword.toLowerCase().trim())
  );
};

const useStudentTabHook = ({
  courseId,
  sectionId,
}: StudentTabHookProps): StudentTabHookResponseType => {
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

  return {
    isLoading,
    studentData,
    searchKeyword,
    fallback,
    onSearch,
    fetchStudentData,
    tableData,
  };
};

export default useStudentTabHook;
