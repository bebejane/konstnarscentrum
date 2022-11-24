import create from "zustand";
import shallow from "zustand/shallow"

export interface StoreState {
  region: Region | undefined,
  showMenu: boolean,
  showSubMenu: boolean,
  showMenuMobile: boolean,
  setShowMenu: (showMenu: boolean) => void,
  setShowSubMenu: (showSubMenu: boolean) => void,
  setShowMenuMobile: (showMenuMobile: boolean) => void,
  setRegion: (region: Region | undefined) => void
}

const useStore = create<StoreState>((set) => ({
  showMenu: true,
  showSubMenu: false,
  showMenuMobile: false,
  region: undefined,
  setShowMenu: (showMenu: boolean) =>
    set((state) => ({
      showMenu
    })
    ),
  setShowSubMenu: (showSubMenu: boolean) =>
    set((state) => ({
      showSubMenu
    })
    ),
  setShowMenuMobile: (showMenuMobile: boolean) =>
    set((state) => ({
      showMenuMobile
    })
    ),
  setRegion: (region: Region | undefined) =>
    set((state) => ({
      region
    })
    ),

}));

export default useStore;
export { shallow, useStore };
