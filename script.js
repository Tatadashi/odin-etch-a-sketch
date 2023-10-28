function createGrid () {
    //create 1 square div
    const squareDiv = document.createElement(`div`);
    squareDiv.style.cssText = `border: 5px solid; border-color: blue; background-color: red; min-width: 15px; aspect-ratio: 1/1; display: flex; flex: 1;`;

    //create 16 rows (horizontal) each containing a column (vertical) of 16 square divs, WIP grid can only shrink not grow 
    const container = document.querySelector(`#gridContainer`);
    for (i = 0; i < 16; i++) {
        const row = document.createElement("div");
        row.className = "row";
  
        for (j = 0; j < 16; j++) {
            const col = document.createElement("div");
            const colSquare = squareDiv.cloneNode();
            colSquare.textContent = `j`;
            col.appendChild(colSquare);
            row.appendChild(col);
        }

        container.appendChild(row);
    }    
}

createGrid();