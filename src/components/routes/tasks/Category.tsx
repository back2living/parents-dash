import {useRouter} from "next/router";

interface ICategory {
    name: string;
    count: number;
    isActive?: boolean;
}

export const categoryStyle = {
    active: "flex-center-between p-3 bg-primary rounded-xl border border-[#E8E8E8] cursor-pointer",
    inactive: "flex-center-between p-3 rounded-xl cursor-pointer"
}

const Category = ({name, count, isActive}: ICategory) => {
    const router = useRouter();

    const category = name.split(" ")[1].toLowerCase();
    const handleClick = async () => router.push(`/tasks?category=${category}`);

    return (
        <div onClick={handleClick} className={isActive ? categoryStyle.active : categoryStyle.inactive}>
            <div className={"text-[#363636]"}>{name}</div>
            <p className={"text-sm text-secondary"}>{count}</p>
        </div>
    );
};

export default Category;