"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageResizer_1 = __importDefault(require("./ImageResizer"));
(0, ImageResizer_1.default)({ inputPath: "./texturesInput/WarZoneTextures", sizeMultiplier: 1 / 4 });
