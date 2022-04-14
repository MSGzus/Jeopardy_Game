//INITIALIZE THE GAME BOARD ON PAGE LOAD 
initCatRow()
initBoard()

document.querySelector('button').addEventListener('click', buildCategories)

function initCatRow(){
    let catRow = document.getElementById('category-row')

    for (let j = 0; j < 6; j++){
        let box = document.createElement('div')
        box.className = 'clue-box category-box'

        catRow.appendChild(box)
    }
}


function initBoard(){

    let board = document.getElementById('clue-board')

    //GENERATE 5 rows then place 6 boxes in each row (nested loop - generate 5 rows, then generate 6 boxes in each row)
    //outer loop runs once, creates a row, adds a class name of clue-row, and then inner loop runs 6 times, creates 

    for (let i = 0; i < 5; i++){
        let row = document.createElement('div')
        let boxValue = 200 * (i + 1)
        row.className = 'clue-row'

        for (let j = 0; j < 6; j++){
            let box = document.createElement('div')
            box.className = 'clue-box'
            box.textContent = '$' + boxValue

            box.addEventListener('click', getClue, false)
            row.appendChild(box)
        }

        board.appendChild(row)
    }

}

function randInt(){
    return Math.floor(Math.random() * (18418) + 1)
}

let catArray = []

function buildCategories(){

    const fetchReq1 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`

    ).then((res) => res.json()); //hit the API and then parse result as json and save as fetchReq1
    
    const fetchReq2 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`

    ).then((res) => res.json());

    const fetchReq3 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`

    ).then((res) => res.json());

    const fetchReq4 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`

    ).then((res) => res.json());

    const fetchReq5 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`

    ).then((res) => res.json());

    const fetchReq6 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`

    ).then((res) => res.json());

    //Promise waits to fill that array until all the fetches are complete
    const allData = Promise.all([fetchReq1, fetchReq2, fetchReq3, fetchReq4, fetchReq5, fetchReq6])

    allData.then((res) => {
        console.log(res)
        catArray = res
    })
}


function setCategories(catArray){
    //grabbing each box/div in the row, grabbing that div as we loop through, set the inner HTML of that div to the title item inside of our cat array
    //load categories to the board
    let element = document.getElementById('category-row')
        let children = element.children;
        for (let i = 0; i < children.length; i++){
            children[i].innerHTML = catArray[i].title
        }
}



function getClue(event) {
    let child = event.currentTarget
    child.classList.add('clicked-box')
    let boxValue = child.innerHTML.slice(1)

    // looking for the box that was clicked, it's locating the row parent, use a prototype to look at the relationship between the parent and the children, and figure out what index that child is
    //treat this row like an array
    //go into the clues and find the one with the correct $ value
    let parent = child.parentNode
    let index = Array.prototype.findIndex.call(parent.children, (c) => c === child)
    let cluesList = catArray[index].clues
    let clue = cluesList.find(obj => {
        return obj.value == boxValue
    })
}