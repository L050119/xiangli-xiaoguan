import { cp, access, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const sourceDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = resolve(sourceDirectory, 'dist')
const repositoryDirectory = resolve(sourceDirectory, '..')
const releaseFiles = [
  'index.html',
  'assets',
  'images',
  'manifest.webmanifest',
  'sw.js',
  'icon.svg',
  'icon-maskable.svg',
  'favicon.svg',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'apple-touch-icon.png',
  '安装与部署说明.txt',
]

await Promise.all(releaseFiles.map((name) => access(resolve(outputDirectory, name))))

for (const name of releaseFiles) {
  const source = resolve(outputDirectory, name)
  const destination = resolve(repositoryDirectory, name)
  await rm(destination, { recursive: true, force: true })
  await cp(source, destination, { recursive: true })
}

console.log(`已将 ${releaseFiles.length} 项静态构建文件同步到仓库根目录。`)
