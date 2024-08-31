import {categoryStyle} from "@/components/routes/tasks/Category";
import {IChecklistTaskKid} from "@/interfaces/TaskInterface";
import {Dispatch, SetStateAction} from "react";

interface ICategoriesComponent {
    data: IChecklistTaskKid[];
    activeKidTab: IChecklistTaskKid;
    setActiveKidTab:  Dispatch<SetStateAction<IChecklistTaskKid>>;
    setActiveTabIndex: Dispatch<SetStateAction<number>>;
}

const Categories = ({activeKidTab, setActiveKidTab, data, setActiveTabIndex}: ICategoriesComponent) => {
    const handleKidClick = (item: IChecklistTaskKid, index: number) => {
        setActiveKidTab(item);
        setActiveTabIndex(index)
    };
    return (
        <div className="p-2 min-w-[300px] w-[26.3%] rounded-xl max-w-[310px] bg-white overflow-auto hidden lg:block">
            <h3 className={"p-4 text-secondary-dark font-semibold"}>Kids</h3>

            {data.length === 0 && <p className={"font-medium text-secondary text-center"}>Please add a kid.</p>}

            {data?.length > 0 && <div className={"flex-column gap-2 font-medium"}>
                {data?.map((kid, index: number) => <div key={kid._id} onClick={() => handleKidClick(kid, index)}
                                                        className={activeKidTab?._id === kid._id ? categoryStyle.active : categoryStyle.inactive}>
                    <div className={"flex-center gap-2"}>
                        <img className={"w-6 h-6 rounded-lg object-cover"} src={kid.avatar} alt=""/>
                        <div className={"text-[#363636] capitalize"}>{kid.firstName} {kid.lastName}</div>
                    </div>
                    <p className={"text-sm text-secondary"}>{kid.tasks.length}</p>
                </div>)}
            </div>}
        </div>
    );
};
export default Categories;