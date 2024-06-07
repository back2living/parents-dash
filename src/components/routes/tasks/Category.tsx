import {useRouter} from "next/router";

interface ICategory {
    name: string;
    count: number;
    isActive?: boolean;
}

const style = {
    active: "flex-center-between p-3 bg-primary rounded-xl border border-[#E8E8E8]",
    inactive: "flex-center-between p-3 rounded-xl"
}

const Category = ({name, count, isActive}: ICategory) => {
    const router = useRouter();

    const category = name.split(" ")[1].toLowerCase();
    const handleClick = async () => router.push(`/tasks?category=${category}`);

    return (
        <div onClick={handleClick} className={isActive ? style.active : style.inactive}>
            <div className={"text-[#363636]"}>{name}</div>
            <p className={"text-sm text-secondary"}>{count}</p>
        </div>
    );
};

export default Category;