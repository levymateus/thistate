'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const buildPath = process.env.BUILD_PATH || 'build'

const moduleFileExtensions = ['js'];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  )

  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }

  return resolveFn(`${filePath}.js`)
}

module.exports = {
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appBuild: resolveApp(buildPath),
  appSrc: resolveApp('src'),
  appPackageJson: resolveApp('package.json'),
  appPath: resolveApp('.'),
}