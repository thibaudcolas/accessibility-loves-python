import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Img from "./Img";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#6F6F6F",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const defaultImages = [
  {
    src:
      "/kontrasto/Blue sky and sea in the background with a cliff face to the rigt half, people atop the cliff.jpg",
    alt:
      "Blue sky and sea in the background with a cliff face to the rigt half, people atop the cliff",
    serverResults: {
      wcag2: {
        text_color: "#ffffff",
        text_theme: "light",
        bg_color: "#4971a1",
        bg_theme: "dark",
      },
      wcag3: {
        text_color: "#ffffff",
        text_theme: "light",
        bg_color: "#4971a1",
        bg_theme: "dark",
      },
    },
  },
  {
    src:
      "/kontrasto/Lake at dusk, with reflections of the sunset, and forests on the horizon; a boat on the foreground heads towards the sun.jpg",
    alt:
      "Lake at dusk, with reflections of the sunset, and forests on the horizon; a boat on the foreground heads towards the sun",
    serverResults: {
      wcag2: {
        text_color: "#000000",
        text_theme: "dark",
        bg_color: "#889089",
        bg_theme: "light",
      },
      wcag3: {
        text_color: "#ffffff",
        text_theme: "light",
        bg_color: "#889089",
        bg_theme: "dark",
      },
    },
  },
  {
    src:
      "/kontrasto/Mountainous landscape at dusk, with dark trees and mountain contours, and a bright sky with orange clouds.jpg",
    alt:
      "Mountainous landscape at dusk, with dark trees and mountain contours, and a bright sky with orange clouds",
    serverResults: {
      wcag2: {
        text_color: "#ffffff",
        text_theme: "light",
        bg_color: "#604a4a",
        bg_theme: "dark",
      },
      wcag3: {
        text_color: "#ffffff",
        text_theme: "light",
        bg_color: "#604a4a",
        bg_theme: "dark",
      },
    },
  },
  {
    src:
      "/kontrasto/Snow-covered landscape with snow-covered trees, blue-white sky, and a snow-covered radio tower on the horizon.jpg",
    alt:
      "Snow-covered landscape with snow-covered trees, blue-white sky, and a snow-covered radio tower on the horizon",
    serverResults: {
      wcag2: {
        text_color: "#000000",
        text_theme: "dark",
        bg_color: "#6b92cf",
        bg_theme: "light",
      },
      wcag3: {
        text_color: "#ffffff",
        text_theme: "light",
        bg_color: "#6b92cf",
        bg_theme: "dark",
      },
    },
  },
];

function Dropzone() {
  const [serverResults, setServerResults] = useState({});
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );

    const data = new FormData();
    data.append("image", acceptedFiles[0]);
    fetch("/api/contrast", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setServerResults(data);
      });
    // acceptedFiles.forEach((file) => {
    //   const reader = new FileReader();

    //   reader.onabort = () => console.log("file reading was aborted");
    //   reader.onerror = () => console.log("file reading has failed");
    //   reader.onload = () => {
    //     // Do whatever you want with the file contents
    //     const binaryStr = reader.result;
    //     console.log(binaryStr);
    //   };
    //   reader.readAsArrayBuffer(file);
    // });
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const thumbs = files.map((file) => (
    <Img key={file.name} src={file.preview} serverResults={serverResults} />
  ));

  useEffect(() => {
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="col-span-2">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="p-4">
          Drop images (<em>JPEG, PNG</em>) here, or click to select files
        </p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      {defaultImages.map((i) => (
        <Img
          key={i.src}
          src={i.src}
          alt={i.alt}
          serverResults={i.serverResults}
        />
      ))}
    </div>
  );
}

export default Dropzone;
