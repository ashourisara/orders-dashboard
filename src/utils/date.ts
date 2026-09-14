import dayjs from "dayjs";

export const formatToJalali = (isoDate: string): string => {
  return dayjs(isoDate).calendar("jalali").format("YYYY/MM/DD");
};
