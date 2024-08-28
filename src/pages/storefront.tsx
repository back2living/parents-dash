import DashboardLayout from "@/layouts/DashboardLayout";
import ShopCard from "@/components/routes/storefront/ShopCard";
import NewCategory from "@/components/routes/storefront/modal/NewCategory";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import NewItem from "@/components/routes/storefront/modal/NewItem";
import {useFetchAllStorefronts} from "@/hooks/useStorefront";
import StorefrontLoader from "@/components/routes/storefront/Loader";
import {StorefrontCategory} from "@/interfaces/StorefrontInterface";

const Storefront = () => {
    const [newCategoryModal, setNewCategoryModal] = useState(false);
    const [newItemModal, setNewItemModal] = useState(false);
    const [avatarKey, setAvatarKey] = useState(0);

    const hasActiveSubscription = true; // NOTE: THEY CAN TOGGLE THE BLUR IN THE DEV TOOLS. IMAGE MAYBE?
    const {data, isPending} = useFetchAllStorefronts() as { data: { data: StorefrontCategory[] }; isPending: boolean };

    if (isPending) {
        return <StorefrontLoader/>
    }

    return (
        <DashboardLayout title={"Storefront"}>
            <div className={`pb-10 overflow-hidden relative ${!hasActiveSubscription && "h-screen"}`}>
                {!hasActiveSubscription && <div
                    className={"bg-orange text-white absolute z-50 py-3.5 w-full top-1/2 -translate-y-1/2 text-center"}>
                    Subscribe to keep shizziling like Eazy Tipsy.
                    <button className={"block w-fit mx-auto"}>Subscribe Now!!!</button>
                </div>}

                <div className={`${!hasActiveSubscription && "blur-md pointer-events-none"}`}>
                    <div className={"lg:flex-center-between"}>
                        <p className={"text-md lg:text-lg font-semibold text-[#515151]"}>Store items</p>

                        <div className={"font-semibold flex-center gap-4 lg:gap-6 mt-4"}>
                            <button onClick={() => setNewItemModal(true)}
                                    className={"primary-btn w-fit text-sm lg:text-base px-4 py-3 lg:p-4 lg:w-[160px]"}>New
                                item +
                            </button>
                            <button onClick={() => setNewCategoryModal(true)}
                                    className={"bg-primary lg:text-base text-sm text-primary w-fit px-4 py-3 lg:p-4 lg:w-[160px] rounded-full"}>New
                                Category
                            </button>
                        </div>
                    </div>
                    {data?.data?.map(item => <div key={item?._id}>
                        <div className={"flex-center font-semibold gap-4 mt-10"}>
                            <p className={"text-lg text-[#515151]"}>{item.title}</p>
                            <p className={"text-secondary"}>{item?.storefronts?.length} items</p>
                        </div>
                        <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                            {item?.storefronts?.map(item => <ShopCard avatarKey={avatarKey} key={item._id} item={item}/>)}
                        </div>
                    </div>)}
                </div>
            </div>

            <FormModal isOpen={newCategoryModal || newItemModal} style={`lg:w-[550px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                {newCategoryModal && <NewCategory closeModal={() => setNewCategoryModal(false)}/>}
                {newItemModal && <NewItem setAvatarKey={setAvatarKey} closeModal={() => setNewItemModal(false)}/>}
            </FormModal>
        </DashboardLayout>
    );
};
export default Storefront;