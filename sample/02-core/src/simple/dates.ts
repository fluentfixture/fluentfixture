import { date, now } from '@fluentfixture/core';

const today = new Date();
const tomorrow =  new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

/**
 * Create five dates between given dates each one's hours is equal to five.
 */

const stream1 = date(today, tomorrow).setHours(5);

console.log(stream1.many(5));

/**
 * Create date of now but minutes and milliseconds is zero.
 */

const stream2 = now().setMinutes(0).setMilliseconds(0);

console.log(stream2.single());
