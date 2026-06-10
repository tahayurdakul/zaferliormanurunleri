import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 56, className = "" }: LogoProps) {
  return (
    <Image
      src="/zaferli.jpg"
      alt="Zaferli Orman Ürünleri"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      priority
    />
  );
}
