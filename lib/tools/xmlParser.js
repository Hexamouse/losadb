const fs = require("fs");
// const path = require("path");

const { XMLParser } = require("fast-xml-parser");

/**
 * Parses an XML file and returns an object containing imageset layout.
 *
 * @param {string} filePath - Path to the XML file.
 * @returns {Object} An object containing the imageset layout.
 */
function parseXml(filePath) {
  const xmlData = fs.readFileSync(filePath, "utf-8");

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: false,
  });

  const jsonObj = parser.parse(xmlData);

  const imagesetLayout = {
    Imageset: (Array.isArray(jsonObj.ImagesetLayout.Imageset)
      ? jsonObj.ImagesetLayout.Imageset
      : [jsonObj.ImagesetLayout.Imageset]
    ).map((imageset) => {
      // skipping .bmp files
      if (imageset.File.endsWith(".bmp")) return null;

      // force skip for UIIconPack158
      if (imageset?.Name === "UIIconPack158") return null;

      return {
        Name: imageset?.Name,
        File: imageset.File,
        Images: (Array.isArray(imageset.Image)
          ? imageset.Image
          : [imageset.Image]
        )
          .map((image) => {
            return {
              Name: image?.Name,
              X: Number(image?.X ?? 0),
              Y: Number(image?.Y ?? 0),
              Width: Number(image?.Width ?? 0),
              Height: Number(image?.Height ?? 0),
              OffsetX: Number(image?.OffsetX ?? 0),
              OffsetY: Number(image?.OffsetY ?? 0),
            };
          })
          .filter((image) => image !== null),
      };
    }),
  };

  console.log("Final Imageset Layout ");

  return imagesetLayout;
}

module.exports = { parseXml };