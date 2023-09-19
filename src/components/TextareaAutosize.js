import { useEffect, useRef } from "react";

export function TextArea(props) {
  const textareaRef = useRef();


  useEffect(() => {
    if (textareaRef.current){
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [props]);



  return (
    <textarea
      ref={textareaRef}
      {...props}
    />
  );
}
