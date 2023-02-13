import {useState} from "react";
import {DatePicker, LocalizationProvider, PickersDay} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";
import * as dayjs from "dayjs";


interface Props{
    allowedDates : Date[];
    onChange : (date : any) => void;
}
export const DatePickerClient = (props : Props) => {
    const [value , setValue] = useState<Date>(new Date());

    const handleDateChange = (newValue : Date) => {
        setValue(newValue);
        props.onChange(newValue);
    }
    function isAllowedDate(date) {
        return props.allowedDates.some((allowedDate) => {
            return dayjs(allowedDate).isSame(date, "day");
        });
    }

    return(
        <div className={"divdatePickerClient"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className={"datePickerClient"}
                    value={value}
                    onChange={
                        (newValue) => {
                            handleDateChange(newValue);
                        }
                    }
                    renderInput={(params) => <TextField {...params} />}
                    shouldDisableDate={(date) => !isAllowedDate(date)}
                    label={"Date"}
                />
            </LocalizationProvider>
        </div>
    )

}