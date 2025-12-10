import * as fs from "fs";
import * as path from "path";

/* 
=================================================
Utility functions
================================================
*/
// Utility function to copy recursively (sync, for script simplicity)
function copyRecursiveSync(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source path does not exist: ${src}`);
  }
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      copyRecursiveSync(srcPath, destPath);
    }
  } else if (stat.isFile()) {
    fs.copyFileSync(src, dest);
  }
}

/* 
=================================================
Type Declarations and initializations
================================================
*/
type LexgenHelperArgs = {
  hypercertsLexiconsSource: string;
  gainforestLexiconsSource: string;
};

let lexgenHelperArgs: LexgenHelperArgs;
const args = Bun.argv.slice(2);

/* 
=================================================
Start of script
================================================
*/
console.log("Starting lexgen-helper");

/* 
=================================================
Check for required parameters
================================================
*/
if (args.length === 0) {
  console.log("No parameters provided. Exiting...");
  process.exit(1);
}
const hypercertsLexiconsSource = args
  .find((arg) => arg.startsWith("hypercertsLexiconsSource="))
  ?.split("=")
  .at(1);
const gainforestLexiconsSource = args
  .find((arg) => arg.startsWith("gainforestLexiconsSource="))
  ?.split("=")
  .at(1);
if (!hypercertsLexiconsSource || !gainforestLexiconsSource) {
  console.log("Missing required parameters. Exiting...");
  process.exit(1);
}

/* 
=================================================
Getting data from sources and copying to destination
================================================
*/
lexgenHelperArgs = {
  hypercertsLexiconsSource: hypercertsLexiconsSource,
  gainforestLexiconsSource: gainforestLexiconsSource,
};

const sources = [
  {
    src: lexgenHelperArgs.hypercertsLexiconsSource,
    label: "hypercertsLexiconsSource",
  },
  {
    src: lexgenHelperArgs.gainforestLexiconsSource,
    label: "gainforestLexiconsSource",
  },
];

// Destination directory
const destPath = path.resolve(process.cwd(), "lexicons");

for (const sourceObj of sources) {
  const absSourcePath = path.resolve(process.cwd(), sourceObj.src);
  const label = sourceObj.label;
  // We'll copy into ./lexicons/*

  try {
    console.log(`Copying ${label} from ${absSourcePath} to ${destPath}`);
    copyRecursiveSync(absSourcePath, destPath);
  } catch (err) {
    console.error(
      `Error copying ${label} from ${absSourcePath} to ${destPath}:`,
      err
    );
    process.exit(1);
  }
}
console.log("Completed copying lexicon sources.");

/* 
=================================================
FUTURE SCOPE: Git source parsing and data fetching
================================================
*/

// type GitSource = {
//   orgName: string;
//   repoName: string;
//   commitHash?: string;
//   subdir?: string;
// }
// function parseGitSource(source: `git:${string}`): GitSource {
//   // Remove the git: prefix
//   const gitStr = source.slice(4); // Remove "git:"
//   // First, find the first '/' (org/repo are guaranteed), up to '#'
//   // Regex will grab org, repo, optional hash, optional path
//   //   org/repo        [#hash]     [/subdir...]
//   // e.g.: acme/myrepo#abc123/subdir/dir2

//   // This regex covers:
//   // 1. org/repo at start ([^/]+)\/([^/#]+)
//   // 2. Optional #[hash] (?:#([^/]+))?
//   // 3. Optional /subdir (?:/(.+))?
//   const match = gitStr.match(/^([^/]+)\/([^/#]+)(?:#([^/]+))?(?:\/(.+))?$/);

//   if (!match) {
//     throw new Error(
//       `Invalid git source format: ${source}. Expected git:<org>/<repo>[#<commit>][/<subdir>]`
//     );
//   }
//   const [, orgName, repoName, commitHash, subdir] = match;
//   if (orgName === undefined || repoName === undefined) {
//     throw new Error(
//       `Invalid git source format: ${source}. Expected git:<org>/<repo>[#<commit>][/<subdir>]`
//     );
//   }
//   return {
//     orgName,
//     repoName,
//     ...(commitHash ? { commitHash } : {}),
//     ...(subdir ? { subdir } : {}),
//   };
// }

// import { exec } from "child_process";
// import { promisify } from "util";
// import * as fs from "fs";
// import * as path from "path";
// const execAsync = promisify(exec);

// async function getDataFromGitSource(source: GitSource) {
//   /**
//    * - Clone the repo into a temporary directory, using shallow clone if possible.
//    * - Checkout the commit hash if provided, else use the default branch (main/master).
//    * - If subdir is provided, copy its contents into ./tmp/.
//    * - Always overwrite ./tmp.
//    */
//   const { orgName, repoName, commitHash, subdir } = source;
//   const repoUrl = `https://github.com/${orgName}/${repoName}.git`;

//   // Ensure a reproducible temp dir (in cwd)
//   const cwd = process.cwd();
//   const tmpDir = path.join(cwd, "tmp");
//   const gitTmpDir = path.join(cwd, ".git-tmp");

//   // Remove old tmpDir if exists
//   if (fs.existsSync(tmpDir)) {
//     fs.rmSync(tmpDir, { recursive: true, force: true });
//   }
//   if (fs.existsSync(gitTmpDir)) {
//     fs.rmSync(gitTmpDir, { recursive: true, force: true });
//   }

//   // Shallow clone the repo (no checkout is slightly faster)
//   let cloneCmd = `git clone --depth 1 ${repoUrl} "${gitTmpDir}"`;
//   if (commitHash) {
//     // If commitHash, no --branch, will checkout after
//     cloneCmd = `git clone ${repoUrl} "${gitTmpDir}"`;
//   }
//   await execAsync(cloneCmd);

//   // If commit specified, checkout to that commit
//   if (commitHash) {
//     await execAsync(`git checkout ${commitHash}`, { cwd: gitTmpDir });
//   }

//   // Determine the actual path to copy
//   let srcPath = gitTmpDir;
//   if (subdir) {
//     srcPath = path.join(gitTmpDir, subdir);
//     if (!fs.existsSync(srcPath)) {
//       throw new Error(`Subdirectory "${subdir}" does not exist in repo at ${commitHash ?? "default branch"}`);
//     }
//   }

//   // Copy contents to ./tmp/
//   fs.mkdirSync(tmpDir, { recursive: true });

//   // Helper function (recursively copy files/dirs)
//   function copyRecursiveSync(src: string, dest: string) {
//     if (fs.lstatSync(src).isDirectory()) {
//       if (!fs.existsSync(dest)) fs.mkdirSync(dest);
//       for (const item of fs.readdirSync(src)) {
//         copyRecursiveSync(
//           path.join(src, item),
//           path.join(dest, item)
//         );
//       }
//     } else {
//       fs.copyFileSync(src, dest);
//     }
//   }

//   copyRecursiveSync(srcPath, tmpDir);

//   // Clean up .git-tmp dir
//   if (fs.existsSync(gitTmpDir)) {
//     fs.rmSync(gitTmpDir, { recursive: true, force: true });
//   }
// }
