"use strict";

const { Responder } = require("cote");
const Jimp = require("jimp");
const path = require("path");

const responder = new Responder({ name: "image-to-thumbnail" });

responder.on("transform-image", async (req, done) => {
  const { image } = req;

  const imagePath = path.join(__dirname, "..", "public", "images", image);

  const outputPath = path.join(__dirname, "..", "public", "thumbnail");

  try {
    const imageSelected = await Jimp.read(imagePath);
    await imageSelected.resize(100, 100).writeAsync(outputPath);

    const thumbnailLocation = path.join(
      __dirname,
      "..",
      "public",
      "thumbnails",
      image,
    );
    await imageSelected.writeAsync(thumbnailLocation);

    done(thumbnailLocation);
  } catch (error) {
    console.error("Error during image transformation:", error);
    done(new Error("Error creating thumbnail"));
  }
});
