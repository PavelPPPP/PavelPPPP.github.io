let containerTest = document.querySelector(".container__test");
let tableTest = document.querySelector("#tableTestJS");
let rows = document.querySelectorAll(".rows");
let btnsAdd = document.querySelectorAll(".btn__add");
let btns = document.querySelectorAll(".btn__del");
let col = document.querySelector(".cols");
let sizeObj;
let objCoords = {};
let flag = true;
let elParentCols;
let keyElCols;

let app = new App;

for (let el of btnsAdd) {
    if (el.dataset.btn === "addRow") {
        el.style.top = "100%";
        el.style.left = col.offsetLeft + "px";
        objCoords.elem2 = getCoords(el);
    }
    if (el.dataset.btn === "addCol") {
        el.style.left = "100%";
        el.style.top = col.offsetTop + "px";
        objCoords.elem3 = getCoords(el);
    }
}

document.addEventListener('click', (e) => {
    let elem = e.target;

    if (elem.dataset.btn === "delRow") {
        if (elParentCols !== undefined) {
            elParentCols.remove();
            elParentCols = undefined;
            elem.removeAttribute("style");
            rows = document.querySelectorAll(".rows");
        }
    }

    if (elem.dataset.btn === "delCol") {
        if (keyElCols !== undefined) {
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < rows[i].children.length; j++) {
                    if (j !== keyElCols) {
                        continue;
                    } else if (keyElCols !== undefined) {
                        rows[i].children[j].remove();
                        //keyElCols = undefined;
                        elem.removeAttribute("style");
                    }
                }
            }
        }
    }

    if (elem.dataset.btn === "addRow") {
        let row = document.createElement("div");
        
        row.className = "rows";

        for (let i = 0; i < rows[0].children.length; i++) {
            let col = document.createElement("div");
            col.className = "cols";
            row.append(col);
        }

        tableTest.append(row);
    }

    //objCoords = {};
    
    // if (elem.classList.contains("btn__test")) {
    //     console.log(objCoords);
    //     objCoords = {};
    // }
});

document.addEventListener('mouseout', (e) => {
    let elem = e.target;
    if (elem.className === "container__test") {
        console.log("false")
        for (let el of btns) {   
            el.removeAttribute("style");
        }
    }
});

document.addEventListener('mouseover', (e) => {
    let elem = e.target;
    // if (elem.className !== "container__test") {
    //     for (let el of btns) {   
    //         el.removeAttribute("style");
    //     }
    // }

    if (elem.className === "cols") {
        elParentCols = elem.parentElement;
        //console.log(elParentCols.children.length);
        for (let i = 0; i < elParentCols.children.length; i++) {
            if (elParentCols.children[i] === elem) {
                keyElCols = i;
            }
        }
    }
});

document.addEventListener('mousemove', (e) => {
    let elem = e.target;
    let arrFlag = [];

    objCoords.elem1 = getCoords(containerTest);
    if (elem.className === "cols") {
        let calc = app.calcCoordsForBtn(tableTest, elem);
        //btnsAdd = document.querySelectorAll(".btn__add");
        let setCoords = app.setCoordsForBtn(calc);
        let setBtn;

        for (let el of btns) {
            // if (el.dataset.btn === "addRow") {
            //     setBtn = setButton(setCoords.addRow.top + btnIndent, setCoords.addRow.left);
            //     app.view(setBtn.viewBtn(el));
            //     objCoords.elem2 = getCoords(el);
            // }
            // if (el.dataset.btn === "addCol") {
            //     setBtn = setButton(setCoords.addCol.top, setCoords.addCol.left + btnIndent);
            //     app.view(setBtn.viewBtn(el));
            //     objCoords.elem3 = getCoords(el);
            // }
            //  if (el.dataset.btn === "addRow") {
            //       el.style.top = "100%";
            //       el.style.left = col.offsetLeft + "px";
            //      objCoords.elem2 = getCoords(el);
            //  }
            //  if (el.dataset.btn === "addCol") {
            //       el.style.left = "100%";
            //       el.style.top = col.offsetTop + "px";
            //      objCoords.elem3 = getCoords(el);
            //  }
            if (el.dataset.btn === "delRow") {
                if (rows.length > 1) {
                    // setBtn = setButton(setCoords.delRow.top, setCoords.delRow.left - sizeObj.width - btnIndent);
                    setBtn = setButton(setCoords.delRow.top + 'px', 0 - sizeObj.width + 'px');
                    app.view(setBtn.viewBtn(el));
                    objCoords.elem4 = getCoords(el);
                }
            }
            if (el.dataset.btn === "delCol") {
                if (rows[0].children.length > 1) {
                    // setBtn = setButton(setCoords.delCol.top - sizeObj.height - btnIndent, setCoords.delCol.left);
                    setBtn = setButton(0 - sizeObj.height + 'px', setCoords.delCol.left + 'px');
                    
                    app.view(setBtn.viewBtn(el));
                    objCoords.elem5 = getCoords(el);
                }
            }
        }
    }

    for (let prop in objCoords) {
        if (
                (e.pageX >= objCoords[prop].horisontal.from) 
                && (e.pageX <= objCoords[prop].horisontal.to) 
                && (e.pageY >= objCoords[prop].vertical.from) 
                && (e.pageY <= objCoords[prop].vertical.to)
        ) {
            flag = true;
        } else {
            flag = false;
        }
        arrFlag.push(flag);
    }

    for (let el of arrFlag) {
        if (el) {
            flag = true;
            break;
        } else {
            flag = false;
        }
    }

    if (!flag) {
        for (let el of btns) {
            
            el.removeAttribute("style");
        }
    }

    
});

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        horisontal: {
            from: box.left + pageXOffset,
            to: box.left + pageXOffset + elem.offsetWidth
        },
        vertical: {
            from: box.top + pageYOffset,
            to: box.top + pageYOffset + elem.offsetHeight
        }
    }
}

window.addEventListener('load', () => {
    sizeObj = setBtnSize();
});

function setButton(top, left) {
    return new TestButton(top, left);
}

function setBtnSize() {
    let resObj = {};
    let btn = document.querySelector('.btn__del');
    btn.style.display = "block";
    btn.style.opacity = "0";
    
    resObj.width = btn.offsetWidth;
    resObj.height = btn.offsetHeight;
    btn.style.opacity = "1";
    btn.removeAttribute("style");

    return resObj;
}