import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

export const getStudentReports = async (
  courseId: number,
  sectionId: number
): Promise<{
  data: { data: any; fallbackMessage: string };
}> => {
  return Promise.resolve({ data: { data: [], fallbackMessage: "" } });
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
