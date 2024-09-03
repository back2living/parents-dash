import {create, StateCreator} from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import {IKid} from "@hooks/useKids";

interface KidState {
    currentKid: null | IKid;
    setCurrentKid: (user: IKid) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

type KidPersist = (
    config: StateCreator<KidState>,
    options: PersistOptions<KidState>
) => StateCreator<KidState>;

const useAuthStore = create<KidState>(
    (persist as KidPersist)(
        (set) => ({
            currentKid: null,
            setCurrentKid: (user) => set(() => ({ currentKid: user })),
            activeTab: "profile",
            setActiveTab: (tab) => set(() => ({ activeTab: tab })),
        }),
        { name: "pgGuardianKid" }
    )
);

export const useCurrentKid = () => useAuthStore((state) => state.currentKid);
export const useSetCurrentKid = () => useAuthStore((state) => state.setCurrentKid);
export const useKidActiveTab = () => useAuthStore((state) => state.activeTab);
export const useSetKidActiveTab = () => useAuthStore((state) => state.setActiveTab);