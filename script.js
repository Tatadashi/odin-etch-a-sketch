function createGrid () {
    const squareDiv = document.createElement(`div`);
    squareDiv.style.cssText = `border: 5px solid; border-color: blue; background-color: red; min-width: 50px; min-height: 50px; display: flex; flex: 1;`;
    
    const gridContainer = document.querySelector(`#gridContainer`);
    for (let i = 0; i < 16; i++) {
        const squareDivClone = squareDiv.cloneNode(squareDiv);
        squareDivClone.textContent = i + 1;        
        gridContainer.appendChild(squareDivClone);
    }
}

createGrid();