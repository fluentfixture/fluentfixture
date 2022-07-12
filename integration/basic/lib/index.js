"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fluentfixture/core");
const format = (0, core_1.int)(1, 100).format('NUM#{}');
console.log(format.single());
