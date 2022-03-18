import * as React from "react"

import { usePascalCaseModuleNameInteractor } from "./interactor"
import { PascalCaseModuleNameRouter } from "./router"

export interface IProps {}
export const PascalCaseModuleName: React.FC<IProps> = () => {
  const interactor = usePascalCaseModuleNameInteractor()
  return <PascalCaseModuleNameRouter interactor={interactor} />
}
