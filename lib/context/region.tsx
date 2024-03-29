import { useContext, createContext } from "react";
import { regions } from '/lib/region'
import { getCookie } from "cookies-next";
import { isServer } from "/lib/utils";

export type RegionProps = Region

export const RegionContext = createContext(undefined);

export type RegionProviderProps = {
  children: React.ReactElement,
  value: Region
}

// Context provider
export const RegionProvider = ({ children, value }: RegionProviderProps) => {

  return (
    <RegionContext.Provider value={value ? { ...value } : undefined}>
      {children}
    </RegionContext.Provider>
  )
};
// useRegion hook
export const useRegion = (): RegionProps => {
  return useContext(RegionContext)
}
