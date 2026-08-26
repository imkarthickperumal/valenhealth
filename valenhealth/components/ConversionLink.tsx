"use client";

import { AnchorHTMLAttributes } from "react";
import { trackConversion } from "../lib/gtag";

export default function ConversionLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { onClick, ...rest } = props;
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackConversion();
        onClick?.(e);
      }}
    />
  );
}
