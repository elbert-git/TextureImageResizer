import Jimp from "jimp";
import * as fs from 'fs';

interface resizerOptions{
  inputPath:string;
  sizeMultiplier:number;
}

export default async function ResizeAllImagesInFolder(options:resizerOptions){
  const inputPath = options.inputPath;

  // get all images in inputPath 
  const allImagesPaths =  fs.readdirSync(inputPath);

  // create new output path
  const splitPath = inputPath.split('texturesInput/')
  const outputPath = "texturesOutput" + "/" + splitPath[splitPath.length-1];
  if(!fs.existsSync(outputPath)){fs.mkdirSync(outputPath)}

  // for all images: resize then write to new folder
  for (let index = 0; index < allImagesPaths.length; index++) {
    console.clear();
    console.log(`Doing image ${index+1}/${allImagesPaths.length}`);

    // read image
    const imagePath = inputPath + "/" + allImagesPaths[index];
    const imageData = await Jimp.read(imagePath);

    // resize image
    const imageSize = {
      x: Math.floor(imageData.bitmap.width * options.sizeMultiplier),
      y: Math.floor(imageData.bitmap.height * options.sizeMultiplier)
    }
    const resizedImage = imageData.resize(imageSize.x, imageSize.y);

    await resizedImage.write(outputPath+"/"+allImagesPaths[index]);
  }
}