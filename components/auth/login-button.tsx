"use client"
import { useRouter } from "next/navigation"

interface LoginButtonProbs {
    children: React.ReactNode;
    mode?: "modal"  | "redirect",
    asChild?: boolean;
};

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild

}: LoginButtonProbs) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login")
    }

    if(mode === "modal") {
        return (
            <span>
                TODO: Implement modal
            </span>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}