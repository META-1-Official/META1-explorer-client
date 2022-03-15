export const Chip = ({label, color = '#ffffff', fillColor}) => {
  return (
    <span className="chip" style={{backgroundColor: fillColor, color: color}}>
      {label}
    </span>
  );
};
