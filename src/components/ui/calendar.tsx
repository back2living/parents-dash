import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center text-orange",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-orange rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative rounded-lg [&:has([aria-selected].day-range-end)]:rounded-lg [&:has([aria-selected].day-outside)]:bg-orange [&:has([aria-selected])]:bg-orange first:[&:has([aria-selected])]:rounded-lg last:[&:has([aria-selected])]:rounded-lg focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal hover:bg-orange/90 hover:text-white aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-orange text-white hover:bg-orange hover:text-slate-50 focus:bg-orange focus:text-slate-50",
        day_today: "bg-slate-300 text-slate-700",
        day_outside: "day-outside text-slate-500 opacity-50 aria-selected:bg-orange aria-selected:text-white aria-selected:opacity-100",
        day_disabled: "text-slate-500 opacity-50",
        day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
