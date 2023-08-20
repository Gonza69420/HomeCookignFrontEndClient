import {Box, Button, Menu, MenuItem, Modal, Select, TextField} from "@mui/material";
import {Profileimage} from '../../components/profileimage';
// @ts-ignore
import {DatePickerClient} from "../TimePicker/DatePickerClient.tsx";
import {useState} from "react";
import { MenuChef} from "../../objects/Menu";
import {DateSolicitude} from "../../objects/Date";
import "./CreateSolicitude.css";
import * as dayjs from "dayjs";
import toast from "react-hot-toast";
import {PayMentPopUp} from "../AcceptPayment/PayMentPopUp.tsx";
import {EventCalendar} from "../../objects/EventCalendar.tsx";
import {GetAvailableDates, GetHoursFromDate} from "../../queries/DateQueries.tsx";
import {AddMenu, MenuAndPrice, MenuInterface} from "./AddMenu/AddMenu.tsx";

interface Props{
    open: boolean;
    chefName: string;
    imageURL : string;
    menus : MenuInterface[];
    setClose : (open : boolean) => void;
    tarjetas : string[];
    chefMail : string;
    idChef : string;
}

interface dateAndString{
    date : Date;
    string : String;
    id : String;
}

export const CreateSolicitude = (props : Props) => {
    const [date, setDate] = useState<string>("");
    const [hoursSelect , setHoursSelect] = useState<string[]>([]);
    const [hour, setHour] = useState<string>("");
    const [menu, setMenu] = useState<MenuChef>();
    const [number, setNumber] = useState<number>(0);
    const [payment , setPayment] = useState<boolean>(false);
    const[open , setOpen] = useState<boolean>(false);

    const [events, setEvents] = useState<EventCalendar[]>([]);

    const {loading , data, error} = GetAvailableDates( props.chefMail, {
        onCompleted: (data) => {
            setEvents(data);
        },
        onError: (error) => {
            console.log(error);
        }
    })


    const handleHourChange = (event : any) => {
        setHour(event.target.value);
    }

    const handleMenuChange = (event : any) => {
        props.menus.map((menu) => {
            if(menu.name == event.target.value){
                setMenu(menu);
            }
        }
        )
    }

    const handleClose = () => {
        props.setClose(false);
    }

    const onChangeDate = (date : Date) => {
        setDate(getYearMonthDay(new Date(date)));
        GetHoursFromDate(props.chefMail, getYearMonthDay(new Date(date)), {
            onCompleted: (data) => {
                setHoursSelect(data);
            },
            onError: (error) => {
                toast.error(error.message)
            }
        }).then(r => console.log(r))
        }

    const showPrice = () : boolean => {
        if (menu != undefined && number != 0){
            return true;
        }else {
            return false;
        }
    }

    const getYearMonthDay = (datee : Date) => {
        let date = new Date(datee);
        let month : string = (date.getMonth() + 1).toString();
        let day : string = date.getDate().toString();
        if (date.getMonth() + 1 < 10) {
            month = "0" + (date.getMonth() + 1).toString();
        }
        if (date.getDate() < 10) {
            day = "0" + date.getDate().toString();
        }
        return date.getFullYear() + "-" + month + "-" + day;
    }
    function removeDuplicatesByDate(arr : dateAndString[]) {
        return arr.filter((e, i) => arr.findIndex(a => getYearMonthDay(a.date) === getYearMonthDay(e.date)) === i);
    }
    const getDatesFromEventCalendars = (event : EventCalendar[]) :dateAndString[] => {

        let dates : dateAndString[] = [];
        event.map((eventCalendar) => {
            dates.push(
                {
                    date : eventCalendar.eventDate.date,
                    string: getYearMonthDay(eventCalendar.eventDate.date),
                    id : eventCalendar.id
                }
            );
        })
        dates.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        })

        return removeDuplicatesByDate(dates);

    }

    const createMenuAndPrice = () : MenuAndPrice[] => {
        let menuAndPrice : MenuAndPrice[] = [];
        for (let i = 0; i < props.menus.length; i++) {
            menuAndPrice.push({menu : props.menus[i], quantity : 0, id : props.menus[i].id})
        }
        return menuAndPrice;
    }

    const [menuAndQuantity , setMenuAndQuantity] = useState<MenuAndPrice[]>(createMenuAndPrice());

    const[price , setPrice] = useState<number>(0);

    const getTotalPrice = () : number => {
        return Math.ceil(price * 1.10);
    }

    const proceedToPayment = () => {
        console.log(price)
        if (date == undefined || hour == "" || price == 0){
            toast.error("Por favor llenar todos los campos");
            return;
        }

        setPayment(true);
    }


    const getEventCalendarID = (date : string , hour : string) : string => {
        events.map((event) => {
            if (getYearMonthDay(event.eventDate.date) == date){
                let hours = [];
                GetHoursFromDate(props.chefMail, getYearMonthDay(event.eventDate.date), {
                    onCompleted: (data) => {
                        hours = data;
                    },
                    onError: (error) => {
                        toast.error(error.message)
                    }
                })
                if (hours.includes(hour)){
                    return event.id;
                }
            }})
        return "";
    }


    return(
        <>
            <Modal open={props.open}>
                <div>
                    <AddMenu open={open} setOpen={setOpen} Menus={menuAndQuantity} setMenus={setMenuAndQuantity} setPrice={setPrice}></AddMenu>
                <Box className={"BoxCreateSolicitude"}>
                    <div className={"tituloCreateSolicitude"}>
                        <h1 className={"ChefNameCreateSolcitude"}>{props.chefName}</h1>
                        <Profileimage classname={"imageChefPayment"} src={props.imageURL} personalizar={false}/>
                    </div>

                    <div className={"divfechaCreateSolicitude"}>
                        <h2 className={"fechaCreateSolicitude"}>Fecha: </h2>
                        <div className={"datePickerClientSolicitude"}>
                            <DatePickerClient onChange={onChangeDate} allowedDates={getDatesFromEventCalendars(events)}></DatePickerClient>
                        </div>
                    </div>

                    <div className={"divfechaCreateSolicitude"}>
                        <h2 className={"fechaCreateSolicitude"}>Hora: </h2>
                        <Select className={"selectHourCreateSolicitude"} onChange={(hourr) => handleHourChange(hourr)} label={"Hour"} >
                            {hoursSelect.map((hour, index) => {
                                return(
                                    <MenuItem value={hour} key={index}>{hour}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>

                    <div className={"divfechaCreateSolicitude"}>
                        <h2 className={"fechaCreateSolicitude"}>Menu: </h2>
                        <Button variant={"contained"} className={"selectMenuCreateSolicitude"} onClick={() => setOpen(true)}>Seleccionar Menu</Button>
                    </div>

                    <div className={"divfechaCreateSolicitude"}>
                        { showPrice() &&
                            <>
                                <h2 className={"fechaCreateSolicitude"}>Precio: </h2>
                                <h2 className={"precioCreateSolicitude"}>{price} + 10%</h2>
                            </>
                        }
                        <div className={"buttonCreateSolicitude"}>
                            <Button variant="contained" color="success" className={"siguienteCreateSolicitude"} onClick={proceedToPayment}>Siguiente</Button>
                            <Button variant="contained" color="error" onClick={handleClose} className={"cancelarCreateSolicitude"}>Cancelar</Button>
                        </div>
                    </div>


                </Box>
                {payment &&
                    <PayMentPopUp idChef={props.idChef} calendarEventID={getEventCalendarID(date , hour)} setClose={setPayment} ammount={getTotalPrice()} open={payment} cardList={props.tarjetas} chefMenu={menuAndQuantity} chefName={props.chefName} fecha={date + " " + hour}></PayMentPopUp>
                }
                </div>
            </Modal>
        </>
    )
}