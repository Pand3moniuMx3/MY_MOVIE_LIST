export default function ReturnBtn({ onClick }) {
  const spanStyles = {
    width: "25px",
    height: "25px",
    position: "absolute",
    top: "var(--global-padding)",
    left: "var(--global-padding)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: "var(--clr-black)",
    cursor: "pointer",
  };

  return (
    <span className="return-btn" style={spanStyles} onClick={onClick}>
      <img src="/icons/return-icon.svg" alt="return" />
    </span>
  );
}
