export function getValueViaDotNotation(object, path) {
    const pathArray = path.split(".");
    let currentObjectNode = object;

    pathArray.forEach(nodeName => {
        currentObjectNode = currentObjectNode[nodeName];
    });

    return currentObjectNode;
}

export function nestedToFlat(object) {
    const keys = Object.keys(object);
    const newObject = {};

    keys.forEach(key => {
        const value = object[key];

        if (typeof value === "object" && value !== null && value.constructor === {}.constructor) {
            const nestedObject = nestedToFlat(object[key]);

            Object.keys(nestedObject).forEach(nestedKey => {
                newObject[`${key}.${nestedKey}`] = nestedObject[nestedKey];
            });
        } else {
            newObject[key] =value;
        }
    });

    return newObject;
}

export function flatToNested(object) {
    const keys = Object.keys(object);
    const newObject = {};

    keys.forEach(path => {
        const pathArray = path.split(".");
        const value = object[path];
        const currentKey = pathArray.shift();
        const nestedKey = pathArray.join(".");

        if (nestedKey.length) {
            const nestedObject = newObject[currentKey] || {};

            nestedObject[nestedKey] = value;
            newObject[currentKey] = flatToNested(nestedObject);
        } else {
            newObject[currentKey] = value;
        }
    });

    return newObject;
}

export function getSrcFromFile(file, callback) {
    let reader = new FileReader();

    reader.onload = event => {
        callback(event.target.result);
    };

    reader.readAsDataURL(file);
}