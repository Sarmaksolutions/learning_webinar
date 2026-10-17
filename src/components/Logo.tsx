interface LogoProps {
  className?: string;
  alt?: string;
}

export default function Logo({ className = 'h-12 w-auto', alt = 'SARMAK' }: LogoProps) {
  return (
    <img
      src="/sarmak-learning-logo.jpg"
      alt={`${alt} logo`}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
