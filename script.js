function createGrid () {
    //create 1 square div
    const squareDiv = document.createElement(`div`);
    squareDiv.style.cssText = `border: 2px solid; border-color: black; min-width: 15px; aspect-ratio: 1/1;`;

    //create 16 rows (horizontal) each containing a column (vertical) of 16 square divs, WIP grid can only shrink not grow 
    const container = document.querySelector(`#gridContainer`);
    for (i = 0; i < 16; i++) {
        const row = document.createElement("div");
        row.className = "row";
        row.style.cssText = `display: flex; flex: 1; flex-direction: column;`;
  
        for (j = 0; j < 16; j++) {
            const col = document.createElement("div");
            const colSquare = squareDiv.cloneNode();
            col.appendChild(colSquare);
            row.appendChild(col);
        }

        container.appendChild(row);
    }    
}

createGrid();