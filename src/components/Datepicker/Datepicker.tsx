import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface IDatepickerProps {
  onChange?: (date: Date) => void;
}

const Datepicker = ({
  onChange,
  ...props
}: IDatepickerProps & Omit<DatePicker['props'], 'onChange'>) => {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      selected={date}
      onChange={(changeDate: typeof date) => {
        setDate(changeDate);
        onChange && onChange(changeDate);
      }}
      open={true}
      shouldCloseOnSelect={true}
      {...props}
    />
  );
};

export default Datepicker;
