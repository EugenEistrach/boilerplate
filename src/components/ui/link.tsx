"use client"

import { useCurrentLocale } from "@/locales/client"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import {
  type ComponentPropsWithoutRef,
  PropsWithChildren,
  forwardRef
} from "react"

type LinkProps = NextLinkProps & ComponentPropsWithoutRef<"a">

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => {
    const currentLocale = useCurrentLocale()
    return (
      <NextLink {...props} ref={ref} href={`/${currentLocale}${props.href}`}>
        {children}
      </NextLink>
    )
  }
)

Link.displayName = "Link"

export { Link }
