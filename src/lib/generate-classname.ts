const generateClassName = (unconditional: string, conditional: Record<string, boolean>): string => {
  const classNames = [unconditional];
  Object.keys(conditional).forEach(key => {
    if (conditional[key]) {
      classNames.push(key);
    }
  });
  return classNames.join(" ");
};

export default generateClassName;
