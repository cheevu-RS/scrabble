/**
 * In-place deletion of all occurences of an object in an array of objects.
 *
 * @param {array} inputArray The array of objects to delete from.
 * @param {object} objectToDelete The object to be deleted.
 * @return {null}
 */

const deleteFromArrayOfObjects = (inputArray, objectToDelete) => {
    const indicesToDelete = []
    inputArray.map((item, index) => {
        let flag = true
        // loop through all the attributes of the object to be deleted and compare
        // eslint-disable-next-line no-restricted-syntax
        for (const property in objectToDelete) {
            if (item[property] !== objectToDelete[property]) {
                flag = false
                break
            }
        }
        if (flag) {
            indicesToDelete.push(index)
        }
        return false
    })
    indicesToDelete.forEach((indice) => {
        inputArray.splice(indice, 1)
        return false
    })
}

module.exports = {
    deleteFromArrayOfObjects,
}
