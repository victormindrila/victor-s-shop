export function chunkArray(myArray, chunk_size) {
	let arrCpy = myArray.slice();
	let results = [];

	while (arrCpy.length) {
		results.push(arrCpy.splice(0, chunk_size));
	}

	return results;
}
