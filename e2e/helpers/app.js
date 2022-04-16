const { exec } = require('child_process');

function runCommand(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(new Error(`exec error: ${stderr}`));
				return;
			}
			resolve();
		});
	});
}

async function prepareAndroid() {
	if (device.getPlatform() !== 'android') {
		return;
	}
	await runCommand('adb shell settings put secure spell_checker_enabled 0');
	await runCommand('adb shell settings put secure autofill_service null');
	await runCommand('adb shell settings put global window_animation_scale 0.0');
	await runCommand('adb shell settings put global transition_animation_scale 0.0');
	await runCommand('adb shell settings put global animator_duration_scale 0.0');
}

module.exports = {
  prepareAndroid
} 