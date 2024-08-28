import {NextRequest, NextResponse} from "next/server";

const middleware = (req: NextRequest, res: NextResponse) => {
    console.log("Res", res);
    const path = req.nextUrl.pathname;
    const isVerified = req.cookies.get("pgCurrentUser");
    const isPublicPath = path === "/signin" || path === "/signup" || path === "/forgot-password" || path === "/forgot-password-success";

    if (isPublicPath && isVerified) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_NODE_ENV === "production" ? process.env.NEXT_PUBLIC_URL! : "http://localhost:3000");
    }

    if (!isPublicPath && !isVerified) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }
    return;
}

export default middleware;

export const config = {
    matcher: ["/signin", "/signup", "/forgot-password", "/forgot-password-success", "/checklists", "/storefront", "/tasks", "/kids", "/kids/:id", "/settings", "/kids/:id/do-cards-goals", "/kids/:id/do-cards-penalties", "/kids/:id/issue-do-cards", "/kids/:id/purchased-items", "/kids/:id/tasks", "/dashboard"],
}