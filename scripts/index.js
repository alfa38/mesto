import { initializeCards } from "./card.js";
import { initModalControls } from "./modalControls.js";
import { initializeValidation } from "./validate.js";
import { selectors } from "./constants.js";


initializeCards();

initModalControls();
initializeValidation(selectors);
