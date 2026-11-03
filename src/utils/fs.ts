import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import * as path from 'node:path';

export async function exists(filePath: string): Promise<boolean> {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function existsSync(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export async function ensureDir(dirPath: string): Promise<void> {
  await fsp.mkdir(dirPath, { recursive: true });
}

export function ensureDirSync(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

export async function readJson<T>(filePath: string): Promise<T> {
  const content = await fsp.readFile(filePath, 'utf8');
  return JSON.parse(content) as T;
}

export function readJsonSync<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content) as T;
}

export async function writeJson(filePath: string, data: unknown, indent = 2): Promise<void> {
  await ensureDir(path.dirname(filePath));
  const content = JSON.stringify(data, null, indent) + '\n';
  await fsp.writeFile(filePath, content, 'utf8');
}

export function writeJsonSync(filePath: string, data: unknown, indent = 2): void {
  ensureDirSync(path.dirname(filePath));
  const content = JSON.stringify(data, null, indent) + '\n';
  fs.writeFileSync(filePath, content, 'utf8');
}

export async function readFile(filePath: string): Promise<string> {
  return fsp.readFile(filePath, 'utf8');
}

export function readFileSync(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

export async function writeFile(filePath: string, content: string): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await fsp.writeFile(filePath, content, 'utf8');
}

export function writeFileSync(filePath: string, content: string): void {
  ensureDirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

export async function copyRecursive(src: string, dest: string): Promise<void> {
  await ensureDir(dest);
  await fsp.cp(src, dest, { recursive: true, force: true });
}

export function copyRecursiveSync(src: string, dest: string): void {
  ensureDirSync(dest);
  fs.cpSync(src, dest, { recursive: true, force: true });
}

export function findProjectRoot(startDir = process.cwd()): string | null {
  let curr = path.resolve(startDir);
  while (true) {
    const configPath = path.join(curr, 'openproducer', 'config.json');
    if (fs.existsSync(configPath)) {
      return curr;
    }
    const parent = path.dirname(curr);
    if (parent === curr) {
      break;
    }
    curr = parent;
  }
  return null;
}

