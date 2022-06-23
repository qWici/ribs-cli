import React from "react";

import { IPascalCaseModuleNameInteractor } from "./interactor";

export interface IProps {
  interactor: IPascalCaseModuleNameInteractor
}
export const PascalCaseModuleNameRouter: React.FC<IProps> = ({ interactor }) => {
  return (
    <div>PascalCaseModuleNameRouter content</div>
  )
};
