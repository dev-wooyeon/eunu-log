'use client';

import { motion } from 'framer-motion';

type LogoVariant = 'signature' | 'symbol';

interface LogoProps {
  variant?: LogoVariant;
  motionEnabled?: boolean;
  className?: string;
}

function SymbolShape() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="w-10 h-10">
      <rect x="2" y="2" width="44" height="44" rx="14" fill="currentColor" />
      <circle cx="24" cy="24" r="12" fill="var(--color-bg-primary)" />
      <circle cx="24" cy="24" r="6" fill="currentColor" />
      <path
        d="M24 12.5a11.5 11.5 0 0 1 8.13 3.37"
        fill="none"
        stroke="var(--color-bg-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SymbolShapeMotion() {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      aria-hidden
      className="w-10 h-10"
      initial="hidden"
      animate="visible"
    >
      <motion.rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="14"
        fill="currentColor"
        variants={{
          hidden: { scale: 0.88, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.38 } },
        }}
      />
      <motion.circle
        cx="24"
        cy="24"
        r="12"
        fill="var(--color-bg-primary)"
        variants={{
          hidden: { scale: 0.4, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.34, delay: 0.12 } },
        }}
      />
      <motion.circle
        cx="24"
        cy="24"
        r="6"
        fill="currentColor"
        variants={{
          hidden: { scale: 0.2, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.18 } },
        }}
      />
      <motion.path
        d="M24 12.5a11.5 11.5 0 0 1 8.13 3.37"
        fill="none"
        stroke="var(--color-bg-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.22 }}
      />
    </motion.svg>
  );
}

function SignatureWordmark() {
  return (
    <span
      className="text-[1.06rem] font-semibold tracking-[-0.02em] leading-none"
      style={{ fontFamily: '\"IBM Plex Sans KR\", var(--font-sans)' }}
    >
      eunu.log
    </span>
  );
}

function SignatureWordmarkMotion() {
  return (
    <motion.span
      className="text-[1.06rem] font-semibold tracking-[-0.02em] leading-none"
      style={{ fontFamily: '\"IBM Plex Sans KR\", var(--font-sans)' }}
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.34, delay: 0.18 }}
    >
      eunu.log
    </motion.span>
  );
}

function LogoSymbol({ motionEnabled }: { motionEnabled: boolean }) {
  return (
    <span className="inline-flex text-[var(--color-grey-900)] group-hover:text-[var(--color-toss-blue)] transition-colors duration-300">
      {motionEnabled ? <SymbolShapeMotion /> : <SymbolShape />}
    </span>
  );
}

function LogoSignature({ motionEnabled }: { motionEnabled: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[var(--color-grey-900)] group-hover:text-[var(--color-toss-blue)] transition-colors duration-300">
      {motionEnabled ? <SymbolShapeMotion /> : <SymbolShape />}
      {motionEnabled ? <SignatureWordmarkMotion /> : <SignatureWordmark />}
    </span>
  );
}

export default function Logo({
  variant = 'signature',
  motionEnabled = false,
  className,
}: LogoProps) {
  return (
    <span className={className}>
      {variant === 'symbol' ? (
        <LogoSymbol motionEnabled={motionEnabled} />
      ) : (
        <LogoSignature motionEnabled={motionEnabled} />
      )}
    </span>
  );
}

export function SignatureLogo(props: Omit<LogoProps, 'variant'>) {
  return <Logo variant="signature" {...props} />;
}

export function SymbolLogo(props: Omit<LogoProps, 'variant'>) {
  return <Logo variant="symbol" {...props} />;
}

export function SignatureLogoMotion(props: Omit<LogoProps, 'variant' | 'motionEnabled'>) {
  return <Logo variant="signature" motionEnabled {...props} />;
}

export function SymbolLogoMotion(props: Omit<LogoProps, 'variant' | 'motionEnabled'>) {
  return <Logo variant="symbol" motionEnabled {...props} />;
}
