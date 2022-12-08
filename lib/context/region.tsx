import { useContext, createContext } from "react";
import { regions } from '/lib/region'
import { getCookie } from "cookies-next";

export type RegionProps = Region

export const RegionContext = createContext(undefined);

export type RegionProviderProps = {
  children: React.ReactElement,
  value: Region
}

// Context provider
export const RegionProvider = ({ children, value }: RegionProviderProps) => {

  const regionFromCookie = regions.find(({ slug }) => slug === getCookie('region'))

  return (
    <RegionContext.Provider value={value ? { ...value } : regionFromCookie ? { ...regionFromCookie } : undefined}>
      {children}
    </RegionContext.Provider>
  )
};
// useRegion hook
export const useRegion = (): RegionProps => {
  return useContext(RegionContext)
}
