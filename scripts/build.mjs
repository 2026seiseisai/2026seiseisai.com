import { existsSync } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const projectRoot = process.cwd();
const pamphletFile = '第62回菁々祭パンフレット高画質版.pdf';
const sourcePath = path.join(
  projectRoot,
  'public',
  'brochures-data',
  pamphletFile,
);
const backupDirectory = path.join(projectRoot, '.build-assets');
const backupPath = path.join(backupDirectory, pamphletFile);

let moved = false;

try {
  if (existsSync(sourcePath)) {
    await mkdir(backupDirectory, { recursive: true });
    await rename(sourcePath, backupPath);
    moved = true;
  }

  const nextCommand = process.platform === 'win32' ? 'next.cmd' : 'next';
  const result = await new Promise((resolve, reject) => {
    const child = spawn(nextCommand, ['build'], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('error', reject);
    child.on('close', (code, signal) => resolve({ code, signal }));
  });

  if (result.signal) {
    throw new Error(`Next.js build terminated by ${result.signal}`);
  }

  if (result.code !== 0) {
    process.exitCode = result.code ?? 1;
  }
} finally {
  if (moved) {
    await rename(backupPath, sourcePath);
    await rm(backupDirectory, { recursive: true, force: true });
  }
}
