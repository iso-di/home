import { new_iphone } from './database/new/iphone.js';
import { new_ipad } from './database/new/ipad.js';
import { new_macbook } from './database/new/macbook.js';
import { new_watch } from './database/new/watch.js';
import { new_airpods } from './database/new/airpods.js';
import { new_gadgets } from './database/new/gadgets.js';

/**
 * 🆕 НОВА ТЕХНІКА - ОБ'ЄДНАНА БАЗА
 */
export const productsNew = [
    ...new_iphone,
    ...new_ipad,
    ...new_macbook,
    ...new_watch,
    ...new_airpods,
    ...new_gadgets
];
