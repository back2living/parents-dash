import Card from "@/components/shared/Card";
import {useCurrentUser} from "@/store/auth/authStore";
import {IUserStats} from "@interfaces/UserInterface";

const QuickAccess = ({stats}: { stats: IUserStats }) => {
    const currentUser = useCurrentUser();
    return (
        <div>
            <h2 className={"text-lg font-semibold text-[#515151] mb-10"}>Hi, {currentUser?.firstName} 👋🏻</h2>

            <div className={"hidden lg:flex lg:items-center lg:flex-wrap gap-4"}>
                <Card
                    textColor={"white"}
                    text={"Kids added"}
                    count={stats?.kids || 0}
                    img={"kids-bg.webp"}
                    link={{name: "Add kids", path: "/kids", textColor: "#F07846"}}
                    className={"dashboard-card"}
                />
                <Card
                    textColor={"white"}
                    text={"Tasks waiting for approval"}
                    count={stats?.tasks || 0}
                    img={"tasks-bg.webp"}
                    link={{name: "Add tasks", path: "/tasks", textColor: "#AF70EE"}}
                    className={"dashboard-card"}
                />
                <Card
                    textColor={"white"}
                    text={"Items in Storefront"}
                    count={0}
                    img={"store-bg.webp"}
                    link={{name: "Store Items", path: "/store", textColor: "#FDBA2D"}}
                    className={"dashboard-card"}
                />
                <Card
                    textColor={"white"}
                    text={"Do-cards awaiting approval"}
                    count={stats?.docards || 0}
                    img={"savings-bg.webp"}
                    link={{name: "Set up now", path: "/kids", textColor: "#09C2B2"}}
                    className={"dashboard-card"}
                />

            </div>
        </div>
    );
};

export default QuickAccess;