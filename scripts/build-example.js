#!/usr/bin/env node

/**
 * sync-example.js — OpenProducer Example Project Synchronization Utility
 *
 * Usage:
 *   node sync-example.js          # Hard transfer: wipes example_openproducer_project and re-scaffolds
 *   node sync-example.js --soft   # Soft transfer: keeps project state, only updates untouched files (skills, workflows, docs)
 */

const fs = require("fs");
const path = require("path");

// 1. Resolve paths relative to project root
const rootDir = fs.realpathSync(path.resolve(__dirname, ".."));
const agentsDir = path.join(rootDir, "agents");
const prodTemplateDir = path.join(rootDir, "production_template");
const destDir = path.join(rootDir, "example_openproducer_project");
const destAgentsDir = path.join(destDir, ".agents");

// 2. Parse command-line flags
const args = process.argv.slice(2);
const isSoft = args.includes("--soft") || args.includes("-s");
const isHelp = args.includes("--help") || args.includes("-h");

if (isHelp) {
    console.log(`
🎬 OpenProducer Example Project Synchronization Utility

Usage:
  node sync-example.js [options]

Options:
  --soft, -s    Soft Transfer Mode:
                Preserves all active project files created or modified by OpenProducer
                (e.g. openproducer/, production/, clips, custom stories).
                Only updates files not touched by OpenProducer:
                  • agents/* -> example_openproducer_project/.agents/ (skills & workflows)
                  • AGENTS.md, STRUCTURE.md (framework documentation)

  --hard        Explicit Hard Transfer Mode (Default):
                Cleans and empties example_openproducer_project/, then does a complete fresh copy of:
                  • production_template/* -> example_openproducer_project/
                  • agents/* -> example_openproducer_project/.agents/

  --help, -h    Display this help screen.
`);
    process.exit(0);
}

/**
 * Safely clean a directory across all platforms (handles Windows EBUSY / locks)
 */
function cleanDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        return;
    }

    try {
        fs.rmSync(dir, {
            recursive: true,
            force: true,
            maxRetries: 3,
            retryDelay: 100,
        });
        fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
        // Fallback: Delete directory contents individually
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
            const entryPath = path.join(dir, entry);
            fs.rmSync(entryPath, {
                recursive: true,
                force: true,
                maxRetries: 3,
                retryDelay: 100,
            });
        }
    }
}

// 3. Execution
console.log("=".repeat(65));
console.log(
    `[OpenProducer] Sync Example Project -> ${isSoft ? "SOFT TRANSFER MODE" : "HARD TRANSFER MODE"}`,
);
console.log("=".repeat(65));
console.log(`Source Agents:    ${agentsDir}`);
console.log(`Source Template:  ${prodTemplateDir}`);
console.log(`Destination:      ${destDir}`);
console.log("");

// Verify sources exist
if (!fs.existsSync(agentsDir)) {
    console.error(`❌ Error: agents directory not found at: ${agentsDir}`);
    process.exit(1);
}
if (!fs.existsSync(prodTemplateDir)) {
    console.error(
        `❌ Error: production_template directory not found at: ${prodTemplateDir}`,
    );
    process.exit(1);
}

if (!isSoft) {
    // ==========================================
    // HARD TRANSFER MODE (Default)
    // ==========================================
    console.log("🧹 [1/3] Cleaning example_openproducer_project folder...");
    cleanDirectory(destDir);
    console.log("   ✓ Target directory wiped and recreated.");

    console.log(
        "📋 [2/3] Copying production_template/* -> example_openproducer_project/...",
    );
    fs.cpSync(prodTemplateDir, destDir, { recursive: true, force: true });
    console.log("   ✓ Production template assets copied.");

    console.log(
        "🤖 [3/3] Copying agents/* -> example_openproducer_project/.agents/...",
    );
    fs.mkdirSync(destAgentsDir, { recursive: true });
    fs.cpSync(agentsDir, destAgentsDir, { recursive: true, force: true });
    console.log("   ✓ Agent skills and workflows copied to .agents/.");

    console.log("");
    console.log(
        "✨ [DONE] Hard transfer complete! Fresh scaffold initialized.",
    );
} else {
    // ==========================================
    // SOFT TRANSFER MODE (--soft)
    // ==========================================
    const destExists = fs.existsSync(destDir);
    if (!destExists) {
        console.log(
            "ℹ Destination does not exist yet. Initializing full scaffold...",
        );
        fs.mkdirSync(destDir, { recursive: true });
        fs.cpSync(prodTemplateDir, destDir, { recursive: true, force: true });
        fs.mkdirSync(destAgentsDir, { recursive: true });
        fs.cpSync(agentsDir, destAgentsDir, { recursive: true, force: true });
        console.log("✨ [DONE] Initial scaffold created.");
        process.exit(0);
    }

    console.log("🛡️  [1/2] Preserving active OpenProducer files...");
    console.log(
        "   • Untouched: openproducer/ (configs, state, blueprint, visuals)",
    );
    console.log("   • Untouched: production/ (stories, scripts, clips, audio)");

    console.log(
        "🤖 [2/2] Updating untouched components (skills, workflows & documentation)...",
    );

    // A. Copy agents/* -> example_openproducer_project/.agents/
    fs.mkdirSync(destAgentsDir, { recursive: true });
    fs.cpSync(agentsDir, destAgentsDir, { recursive: true, force: true });
    console.log("   ✓ Refreshed .agents/ (skills & workflows updated).");

    // B. Refresh documentation files that are not touched by openproducer runtime
    const docFiles = ["AGENTS.md", "STRUCTURE.md"];
    for (const doc of docFiles) {
        const srcDoc = path.join(prodTemplateDir, doc);
        const targetDoc = path.join(destDir, doc);
        if (fs.existsSync(srcDoc)) {
            fs.cpSync(srcDoc, targetDoc, { force: true });
            console.log(`   ✓ Refreshed documentation: ${doc}`);
        }
    }

    console.log("");
    console.log(
        "✨ [DONE] Soft transfer complete! Agent skills and workflows synchronized.",
    );
}
