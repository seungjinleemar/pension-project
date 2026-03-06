import React from 'react';

const IconBase = ({ children, className = "" }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {children}
  </svg>
);

export const DoubleBedIcon = ({ className }) => (
<IconBase className={className}>
    <path d="M8 12C8 10.8954 8.89543 10 10 10H38C39.1046 10 40 10.8954 40 12V20H8V12Z" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="8" y="20" width="32" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="11" y="14" width="11" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="26" y="14" width="11" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M11 32V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M37 32V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 26H40" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
  </IconBase>
);

export const TVIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="8" y="12" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M18 38H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 32V38" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M16 8L20 12L24 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </IconBase>
);

export const RefrigeratorIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="14" y="6" width="20" height="36" rx="4" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M14 18H34" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="18" cy="12" r="1" fill="currentColor"/>
    <path d="M18 24V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </IconBase>
);

export const AirconIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="8" y="16" width="32" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M12 28V34M18 28V34M24 28V34M30 28V34" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </IconBase>
);

export const MicrowaveIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="12" y="16" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="35" cy="18" r="1" fill="currentColor"/>
    <path d="M34 22H36M34 26H36" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </IconBase>
);

export const ShowerIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 20H24V36C24 38.2091 22.2091 40 20 40H16C13.7909 40 12 38.2091 12 36V20Z" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M18 12V20M18 12C18 10.8954 18.8954 10 20 10H22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="28" y="20" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="28" y="27" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
  </IconBase>
);

export const BathtubIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M8 18H40C40 25.732 33.732 32 26 32H14C10.6863 32 8 29.3137 8 26V18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 32V36M36 32V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="15" cy="12" r="1" stroke="currentColor" strokeWidth="1"/>
    <circle cx="19" cy="8" r="1.5" stroke="currentColor" strokeWidth="1"/>
  </IconBase>
);

export const BBQIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M10 18C10 26.8366 16.268 34 24 34C31.732 34 38 26.8366 38 18H10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M16 34L13 42M32 34L35 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M21 6C21 6 22 4 24 4C26 4 27 6 27 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M18 9C18 9 19 7 21 7C23 7 24 9 24 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </IconBase>
);

export const CoffeeIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 20H34C38 20 40 22 40 25C40 28 38 30 34 30H12C12 30 12 26 12 20Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M18 8C18 8 19 4 21 4C23 4 24 8 24 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </IconBase>
);

export const SpaIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M24 36C24 36 14 31 14 18C14 13 19 11 24 11C29 11 34 13 34 18C34 31 24 36 24 36Z" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M24 36C24 36 34 33 39 23C41 18 39 13 34 13C29 13 24 18 24 18" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M24 36C24 36 14 33 9 23C7 18 9 13 14 13C19 13 24 18 24 18" stroke="currentColor" strokeWidth="1.2"/>
  </IconBase>
);