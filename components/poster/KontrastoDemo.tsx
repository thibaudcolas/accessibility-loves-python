import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

import Select from "../../components/Select";
import CheckboxField from "../../components/CheckboxField";
import fixtures from "../../utils/curlylint/fixtures";
import { delayAndIdle } from "../../utils/delay";

const Dropzone = dynamic(import("../../components/Dropzone"), { ssr: false });

const KontrastoDemo = () => {
  return (
    <div className="grid">
      <Dropzone />
    </div>
  );
};

export default KontrastoDemo;
