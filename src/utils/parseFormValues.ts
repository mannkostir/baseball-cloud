export const parseFormValues = (values: {
  [key: string]: { label: string; value: string } | string | number | any[];
}) => {
  return Object.entries(values.values).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      let changeValue = value;

      if (!changeValue) return acc;

      if (Array.isArray(value)) {
        changeValue = value.map((item) => item.value);
      } else if (typeof value === 'object') {
        changeValue = Object.keys(value).includes('value')
          ? value.value
          : value;
        // changeValue = value?.label && value?.value ? value.value : '';
        if (!changeValue) return acc;
      } else if (+value > 0) {
        changeValue = +value;
      }

      acc[key] = changeValue;

      return acc;
    },
    {}
  );
};
