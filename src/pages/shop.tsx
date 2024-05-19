import DashboardLayout from "@/layouts/DashboardLayout";
import {shopData} from "@/constants/data";
import ShopCard from "@/components/routes/shop/ShopCard";
import NewCategory from "@/components/routes/shop/modal/NewCategory";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import NewItem from "@/components/routes/shop/modal/NewItem";

const Shop = () => {
    const [newCategoryModal, setNewCategoryModal] = useState(false);
    const [newItemModal, setNewItemModal] = useState(false);

    return (
        <DashboardLayout title={"Shop"}>
            <div className={"pb-10 overflow-hidden"}>
                <div className={"lg:flex-center-between mt-10"}>
                    <p className={"text-md lg:text-lg font-semibold text-[#515151]"}>Store items</p>

                    <div className={"font-semibold flex-center gap-4 lg:gap-6 mt-4"}>
                        <button onClick={() => setNewItemModal(true)} className={"primary-btn w-fit text-sm lg:text-base px-4 py-3 lg:p-4 lg:w-[160px]"}>New item +</button>
                        <button onClick={() => setNewCategoryModal(true)} className={"bg-primary lg:text-base text-sm text-primary w-fit px-4 py-3 lg:p-4 lg:w-[160px] rounded-full"}>New Category</button>
                    </div>
                </div>
                <div>
                    <div className={"flex-center font-semibold gap-4 mt-10"}>
                        <p className={"text-lg text-[#515151]"}>Wears</p>
                        <p className={"text-secondary"}>8 items</p>
                    </div>
                    <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                        {shopData.slice(0, 4).map((item, index) => <ShopCard key={index} item={item} />)}
                    </div>
                </div>
                <div>
                    <div className={"flex-center font-semibold gap-4 mt-10"}>
                        <p className={"text-lg text-[#515151]"}>Toys</p>
                        <p className={"text-secondary"}>12 items</p>
                    </div>
                    <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                        {shopData.slice(5, 9).map((item, index) => <ShopCard key={index} item={item} />)}
                    </div>
                </div>
                <div>
                    <div className={"flex-center font-semibold gap-4 mt-10"}>
                        <p className={"text-lg text-[#515151]"}>Toys</p>
                        <p className={"text-secondary"}>12 items</p>
                    </div>
                    <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                        {shopData.slice(9, 13).map((item, index) => <ShopCard key={index} item={item}/>)}
                    </div>
                </div>
            </div>

            <FormModal isOpen={newCategoryModal} style={`lg:w-[450px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                <NewCategory closeModal={() => setNewCategoryModal(false)} />
            </FormModal>

            <FormModal isOpen={newItemModal} style={`lg:w-[450px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                <NewItem closeModal={() => setNewItemModal(false)} />
            </FormModal>
        </DashboardLayout>
    );
};

export default Shop;