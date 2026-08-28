"use client";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";
import { trackConversion } from "../lib/gtag";

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ConversionNextLink(props: Props) {
  const { onClick, ...rest } = props;
  return (
    <Link
      {...rest}
      onClick={(e) => {
        trackConversion();
        onClick?.(e);
      }}
    />
  );
}
