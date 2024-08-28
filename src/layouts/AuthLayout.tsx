import React from "react";
import Title from "@/components/shared/Title";

interface IAuthLayout {
    children: React.ReactNode;
    title?: string;
}

const AuthLayout = ({children, title}: IAuthLayout) => {
    return (
        <section style={{fontFamily: "SF-Pro"}} className={"auth-layout-container"}>
            <Title title={`${title} - Playground`} description={"The ultimate platform to build capable and financially responsible kids."} />

            <div className={"auth-layout-img"}>
                <img className={"w-full h-full"} src="/assets/images/auth-img.webp" alt=""/>
            </div>

            <div className={"auth-layout-content"}>{children}</div>
        </section>
    );
};
export default AuthLayout;