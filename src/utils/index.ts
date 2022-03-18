import * as fs from 'fs'
import { camelCase, kebabCase, upperFirst } from 'lodash'
import * as path from 'path'

function readFile(payload: { filePath: string }): string {
  const fileContent = fs.readFileSync(payload.filePath, { encoding: 'utf-8' })
  return fileContent
}

function replaceModuleName(file: string, name: string): string {
  const camelCaseModuleName = camelCase(name)
  const kebabCaseModuleName = kebabCase(camelCaseModuleName)
  const PascalCaseModuleName = upperFirst(camelCaseModuleName)
  const preparedFile = file
    .replace(/camelCaseModuleName/g, camelCaseModuleName)
    .replace(/kebabCaseModuleName/g, kebabCaseModuleName)
    .replace(/PascalCaseModuleName/g, PascalCaseModuleName)
  return preparedFile
}

function prepareFile(payload: {
  fileContent: string
  moduleName: string
}): string {
  return replaceModuleName(payload.fileContent, payload.moduleName)
}

function findFolder(payload: {
  currentFolderPath: string
  folderName: string
  ignoreFolders?: string[]
}): string {
  const filesInCurrentFolder = fs.readdirSync(payload.currentFolderPath, {
    encoding: 'utf-8',
  })

  const isIncludeTargetFolder = filesInCurrentFolder.find(
    (fileName) =>
      fileName === payload.folderName &&
      fs.statSync(path.join(payload.currentFolderPath, fileName)).isDirectory()
  )

  if (isIncludeTargetFolder != null) {
    return path.join(payload.currentFolderPath, payload.folderName)
  }

  const nestedFolders = filesInCurrentFolder
    .filter(
      (fileName) => (payload.ignoreFolders || []).includes(fileName) === false
    )
    .filter((fileName) =>
      fs.statSync(path.join(payload.currentFolderPath, fileName)).isDirectory()
    )

  if (nestedFolders.length === 0) {
    return ''
  }

  const folderFromNestedFolders = nestedFolders
    .map((folderName) => {
      const foundFolder = findFolder({
        currentFolderPath: path.join(payload.currentFolderPath, folderName),
        folderName: payload.folderName,
      })

      return foundFolder
    })
    .find((folderName) => folderName !== '')

  if (folderFromNestedFolders == null) {
    return ''
  }

  return folderFromNestedFolders
}

function createFolder(payload: { path: string }) {
  if (!fs.existsSync(payload.path)) {
    fs.mkdirSync(payload.path)
  }
}

function saveFile(payload: { file: string; path: string }) {
  fs.writeFileSync(payload.path, payload.file, { encoding: 'utf-8' })
}

function processFile(payload: {
  moduleName: string
  templateFilePath: string
  outputFilePath: string
}) {
  const fileContent = readFile({
    filePath: payload.templateFilePath,
  })

  const preparedFile = prepareFile({
    fileContent,
    moduleName: payload.moduleName,
  })

  saveFile({
    file: preparedFile,
    path: path.join(payload.outputFilePath),
  })
}

export function processFolder(payload: {
  name: string
  templateFolderPath: string
  outputFolderPath: string
}) {
  createFolder({
    path: payload.outputFolderPath,
  })

  const files = fs.readdirSync(payload.templateFolderPath, {
    encoding: 'utf-8',
  })

  files.forEach((fileName) => {
    const templatePath = path.join(payload.templateFolderPath, fileName)
    const outputPath = path.join(payload.outputFolderPath, fileName)

    if (fs.statSync(templatePath).isDirectory()) {
      createFolder({
        path: outputPath,
      })

      processFolder({
        name: payload.name,
        templateFolderPath: templatePath,
        outputFolderPath: outputPath,
      })
      return
    }

    processFile({
      moduleName: payload.name,
      templateFilePath: templatePath,
      outputFilePath: outputPath,
    })
  })
}
