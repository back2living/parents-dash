import React from "react";
const AuthLayout = ({children}: React.PropsWithChildren) => {
    return (
        <section style={{fontFamily: "SF-Pro"}} className={"auth-layout-container"}>
            <div className={"auth-layout-img"}>
                <img className={"w-full h-full"} src="/assets/images/auth-img.webp" alt=""/>
            </div>

            <div className={"auth-layout-content"}>{children}</div>
        </section>
    );
};
export default AuthLayout;