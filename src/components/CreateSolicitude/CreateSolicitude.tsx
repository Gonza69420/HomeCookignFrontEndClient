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
interface Props{
    open: boolean;
    chefName: string;
    imageURL : string;
    allowedDates : DateSolicitude[];
    menus : MenuChef[];
    setClose : (open : boolean) => void;
    tarjetas : string[];
}
export const CreateSolicitude = (props : Props) => {
    const [date, setDate] = useState<Date>(new Date());
    const [hoursSelect , setHoursSelect] = useState<string[]>([]);
    const [hour, setHour] = useState<string>("");
    const [menu, setMenu] = useState<MenuChef>();
    const [number, setNumber] = useState<number>(0);
    const [payment , setPayment] = useState<boolean>(false);

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
    const extractDates = () => {
        let dates : Date[] = [];
        props.allowedDates.map((date) => {
            dates.push(date.date);
        })
        return dates;
    }
    const [dateSelect, setDateSelect] = useState<Date[]>(extractDates());


    const handleNumberChange = (event : any) => {
        if (event.target.value >= 0) {
            setNumber(event.target.value);
        }
    }

    const handleClose = () => {
        props.setClose(false);
    }

    const onChangeDate = (date : Date) => {
        setDate(date);
        props.allowedDates.map((dateSolicitude) => {
            if(dayjs(dateSolicitude.date).isSame(date, "day")){
                setHoursSelect(dateSolicitude.hour);
            }
        }
        )

    }

    const showPrice = () : boolean => {
        if (menu != undefined && number != 0){
            return true;
        }else {
            return false;
        }
    }

    const proceedToPayment = () => {
        if (date == undefined || hour == "" || menu == undefined || number == 0){
            toast.error("Por favor llenar todos los campos");
            return;
        }

        setPayment(true);
    }

    const getTotalPrice = () : number => {
        return menu!.price * number * 1.10;
    }

    const getDateToString = () : string => {
        return dayjs(date).format("DD-MM-YYYY");
    }


    return(
        <>
            <Modal open={props.open}>
                <div>
                <Box className={"BoxCreateSolicitude"}>
                    <div className={"tituloCreateSolicitude"}>
                        <h1 className={"ChefNameCreateSolcitude"}>{props.chefName}</h1>
                        <Profileimage classname={"imageChefPayment"} src={props.imageURL} personalizar={false}/>
                    </div>

                    <div className={"divfechaCreateSolicitude"}>
                        <h2 className={"fechaCreateSolicitude"}>Fecha: </h2>
                        <div className={"datePickerClientSolicitude"}>
                            <DatePickerClient onChange={onChangeDate} allowedDates={dateSelect}></DatePickerClient>
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
                        <Select className={"selectHourCreateSolicitude"} onChange={(menu) => handleMenuChange(menu)} label={"Menu"}>
                            {props.menus.map((menu, index) => {
                                return(
                                    <MenuItem value={menu.name} key={index}>{menu.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>

                    <div className={"divfechaCreateSolicitude"}>
                        <h2 className={"fechaCreateSolicitude"}>Cantidad de personas: </h2>
                        <TextField value={number} onChange={(event) => handleNumberChange(event)} label="Personas">
                        </TextField>
                    </div>

                    <div className={"divfechaCreateSolicitude"}>
                        { showPrice() &&
                            <>
                                <h2 className={"fechaCreateSolicitude"}>Precio: </h2>
                                <h2 className={"precioCreateSolicitude"}>{menu?.price * number} + 10%</h2>
                            </>
                        }
                        <div className={"buttonCreateSolicitude"}>
                            <Button variant="contained" color="success" className={"siguienteCreateSolicitude"} onClick={proceedToPayment}>Siguiente</Button>
                            <Button variant="contained" color="error" onClick={handleClose} className={"cancelarCreateSolicitude"}>Cancelar</Button>
                        </div>
                    </div>


                </Box>
                {payment &&
                    <PayMentPopUp ammountPeople={number} setClose={setPayment} ammount={getTotalPrice()} open={payment} cardList={props.tarjetas} chefMenu={menu} chefName={props.chefName} fecha={getDateToString() + " " + hour}></PayMentPopUp>
                }
                </div>
            </Modal>
        </>
    )
}