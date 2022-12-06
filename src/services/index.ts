export const getStudentReports = async (
  courseId: number,
  sectionId: number
): Promise<{
  data: { data: any; fallbackMessage: string };
}> => {
  return Promise.resolve({ data: { data: [], fallbackMessage: "" } });
};
