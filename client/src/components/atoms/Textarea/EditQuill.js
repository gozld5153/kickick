import React, { useMemo } from "react";
import { useRef } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AWS from "aws-sdk";

export default function EditQuill({
  image = true,
  content,
  setContent,
  handleQuill,
}) {
  const quill = useRef(null);
  //quill.current.state.value

  const handleImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      AWS.config.update({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.REACT_APP_AWS_IDENTITYPOOLID,
        }),
      });
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.REACT_APP_S3_IMG_BUCKET,
          Key: file.name,
          Body: file,
        },
      });
      const promise = upload.promise();
      promise.then(
        function (data) {
          const imgURL = data.Location;
          const editor = quill.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range, "image", imgURL);
        },
        function (err) {
          return console.log(err.response.message);
        }
      );
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          ["underline", "strike", "blockquote"],
          [{ color: [] }, { background: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          image ? ["link", "image", "video", "code-block", "clean"] : ["clean"],
        ],
        handlers: { image: handleImage },
      },
    };
  }, []);

  const formats = [
    "header",
    "font",
    "size",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];
  return (
    <Container>
      <ReactQuill
        ref={quill}
        value={content}
        onChange={setContent}
        onBlur={handleQuill}
        theme="snow"
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
        }}
        modules={modules}
        formats={formats}
      />
    </Container>
  );
}
const Container = styled.div`
  z-index: 1;
`;
