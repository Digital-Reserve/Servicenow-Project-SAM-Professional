/*
 * Software Asset Workspace installer (fallback only)
 * Use this ONLY when Stage 1 says the Software Asset Workspace is missing and the
 * normal install from "All Available Applications" did not work.
 * Where: All > System Definition > Scripts - Background. Paste, then click "Run script".
 * Then watch progress: type sys_execution_tracker.list in the All menu search and
 * open the row called "Plugin Installer". Wait until it shows 100 percent.
 */
var plugins = [];
plugins.push('com.sn_sam_workspace');
var main = new GlideMultiPluginManagerWorker();
main.setPluginIds(plugins);
main.setProgressName('Plugin Installer');
main.setBackground(true);
main.start();
gs.print('Workspace installation started. Open sys_execution_tracker.list to follow it.');
