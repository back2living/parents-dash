import {create, StateCreator} from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import {UserType} from "@interfaces/UserInterface";

interface AuthState {
    currentUser: null | UserType; // Adjust the type to match your user object
    setCurrentUser: (user: UserType) => void; // Adjust the parameter type as needed
}

type AuthPersist = (
    config: StateCreator<AuthState>,
    options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

const useAuthStore = create<AuthState>(
    (persist as AuthPersist)(
        (set) => ({
            currentUser: null,
            setCurrentUser: (user) => set(() => ({ currentUser: user })),
        }),
        { name: "pgGuardianAuth" }
    )
);

export const useCurrentUser = () => useAuthStore((state) => state.currentUser) as UserType;
export const useSetCurrentUser = () => useAuthStore((state) => state.setCurrentUser);
