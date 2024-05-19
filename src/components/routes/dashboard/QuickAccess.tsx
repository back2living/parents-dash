import Card from "@/components/shared/Card";
import {kidsData, savingsData, shopData} from "@/constants/data";

const QuickAccess = () => {
    return (
        <div>
            <h2 className={"text-lg font-semibold text-[#515151] mb-10"}>Hi, Asher 👋🏻</h2>

            <div className={"hidden lg:flex-center flex-wrap overflow-hidden gap-4"}>
            {/*<div className={"flex gap-4 overflow-auto lg:flex-wrap"}>*/}
                <Card
                    textColor={"white"}
                    text={"Kids added"}
                    count={kidsData.length}
                    img={"kids-bg.webp"}
                    link={{name: "Add kids", path: "/kids", textColor: "#F07846"}}
                />
                <Card
                    textColor={"white"}
                    text={"Tasks waiting for approval"}
                    count={1}
                    img={"tasks-bg.webp"}
                    link={{name: "Add tasks", path: "/tasks", textColor: "#AF70EE"}}
                />
                <Card
                    textColor={"white"}
                    text={"Items in Storefront"}
                    count={shopData.length}
                    img={"store-bg.webp"}
                    link={{name: "Store Items", path: "/store", textColor: "#FDBA2D"}}
                />
                <Card
                    textColor={"white"}
                    text={"Savings created"}
                    count={savingsData.length}
                    img={"savings-bg.webp"}
                    link={{name: "Set up now", path: "/savings", textColor: "#09C2B2"}}
                />

            </div>
        </div>
    );
};

export default QuickAccess;