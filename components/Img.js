import { useState, useCallback, useEffect, useRef } from "react";
import ColorThief from "colorthief";

const arrayToRGBString = (rgb) => `rgb(${rgb.join(",")})`;
const hexToRGBArray = (hex) =>
  hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
const rgbArrayToHex = (rgb) =>
  `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
const rgbStringToArray = (rgb) =>
  rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .splice(1, 3)
    .map((v) => Number(v));
const rgbStringToHex = (rgb) => rgbArrayToHex(rgbStringToArray(rgb));

function contrast(rgb) {
  var o = Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000,
  );

  return o <= 180 ? "dark" : "light";
}

const Img = ({ src, serverColors = [] }) => {
  const [colors, setColors] = useState([]);
  const img = useRef(null);
  const onLoad = useCallback(() => {
    const colorThief = new ColorThief();
    setColors([colorThief.getColor(img.current)]);
  }, [img]);

  useEffect(() => {
    if (img.complete) {
      onLoad();
    }
  }, [img]);
  return (
    <>
      <div className="inline-flex rounded-sm border border-gray-600 mb-2 me-2 w-[240px] h-[240px] p-1 box-border">
        <div className="grid">
          <img
            ref={img}
            onLoad={onLoad}
            src={src}
            className="block my-auto object-cover"
            style={{ gridRow: 1, gridColumn: 1 }}
          />
          <div className="my-auto" style={{ gridRow: 1, gridColumn: 1 }}>
            <p>
              <span
                className={`p-1 text-xl ${
                  colors.length
                    ? contrast(colors[0]) === "dark"
                      ? "text-white"
                      : "text-gray-900"
                    : ""
                }`}
                style={{
                  backgroundColor: colors.length
                    ? `rgba(${colors[0][0]} ${colors[0][1]} ${colors[0][2]} / 80%)`
                    : null,
                }}
              >
                Client
              </span>
            </p>
            <p>
              <span
                className={`p-1 text-xl ${
                  serverColors.length
                    ? contrast(serverColors[0]) === "dark"
                      ? "text-white"
                      : "text-gray-900"
                    : ""
                }`}
                style={{
                  backgroundColor: serverColors.length
                    ? `rgba(${serverColors[0][0]} ${serverColors[0][1]} ${serverColors[0][2]} / 80%)`
                    : null,
                }}
              >
                Server
              </span>
            </p>
          </div>
        </div>
      </div>
      {colors.map((c) => {
        const hex = rgbArrayToHex(c);
        return (
          <div
            key={hex}
            className="w-10 h-10 rounded-full"
            style={{ backgroundColor: hex }}
          ></div>
        );
      })}
      {serverColors.map((c) => {
        const hex = rgbArrayToHex(c);
        return (
          <div
            key={hex}
            className="w-10 h-10 rounded-full"
            style={{ backgroundColor: hex }}
          ></div>
        );
      })}
    </>
  );
};

export default Img;
