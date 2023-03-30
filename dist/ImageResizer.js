"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const fs = __importStar(require("fs"));
function ResizeAllImagesInFolder(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputPath = options.inputPath;
        // get all images in inputPath 
        const allImagesPaths = fs.readdirSync(inputPath);
        // create new output path
        const splitPath = inputPath.split('texturesInput/');
        const outputPath = "texturesOutput" + "/" + splitPath[splitPath.length - 1];
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }
        // for all images: resize then write to new folder
        for (let index = 0; index < allImagesPaths.length; index++) {
            console.clear();
            console.log(`Doing image ${index + 1}/${allImagesPaths.length}`);
            // read image
            const imagePath = inputPath + "/" + allImagesPaths[index];
            const imageData = yield jimp_1.default.read(imagePath);
            // resize image
            const imageSize = {
                x: Math.floor(imageData.bitmap.width * options.sizeMultiplier),
                y: Math.floor(imageData.bitmap.height * options.sizeMultiplier)
            };
            const resizedImage = imageData.resize(imageSize.x, imageSize.y);
            yield resizedImage.write(outputPath + "/" + allImagesPaths[index]);
        }
    });
}
exports.default = ResizeAllImagesInFolder;
