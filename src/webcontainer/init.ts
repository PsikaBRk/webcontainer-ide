import { getWebContainer } from './webcontainer';
import { defaultTemplate, FileSystemTree } from './template';
import { useStore } from '../store/useStore';
import { writeToTerminal } from './terminalManager';
import { buildFileTree, watchFileSystem } from './fileWatcher';

async function mountFiles(tree: FileSystemTree): Promise<void> {
  const container = await getWebContainer();
  await container.mount(tree as any);
}

// 检查 node_modules 是否存在
async function checkDependenciesInstalled(): Promise<boolean> {
  try {
    const container = await getWebContainer();
    const entries = await container.fs.readdir('.');
    return entries.includes('node_modules');
  } catch {
    return false;
  }
}

export async function initializeWebContainer(): Promise<void> {
  const {
    setBooting,
    setInstalling,
    setRunning,
    setFileTree,
    setPreviewUrl,
  } = useStore.getState();

  try {
    // Boot WebContainer
    setBooting(true);
    writeToTerminal('🚀 Booting WebContainer...\r\n');
    const container = await getWebContainer();
    writeToTerminal('✅ WebContainer booted successfully\r\n');
    setBooting(false);

    // Mount files
    writeToTerminal('📁 Mounting file system...\r\n');
    await mountFiles(defaultTemplate);
    writeToTerminal('✅ File system mounted\r\n');

    // Build file tree
    const tree = await buildFileTree();
    setFileTree(tree);

    // Check if dependencies are already installed
    const depsInstalled = await checkDependenciesInstalled();
    
    if (depsInstalled) {
      writeToTerminal('\r\n✅ Dependencies already installed (using cache)\r\n');
    } else {
      // Install dependencies with pnpm
      setInstalling(true);
      writeToTerminal('\r\n📦 Installing dependencies with pnpm...\r\n');
      writeToTerminal('─────────────────────────────────\r\n');
      
      const installProcess = await container.spawn('pnpm', ['install']);
      
      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            writeToTerminal(data);
          },
        })
      );

      const installExitCode = await installProcess.exit;
      
      if (installExitCode !== 0) {
        throw new Error('pnpm install failed');
      }
      
      writeToTerminal('✅ Dependencies installed successfully\r\n');
      setInstalling(false);
    }

    // Start dev server
    setRunning(true);
    writeToTerminal('\r\n🔥 Starting dev server...\r\n');
    writeToTerminal('─────────────────────────────────\r\n');
    
    const devProcess = await container.spawn('pnpm', ['run', 'dev']);

    devProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          writeToTerminal(data);
        },
      })
    );

    // Wait for server to be ready
    container.on('server-ready', (_port, url) => {
      writeToTerminal(`\r\n✅ Dev server ready!\r\n`);
      writeToTerminal(`🌐 Preview: ${url}\r\n`);
      setPreviewUrl(url);
    });

    // Start watching file system for changes
    watchFileSystem((tree) => {
      setFileTree(tree);
    }, 2000);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    writeToTerminal(`\r\n❌ Error: ${errorMessage}\r\n`);
    setBooting(false);
    setInstalling(false);
    setRunning(false);
  }
}
