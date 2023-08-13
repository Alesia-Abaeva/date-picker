import * as React from "react";

export const useLatest = <T>(value: T) => {
  const valueRef = React.useRef(value);

  React.useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
};
