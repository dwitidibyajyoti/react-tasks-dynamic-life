

function getindicesTarget(array, target) {

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const requiredElement = target - element;

        // console.log(   `Element: ${element}, Required Element: ${requiredElement}, Index: ${index}`);

        // Check if the required element exists in the array
        const requiredElementIndex = array.indexOf(requiredElement);
        if (requiredElementIndex !== -1) {
            return [index, requiredElementIndex];
        }
    }

}



function twoSum(nums, target) {
    if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
    if (nums.length < 2) throw new Error("need at least two numbers");

    const seen = new Map();      // value → index

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (seen.has(complement)) {
            return [seen.get(complement), i];   // found the pair
        }
        seen.set(nums[i], i);                 // store current value’s index
    }

    throw new Error("no two‑sum solution");
}

// example
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]



// console.log(getindicesTarget([2, 7, 11, 15], 9));



// const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://dwitidibyajyoti:XXXXXXXXXXX@prise-compare.fpbgqm2.mongodb.net/?retryWrites=true&w=majority&appName=prise-compare";

// async function getData() {
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         const db = client.db("prise-compare"); // replace with actual DB name
//         const collection = db.collection("sale"); // replace with actual collection name

//         const data = await collection.find({}).toArray();
//         console.log(data);
//     } catch (err) {
//         console.error("Error:", err);
//     } finally {
//         await client.close();
//     }
// }

// getData();


// dbFetch.mjs  (or keep .js since the project is already ESM)
