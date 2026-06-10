import Image from "next/image";

interface WhatsAppLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export function WhatsAppLogo({ size = 32, className = "", animate = false }: WhatsAppLogoProps) {
  return (
    <Image
      src="/whatsapp-logo.png"
      alt="WhatsApp"
      width={size}
      height={size}
      className={`${animate ? "animate-breathe" : ""} ${className}`}
    />
  );
}
