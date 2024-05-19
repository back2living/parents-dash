import Link from "next/link";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import DoCard from "@/components/routes/kids/modal/DoCard";
import {useRouter} from "next/router";

const RecentDoCards = () => {
    const {query: {id}} = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <div>
            <div>
                <div className={"flex-center-between"}>
                    <p className={"text-md font-semibold text-primary"}>Recent Do-Cards</p>
                    <button onClick={() => setShowModal(true)} className={"text-orange font-semibold text-sm underline"}>New Do-card</button>
                </div>

                <div className={"mt-6 flex-column gap-2"}>
                    {Array.from({length: 5}).map((item, index) => (
                        <div key={index} className={"flex-center-between bg-primary rounded-xl p-3"}>
                            <p className={"text-primary text-sm font-semibold"}>Watch TV after 8pm</p>

                            <div className={"flex-center gap-6"}>
                                <p className={"text-secondary font-semibold"}>-5pts</p>
                                <button className={"text-orange font-semibold"}>Approve</button>
                            </div>
                        </div>
                    ))}
                </div>

                <Link
                    className={"mt-2 flex justify-center text-orange font-semibold text-sm underline underline-offset-2"}
                    href={`/kids/${id}/do-cards`}>View all</Link>
            </div>

            <FormModal isOpen={showModal} style={"lg:w-[450px] max-h-full rounded-t-3xl overflow-y-auto lg:mb-0"}>
                <DoCard closeModal={() => setShowModal(false)}/>
            </FormModal>
        </div>
    );
};

export default RecentDoCards;