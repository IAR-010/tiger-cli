#!/usr/bin/env node

const { spawn, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const binaryName = path.basename(process.argv[1], path.extname(process.argv[1]));

// If invoked as `npx create-tiger-app <appName>`, translate to `create-app <appName>`
let finalArgs = args;
if (binaryName === 'create-tiger-app') {
  if (args.length === 0 || args[0] !== 'create-app') {
    finalArgs = ['create-app', ...args];
  }
}

// 1. Check if local virtualenv has tiger
const venvTigerWin = path.resolve(__dirname, '..', '.venv', 'Scripts', 'tiger.exe');
const venvTigerUnix = path.resolve(__dirname, '..', '.venv', 'bin', 'tiger');
const userTigerWin = path.resolve(process.env.USERPROFILE || '', '.tiger', 'bin', 'tiger.cmd');
const userTigerUnix = path.resolve(process.env.HOME || '', '.tiger', 'bin', 'tiger');

let targetExec = null;
let targetArgs = finalArgs;

if (fs.existsSync(venvTigerWin)) {
  targetExec = venvTigerWin;
} else if (fs.existsSync(venvTigerUnix)) {
  targetExec = venvTigerUnix;
} else if (fs.existsSync(userTigerWin)) {
  targetExec = userTigerWin;
} else if (fs.existsSync(userTigerUnix)) {
  targetExec = userTigerUnix;
} else {
  // Check if globally in PATH
  try {
    const check = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['tiger'], { stdio: 'ignore' });
    if (check.status === 0) {
      targetExec = 'tiger';
    }
  } catch (e) {}
}

if (targetExec) {
  const quotedExec = process.platform === 'win32' && targetExec.includes(' ') ? `"${targetExec}"` : targetExec;
  const child = spawn(quotedExec, targetArgs, { stdio: 'inherit', shell: true });
  child.on('exit', (code) => process.exit(code || 0));
} else {
  // Fallback: Run via python interpreter directly
  const pythonCmds = process.platform === 'win32' ? ['python', 'py'] : ['python3', 'python'];
  let chosenPython = null;
  for (const py of pythonCmds) {
    try {
      const res = spawnSync(py, ['--version'], { stdio: 'ignore' });
      if (res.status === 0) {
        chosenPython = py;
        break;
      }
    } catch (e) {}
  }

  if (!chosenPython) {
    console.error('\x1b[31mError: Python 3.9+ is required to run Tiger Framework.\x1b[0m');
    console.error('Please install Python from https://www.python.org/ or your package manager.');
    process.exit(1);
  }

  const repoMain = path.resolve(__dirname, '..', 'main.py');
  if (fs.existsSync(repoMain)) {
    const child = spawn(chosenPython, [repoMain, ...finalArgs], { stdio: 'inherit' });
    child.on('exit', (code) => process.exit(code || 0));
  } else {
    console.error('\x1b[31mTiger CLI installation not found.\x1b[0m');
    console.error('Please run: pip install tiger-cli');
    process.exit(1);
  }
}
