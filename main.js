let maze = [
	[' ', ' ', ' ', '*', ' ', ' ', ' '],
	['*', '*', ' ', '*', ' ', '*', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', '*', '*', '*', '*', '*', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', 'e']
];

let path = "";

const move = (current, previous) => {
	const {x, y} = current;
	let dirs = [];
	let strs = [];
	let prev;
	let next;

	// determine if an UP is possible
	if (y !== 0) {
		dirs.push({x, y: y - 1});
		strs.push("U");
	}

	// determine if a RIGHT is possible
	if (x !== maze[y].length - 1) {
		dirs.push({x: x + 1, y});
		strs.push("R");
	}

	// determine if a DOWN is possible
	if (!!maze[y + 1][x]) {
		dirs.push({x, y: y + 1});
		strs.push("D");
	}

	// determine if a LEFT is possible
	if (x !== 0) {
		dirs.push({x: x - 1, y});
		strs.push("L");
	}

	// loop over possible directions
	for (let i = 0; i < dirs.length; i++) {
		let dir = dirs[i];
		// check to ensure it is not equal to the previous, which we want to be our last resort
		if (!previous || dir.x !== previous.x || dir.y !== previous.y) {
			// check if this is the exit
			if(maze[dir.y][dir.x] === "e") {
				path += strs[i];
				return path;
			// ensure it is not blocked
			} else if (maze[dir.y][dir.x] !== "*") {
				path += strs[i];
				next = Object.assign({}, dir);
				break;
			}
		// if we did match the previous, save it for the last round
		} else {
			prev = strs[i];
		}
	}

	// if no direction was found, go back the way we came
	if (!next) {
		path += prev;
		next = Object.assign({}, previous);
	}

	return move(next, current);
};

console.log(move({x: 0, y: 0}));