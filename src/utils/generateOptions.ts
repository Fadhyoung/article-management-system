import { OptionProps } from '@/types/OptionProps';

export const generateOptions = <T>(
  labelKey: keyof T,
  valueKey?: keyof T,
  data?: T[]
): OptionProps[] => {
  return (
    data?.map((item: T) => ({
      label: String(item[labelKey]),
      value: valueKey ? String(item[valueKey]) : String(item[labelKey]),
    })) || []
  );
};
