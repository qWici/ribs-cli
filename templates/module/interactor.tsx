export interface IPascalCaseModuleNameInteractor {
  exampleMethod: () => Promise<void>
  children: {
    firstChild: boolean
  }
}

export const usePascalCaseModuleNameInteractor =
  (): IPascalCaseModuleNameInteractor => {
    return {
      exampleMethod: async () => {},
      children: {
        firstChild: true,
      },
    }
  }
