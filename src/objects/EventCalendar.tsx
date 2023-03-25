export interface EventCalendar{
    id : number,
    eventDate : {
        id : number,
        date : Date,
        eventStart : Date,
        eventEnd : Date
    },
    description : string,
    available : string

}