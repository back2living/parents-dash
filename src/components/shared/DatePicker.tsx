"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {CalendarDays} from 'lucide-react';
import {format} from "date-fns"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

const FormSchema = z.object({
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
});

export function DatePickerForm({isDOB}: {isDOB?: boolean}) {
    const [showDate, setShowDate] = useState<boolean>(false)
    const [selected, setSelected] = useState<Date>();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const mobileVariants = {
        initial: {
            opacity: 0,
            y: -150,
            height: 0,
            transition: {},
        },
        final: {
            opacity: 1,
            height: "auto",
            y: 0,
            transition: {}
        },
        exit: {
            opacity: 0,
            height: 0,
            y: 0
        }
    }

    return (
        <>
            <div>
                <label className={"text-sm auth-label"}>{isDOB ? "Date of birth" : "End date"}</label>
                <div>
                    <Button
                        onClick={() => setShowDate(!showDate)}
                        variant={"outline"}
                        className={cn(
                            "w-full h-12 text-left text-primary font-medium",
                            !selected && "text-secondary text-sm"
                        )}
                    >
                        {selected ? (
                            format(selected, "PPP")
                        ) : (
                            <span className={"text-secondary text-sm font-medium"}>DD/MM/YYYY</span>
                        )}
                        <CalendarDays className="ml-auto h-4 w-4 opacity-50"/>
                    </Button>
                </div>

                <AnimatePresence>
                    {showDate && <motion.div variants={mobileVariants} transition={{duration: 1.4}} initial={"initial"} animate={"final"} exit={"exit"}>
                        <Calendar
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                            onDayClick={() => setShowDate(false)}

                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                    </motion.div>}
                </AnimatePresence>
            </div>
        </>
    )
}