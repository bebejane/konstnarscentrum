import create from "zustand";
import shallow from "zustand/shallow"

export interface StoreState {
  showMenu: boolean,
  showSubMenu: boolean,
  showMenuMobile: boolean,
  currentSection: string,
  invertSidebar: boolean,
  invertMenu: boolean,
  searchProducts: string,
  transitioning: boolean,
  showSiteSearch: boolean,
  setCurrentSection: (currentSection: string) => void,
  setShowMenu: (showMenu: boolean) => void,
  setShowSubMenu: (showSubMenu: boolean) => void,
  setShowMenuMobile: (showMenuMobile: boolean) => void,
  setInvertSidebar: (invertSidebar: boolean) => void,
  setInvertMenu: (invertMenu: boolean) => void,
  setSearchProducts: (searchProducts: string) => void,
  setTransitioning: (transitioning: boolean) => void,
  setShowSiteSearch: (showSiteSearch: boolean) => void,
}

const useStore = create<StoreState>((set) => ({
  showMenu: true,
  showSubMenu: false,
  showMenuMobile: false,
  currentSection: undefined,
  invertSidebar: false,
  invertMenu: false,
  sections: [],
  searchProducts: undefined,
  gallery: undefined,
  product: undefined,
  transitioning: false,
  showSiteSearch: false,
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
  setCurrentSection: (currentSection: string) =>
    set((state) => ({
      currentSection
    })
    ),
  setInvertSidebar: (invertSidebar: boolean) =>
    set((state) => ({
      invertSidebar
    })
    ),
  setInvertMenu: (invertMenu: boolean) =>
    set((state) => ({
      invertMenu
    })
    ),
  setSearchProducts: (searchProducts: string) =>
    set((state) => ({
      searchProducts
    })
    ),
  setTransitioning: (transitioning) =>
    set((state) => ({
      transitioning
    })
    ),
  setShowSiteSearch: (showSiteSearch) =>
    set((state) => ({
      showSiteSearch
    })
    ),
}));

export default useStore;
export { shallow, useStore };
