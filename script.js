function createGrid (squareCount = 16) {
    //create 1 square div
    const squareDiv = document.createElement(`div`);
    squareDiv.style.cssText = `border: 1px solid; border-color: black; min-width: 3px; background-color: white; aspect-ratio: 1/1;`;
    squareDiv.classList.add(`box`);
    squareDiv.dataset.darkenPercent = 0;

    //have to later subtract button heihgt from vertical viewport because it affects space grid can fit in (width does not affect this)
    const BUTTON_HEIGHT_AND_MARGIN = 30;

    //find the smaller viewport dimension in order to calculate maximum size of 1 square div in the grid
    let viewportHeight = window.innerHeight - BUTTON_HEIGHT_AND_MARGIN;
    let viewportWidth = window.innerWidth;
    let smallerViewportDimension = viewportWidth > viewportHeight ? viewportHeight : viewportWidth;

    const CONTAINER_PADDING_PIXELS = 20;
    smallerViewportDimension -= CONTAINER_PADDING_PIXELS;

    //get the biggest integer that a square div can be with the viewport
    const NUMBER_OF_SQUARES_IN_ROW_OR_COLUMN = squareCount;
    smallerViewportDimension = Math.floor(smallerViewportDimension / NUMBER_OF_SQUARES_IN_ROW_OR_COLUMN);

    //prevent width from shrinking past the minimum width of a square div
    const MINIMUM_LENGTH_OF_SQUARE_DIV = 3;
    smallerViewportDimension = smallerViewportDimension < MINIMUM_LENGTH_OF_SQUARE_DIV ? MINIMUM_LENGTH_OF_SQUARE_DIV : smallerViewportDimension;

    //create 16 columns (vertical) each containing a row (horizontal) of 16 square divs,
    const container = document.querySelector(`#gridContainer`);
    for (i = 0; i < NUMBER_OF_SQUARES_IN_ROW_OR_COLUMN; i++) {
        const col = document.createElement("div");
        
        //max width makes it so that the square div does not grow past viewport size
        col.style.cssText = `display: flex; flex-direction: column; flex: 1; max-width: ${smallerViewportDimension}px;`;
  
        for (j = 0; j < NUMBER_OF_SQUARES_IN_ROW_OR_COLUMN; j++) {
            const row = document.createElement("div");
            const rowSquare = squareDiv.cloneNode();
            row.appendChild(rowSquare);
            col.appendChild(row);
        }

        container.appendChild(col);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function getRandomRGB(box) {
    const MAX_RGB_VALUE = 255;
    let redValue = getRandomInt(MAX_RGB_VALUE);
    let greenValue = getRandomInt(MAX_RGB_VALUE);
    let blueValue = getRandomInt(MAX_RGB_VALUE);

    //stpre original (may be darkened later) RGB values
    box.dataset.originalRed = redValue;
    box.dataset.originalGreen = greenValue;
    box.dataset.originalBlue = blueValue;

    return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

//Darkens box color by 10%-
function darkenColor(box) {
    let darkenPercent = Number(box.dataset.darkenPercent);

    //darken by 10 percent
    darkenPercent += 10;
    box.dataset.darkenPercent = darkenPercent;

    const NUMBER_OF_TIMES_TO_DARKEN_BY_10_PERCENT = darkenPercent / 10;

    const ORIGINAL_RED_VALUE = Number(box.dataset.originalRed);
    const ORIGINAL_GREEN_VALUE = Number(box.dataset.originalGreen);
    const ORIGINAL_BLUE_VALUE = Number(box.dataset.originalBlue);

    //get ten percent of original RGB values rounded down
    let tenPercentOriginalRed = Math.floor(ORIGINAL_RED_VALUE * 0.1);
    let tenPercentOriginalGreen = Math.floor(ORIGINAL_GREEN_VALUE * 0.1);
    let tenPercentOriginalBlue = Math.floor(ORIGINAL_BLUE_VALUE * 0.1);

    let darkenedRedValue = ORIGINAL_RED_VALUE - (tenPercentOriginalRed * NUMBER_OF_TIMES_TO_DARKEN_BY_10_PERCENT);
    let darkenedGreenValue = ORIGINAL_GREEN_VALUE - (tenPercentOriginalGreen * NUMBER_OF_TIMES_TO_DARKEN_BY_10_PERCENT);
    let darkenedBlueValue = ORIGINAL_BLUE_VALUE - (tenPercentOriginalBlue * NUMBER_OF_TIMES_TO_DARKEN_BY_10_PERCENT);

    //makes sure that after 10 hovers on colored box will result in black box (have to do this since rounding makes it only close to RGB 0,0,0)
    if (darkenPercent == 100) {
        box.style.backgroundColor = `rgb(0, 0, 0)`;
    } else {
        box.style.backgroundColor = `rgb(${darkenedRedValue}, ${darkenedGreenValue}, ${darkenedBlueValue}`;
    }
}

function changeColor(box) {
    let randomColor = getRandomRGB(box);
    box.style.backgroundColor = randomColor;
    box.classList.add(`finalColor`);
}
//select all square divs and make it so they turn random color (rgb) when hovered on
function changeColorOnHover() {
    let squareDiv = document.querySelectorAll(`.box`);
    squareDiv.forEach((box) => {
        box.addEventListener(`mouseover`, () => {
            if (!box.classList.contains(`finalColor`)) {
                changeColor(box);
            } else if (Number(box.dataset.darkenPercent) < 100) {
                darkenColor(box);
            }
        });
    });
}

createGrid()
changeColorOnHover();

const input = document.querySelector(`#inputButton`);
input.addEventListener(`click`, () => {
    let squareCount;

    //last condition (regex) outputs a NOT boolean for [if squareCount only contains one or more digits (doesn't accept `.` since not a digit)]
    while (squareCount < 1 || squareCount > 100 || !/^[0-9]+$/.test(squareCount)){
        squareCount = prompt(`How many squares per side on grid? Input integer from 1 to 100, inclusive.`);
    }

    //delete old (or default) gird and create new one using user input  
    const container = document.querySelector(`#gridContainer`);
    container.replaceChildren();
    createGrid(squareCount);
    changeColorOnHover();
});