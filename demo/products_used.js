import { used_iphone } from './database/used/iphone.js';
import { used_ipad } from './database/used/ipad.js';
import { used_macbook } from './database/used/macbook.js';
import { used_watch } from './database/used/watch.js';
import { used_airpods } from './database/used/airpods.js';
import { used_gadgets } from './database/used/gadgets.js';

/**
 * 🍏 ВЖИВАНА ТЕХНІКА - ОБ'ЄДНАНА БАЗА
 */
export const productsUsed = [
    ...used_iphone,
    ...used_ipad,
    ...used_macbook,
    ...used_watch,
    ...used_airpods,
    ...used_gadgets
];
