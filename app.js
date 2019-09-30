export default class App {
    calcCoordsForBtn(elemTable, elemCol) {
        return {
            tableCoords: {
                top: elemTable.offsetTop,
                reight: elemTable.offsetLeft + elemTable.offsetWidth,
                bottom: elemTable.offsetTop + elemTable.offsetHeight,
                left: elemTable.offsetLeft
            },

            colCoords: {
                top: elemCol.offsetTop,
                left: elemCol.offsetLeft
            }
        }
    }

    setCoordsForBtn(objCoords) {
        return {
            delRow: {
                top: objCoords.colCoords.top,
                left: objCoords.tableCoords.left,
            },
            delCol: {
                top: objCoords.tableCoords.top,
                left: objCoords.colCoords.left
            }
        }
    }

    view(viewMethod) {
        viewMethod;
    }
}