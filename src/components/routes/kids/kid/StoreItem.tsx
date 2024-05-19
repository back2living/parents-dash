import Link from "next/link";
import {useRouter} from "next/router";

const StoreItem = () => {
    const {query: {id}} = useRouter();

    return (
        <div>
            <p className={"text-md text-primary font-semibold"}>Store items purchase</p>
            <div className={"grid grid-cols-2 gap-2 lg:flex-center lg:flex-wrap lg:gap-6 mt-6"}>
                {Array.from({length: 2}).map((item, index) => <div key={index}>
                    <div className={"w-[200px] h-[160px] rounded-3xl"}>
                        <img className={"w-full h-full object-cover rounded-3xl"} src="/assets/images/nike.webp" alt=""/>
                    </div>

                    <div>
                        <p className={"text-[#515151] font-bold"}>Sneakers</p>
                        <p className={"text-secondary-dark text-sm font-medium mt-1"}>2,000 pts</p>
                        <div className={"mt-2 font-medium text-sm flex-center gap-4"}>
                            <button className={"text-orange"}>Approve</button>
                            <button className={"text-secondary"}>Decline</button>
                        </div>
                    </div>
                </div>)}
            </div>
            <Link className={"mt-6 flex justify-center text-orange font-semibold text-sm underline underline-offset-2"}
                  href={`/kids/${id}/purchased-items`}>View all</Link>
        </div>
    );
};

export default StoreItem;