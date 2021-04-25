import { useState } from "react";
import dynamic from "next/dynamic";

import Select from "../../components/Select";
import fixtures from "../../utils/curlylint/fixtures";

const Editor = dynamic(import("../../components/Editor"), { ssr: false });

const CurlylintDemo = () => {
  const [example, setExample] = useState("missing_lang");
  const [value, setValue] = useState(fixtures.missing_lang.source);
  const [annotations, setAnnotations] = useState(fixtures.missing_lang.output);
  return (
    <div>
      <Editor
        key={example}
        value={value}
        annotations={annotations}
        onChange={(newValue) => {
          // fetch("/api/lint")
          //   .then((response) => response.json())
          //   .then((data) => console.log(data));
        }}
      />
      <Select
        options={Object.entries(fixtures).map(([value, fixture]) => ({
          value,
          label: fixture.label,
        }))}
        onChange={(value) => {
          console.log(value);
          setExample(value);
          setValue(fixtures[value].source);
          setAnnotations(fixtures[value].output);
        }}
      ></Select>
    </div>
  );
};

export default CurlylintDemo;
