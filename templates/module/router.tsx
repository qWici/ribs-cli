import * as React from 'react'

import { IPascalCaseModuleNameInteractor } from './interactor'

export interface IProps {
  interactor: IPascalCaseModuleNameInteractor
}
export const PascalCaseModuleNameRouter: React.FC<IProps> = ({
  interactor,
}) => <>{interactor.children.firstChild && <div>inject child here</div>}</>
