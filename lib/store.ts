import create from "zustand";
import shallow from "zustand/shallow"

export type SectionId = {
  title: string,
  id: string
}

export type GalleryProps = {
  images: FileField[],
  index?: number,
  padImagesWithTitle?: boolean
}

export interface StoreState {
  showMenu: boolean,
  showSubMenu: boolean,
  showMenuMobile: boolean,
  currentSection: string,
  invertSidebar: boolean,
  invertMenu: boolean,
  searchProducts: string,
  gallery: GalleryProps,
  transitioning: boolean,
  showSiteSearch: boolean,
  setCurrentSection: (currentSection: string) => void,
  setShowMenu: (showMenu: boolean) => void,
  setShowSubMenu: (showSubMenu: boolean) => void,
  setShowMenuMobile: (showMenuMobile: boolean) => void,
  setInvertSidebar: (invertSidebar: boolean) => void,
  setInvertMenu: (invertMenu: boolean) => void,
  setSearchProducts: (searchProducts: string) => void,
  setGallery: (gallery: GalleryProps) => void,
  setGalleryId: (id: string) => void,
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
  setGallery: (gallery: GalleryProps) =>
    set((state) => ({
      gallery: {
        images: gallery.images,
        index: gallery.index !== undefined ? gallery.index : undefined,
        padImagesWithTitle: gallery.padImagesWithTitle || false
      }
    })
    ),
  setGalleryId: (id: string) =>
    set((state) => ({
      gallery: {
        ...state.gallery,
        index: state.gallery?.images?.findIndex((i) => i.id === id) ?? state.gallery?.index
      }
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
