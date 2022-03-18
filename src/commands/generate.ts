import path from "path";
import {processFolder} from "../utils";

export const generate = (title: string) => {
  const templateFolderPath = path.join(
    __dirname,
    '..',
    '..',
    'templates',
    'module'
  )
  const outputFolderPath = process.cwd()

  processFolder({
    name: title,
    templateFolderPath,
    outputFolderPath: path.join(outputFolderPath, title),
  })

  console.log(`Module created at: "${outputFolderPath}/${title}"`)
};
