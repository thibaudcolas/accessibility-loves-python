import { useState, useCallback, useEffect, useRef } from "react";
import {
  wcag_2_contrast_light_or_dark,
  wcag_3_contrast_light_or_dark,
} from "kontrasto";

const Img = ({ src, serverResults = {} }) => {
  const [results, setResults] = useState([
    serverResults,
    serverResults,
    serverResults,
    serverResults,
    serverResults,
    serverResults,
  ]);
  const img = useRef(null);
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);
  const text4 = useRef(null);
  const text5 = useRef(null);
  const text6 = useRef(null);
  const onLoad = useCallback(() => {
    setResults([
      {
        wcag2: wcag_2_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text1.current,
        ),
        wcag3: wcag_3_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text1.current,
        ),
      },
      {
        wcag2: wcag_2_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text2.current,
        ),
        wcag3: wcag_3_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text2.current,
        ),
      },
      {
        wcag2: wcag_2_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text3.current,
        ),
        wcag3: wcag_3_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text3.current,
        ),
      },
      {
        wcag2: wcag_2_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text4.current,
        ),
        wcag3: wcag_3_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text4.current,
        ),
      },
      {
        wcag2: wcag_2_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text5.current,
        ),
        wcag3: wcag_3_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text5.current,
        ),
      },
      {
        wcag2: wcag_2_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text6.current,
        ),
        wcag3: wcag_3_contrast_light_or_dark(
          img.current,
          "#ffffff",
          "#000000",
          text6.current,
        ),
      },
    ]);
  }, [img, text1, text2, text3, text4, text5, text6]);

  useEffect(() => {
    if (img.current.complete) {
      onLoad();
    }
  }, [img]);
  return (
    <>
      <div
        className="inline-flex rounded-sm border border-gray-600 mb-2 me-2 print:w-[240px] print:h-[240px] w-full p-1 box-border"
        style={{ maxWidth: "900px" }}
      >
        <div className="grid grid-cols-3 grid-rows-3">
          <img
            ref={img}
            onLoad={onLoad}
            src={src}
            className="block my-auto object-cover"
            style={{
              gridRow: 1,
              gridColumn: 1,
              gridRowEnd: 4,
              gridColumnEnd: 4,
            }}
          />
          <div className="my-auto" style={{ gridRow: 1, gridColumn: 1 }}>
            <p>
              <span
                className="pe-2 inline-block text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${serverResults.wcag2?.bg_color}99`,
                  "--kontrasto-text": serverResults.wcag2?.text_color,
                }}
              >
                Server WCAG2
              </span>
              <span
                className="pe-2 inline-block text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${serverResults.wcag3?.bg_color}99`,
                  "--kontrasto-text": serverResults.wcag3?.text_color,
                }}
              >
                Server WCAG3
              </span>
            </p>
            <p>
              <span
                ref={text1}
                className="p-1 text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${results[0].wcag2?.bg_color}99`,
                  "--kontrasto-text": results[0].wcag2?.text_color,
                }}
              >
                Client WCAG2
              </span>
              <span
                ref={text2}
                className="p-1 text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${results[1].wcag3?.bg_color}99`,
                  "--kontrasto-text": results[1].wcag3?.text_color,
                }}
              >
                Client WCAG3
              </span>
            </p>
          </div>

          <div className="my-auto" style={{ gridRow: 2, gridColumn: 2 }}>
            <p>
              <span
                className="pe-2 inline-block text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${serverResults.wcag2?.bg_color}99`,
                  "--kontrasto-text": serverResults.wcag2?.text_color,
                }}
              >
                Server WCAG2
              </span>
              <span
                className="pe-2 inline-block text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${serverResults.wcag3?.bg_color}99`,
                  "--kontrasto-text": serverResults.wcag3?.text_color,
                }}
              >
                Server WCAG3
              </span>
            </p>
            <p>
              <span
                ref={text3}
                className="p-1 text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${results[2].wcag2?.bg_color}99`,
                  "--kontrasto-text": results[2].wcag2?.text_color,
                }}
              >
                Client WCAG2
              </span>
              <span
                ref={text4}
                className="p-1 text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${results[3].wcag3?.bg_color}99`,
                  "--kontrasto-text": results[3].wcag3?.text_color,
                }}
              >
                Client WCAG3
              </span>
            </p>
          </div>

          <div className="my-auto" style={{ gridRow: 3, gridColumn: 3 }}>
            <p>
              <span
                className="pe-2 inline-block text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${serverResults.wcag2?.bg_color}99`,
                  "--kontrasto-text": serverResults.wcag2?.text_color,
                }}
              >
                Server WCAG2
              </span>
              <span
                className="pe-2 inline-block text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${serverResults.wcag3?.bg_color}99`,
                  "--kontrasto-text": serverResults.wcag3?.text_color,
                }}
              >
                Server WCAG3
              </span>
            </p>
            <p>
              <span
                ref={text5}
                className="p-1 text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${results[4].wcag2?.bg_color}99`,
                  "--kontrasto-text": results[4].wcag2?.text_color,
                }}
              >
                Client WCAG2
              </span>
              <span
                ref={text6}
                className="p-1 text-xl kontrasto-text-bg"
                style={{
                  "--kontrasto-bg": `${results[5].wcag3?.bg_color}99`,
                  "--kontrasto-text": results[5].wcag3?.text_color,
                }}
              >
                Client WCAG3
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Img;
