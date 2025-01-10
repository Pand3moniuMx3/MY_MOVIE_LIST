import { useState } from "react";

export default function TextExpander({
  children,
  expanded = false,
  maxLength = 16,
  textSize = 14,
  textColor = "black",
  btnColor = "blue",
  className,
}) {
  const textStyles = {
    fontSize: `${textSize}px`,
    color: textColor,
  };
  const btnStyles = {
    fontSize: `${textSize}px`,
    color: btnColor,
    cursor: "pointer",
    marginLeft: "6px",
  };

  // opening and closing
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, maxLength).join(" ") + "...";

  return (
    <p style={textStyles} className={className}>
      {displayText}
      <a style={btnStyles} onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show less" : "Show more"}
      </a>
    </p>
  );
}
