import React, {Fragment} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {SelectedIcon} from "@/components/shared/Svg";

interface IFilterDropdown {
    filterOptionArray: string[];
    setSelected:  React.Dispatch<React.SetStateAction<string>>;
    selected: string;
    setIsFocus:  React.Dispatch<React.SetStateAction<boolean>>
    isFocus: boolean;
}

const FilterDropdown = ({filterOptionArray, setIsFocus, isFocus, setSelected, selected}: IFilterDropdown) => {
    return (
        <div>
            <Listbox value={selected} onChange={e => {
                setSelected(e);
            }}>
                <div className="relative">
                    <Listbox.Button onClick={() => setIsFocus(!isFocus)} className={`px-5 lg:px-8 py-3 flex-center justify-center gap-2 bg-primary rounded-full border-none`}>
                        <span className={`block font-medium text-secondary-dark text-sm capitalize`}>{selected ? selected : "Ongoing"}</span>
                        <span className="block pointer-events-none">{isFocus ? <ChevronUp color={"#868686"}/> : <ChevronDown color={"#868686"}/>}</span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="select-dropdown-box w-full max-h-[200px] z-50 left-0 lg:right-[-15px]">
                            <div>
                                {filterOptionArray?.map((item) => (
                                    <Listbox.Option
                                        onClick={() => setIsFocus(false)}
                                        key={item}
                                        className={({active}) => `rounded-lg relative cursor-default py-2 text-primary  ${active ? "bg-[#F9FAFB]" : ""}`}
                                        value={item}
                                    >
                                        {({selected}) => (
                                            <p className={`flex-center gap-2 ${selected ? "px-3" : "px-10"}`}>
                                                {selected && <span>{SelectedIcon}</span>}
                                                <span
                                                    className={`block text-primary capitalize dark:text-secondary-dark text-sm font-medium ${selected && "dark:text-[##363636]"}`}>{item}</span>
                                            </p>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </div>
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default FilterDropdown;