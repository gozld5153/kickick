import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadSingleImage, destroyImage } from "../../../apis/upload";
import ImageResize from "@looop/quill-image-resize-module-react";

Quill.register("modules/ImageResize", ImageResize);

export default function EditQuill({
  image = true,
  content,
  setContent,
  handleContent,
  themeCode,
}) {
  const quill = useRef(null);
  const tempImage = useRef([]);

  const handleImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];

      const formData = new FormData();
      formData.append("img", file);

      try {
        const result = await uploadSingleImage(formData, "post");

        const { location, version_id } = result.data.data;
        const editor = quill.current.getEditor();
        const range = editor.getSelection();

        editor.insertEmbed(range, "image", location);
        const url = new URL(location);

        tempImage.current.push({
          Key: url.pathname.slice(1),
          VersionId: version_id,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
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
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, [image]);

  const formats = [
    "header",
    "bold",
    "italic",
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

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser, false);

    return () => {
      window.removeEventListener("beforeunload", alertUser, false);
    };
  }, []);

  const alertUser = (e) => {
    console.log("성공");
    e.preventDefault();
    e.stopPropagation();
    window.confirm("변경사항이 저장되지 않았습니다. 가시게요?");
    if (tempImage.current.length !== 0) {
      destroyImage(tempImage.current)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <ReactQuill
        ref={quill}
        value={content}
        onChange={setContent}
        onBlur={handleContent}
        theme="snow"
        style={{
          height: image === false ? "32rem" : "40rem",
          display: "flex",
          flexDirection: "column",
          color: themeCode === "light" ? "black" : "white",
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
