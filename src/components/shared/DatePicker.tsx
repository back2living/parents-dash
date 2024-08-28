"use client"
import {CalendarDays} from "lucide-react";
import {format} from "date-fns"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Dispatch, SetStateAction, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

interface IDatePicker {
    isDOB?: boolean;
    date?: Date | undefined;
    setDate?: Dispatch<SetStateAction<Date | undefined>>
}

const variants = {
    initial: {
        opacity: 0,
        y: -100,
        height: 0,
        transition: {},
    },
    final: {
        opacity: 1,
        height: "auto",
        y: 0,
        transition: {duration: 0.8}
    },
    exit: {
        opacity: 0,
        height: 0,
        y: 0
    }
}

export function DatePickerForm({isDOB, setDate, date}: IDatePicker) {
    const [showDate, setShowDate] = useState<boolean>(false)

    return (
        <div>
            <label className={"text-sm auth-label"}>{isDOB ? "Date of birth" : "End date"}</label>
            <div>
                <Button
                    type={"button"}
                    onClick={() => setShowDate(!showDate)}
                    variant={"outline"}
                    className={cn(
                        "w-full h-12 text-left text-primary font-medium",
                        !date && "text-secondary text-sm"
                    )}
                >
                    {date ? (
                        format(date, "PPP")
                    ) : (
                        <span className={"text-secondary text-sm font-medium"}>DD/MM/YYYY</span>
                    )}
                    <CalendarDays className="ml-auto h-4 w-4 opacity-50"/>
                </Button>
            </div>

            <AnimatePresence>
                {showDate && <motion.div variants={variants} transition={{duration: 0.8}} initial={"initial"} animate={"final"} exit={"exit"}>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        onDayClick={() => setShowDate(false)}

                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}