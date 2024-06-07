import {Plus} from "lucide-react";
import Category from "@/components/routes/tasks/Category";
import {categoriesData} from "@/constants/data";
import {useRouter} from "next/router";
import NewCategory from "@/components/routes/tasks/modal/NewCategory";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";

const Categories = () => {
    const [newCategoryModal, setNewCategoryModal] = useState<boolean>(false);

    const {query: {category}} = useRouter();

    const getStatus = (name: string) => name?.toLowerCase()?.includes(category as string);

    return (
        <div className="p-2 w-[26.3%] bg-white rounded-xl max-w-[310px] xl:min-h-[550px]">
            <h3 className={"p-4 text-secondary-dark font-semibold"}>Categories</h3>
            <div className={"flex-column gap-2 font-medium"}>
                {categoriesData.map((category) => <Category isActive={getStatus(category.name)} key={category.name} name={category.name} count={category.count} />)}

                <button onClick={() => setNewCategoryModal(true)} className={"ml-3 text-[#B1B1B1] flex-center gap-2 text-sm"}>
                    <Plus size={20} className={"text-[#B1B1B1]"}/> New Category
                </button>
            </div>

            <FormModal isOpen={newCategoryModal} style={`lg:w-[450px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                <NewCategory closeModal={() => setNewCategoryModal(false)} />
            </FormModal>
        </div>
    );
};

export default Categories;