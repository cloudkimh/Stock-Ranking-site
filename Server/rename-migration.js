import fs from 'fs';
import path from 'path';

const dir = './database/migrations';
const files = fs.readdirSync(dir);

const latest = files
	.filter(f => f.endsWith('.js'))
	.map(f => ({
		name: f,
		time: fs.statSync(path.join(dir, f)).mtime.getTime()
	}))
	.sort((a, b) => b.time - a.time)[0];

if (latest) {
	const oldPath = path.join(dir, latest.name);
	const newPath = path.join(dir, latest.name.replace('.js', '.cjs'));
	fs.renameSync(oldPath, newPath);
	console.log(`Renamed ${latest.name} → ${path.basename(newPath)}`);
}
