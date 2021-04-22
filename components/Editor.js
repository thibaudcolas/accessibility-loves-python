import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/theme-github";

export default class Editor extends Component {
  render() {
    let name = this.props.readOnly ? "readonly" : "editor";
    return (
      <AceEditor
        mode="html"
        theme="github"
        // className="w-full"
        // width="300"
        // height="400"
        name={name}
        // readOnly={this.props.readOnly}
        value={this.props.value}
        // onChange={this.props.onChange}
        // editorProps={{ $blockScrolling: true }}
        annotations={[
          {
            row: 3, // must be 0 based
            column: 4, // must be 0 based
            text: "error.message", // text to show in tooltip
            type: "error",
          },
        ]}
      />
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

Editor.defaultProps = {
  value: "",
  readOnly: false,
  onChange: null,
};
