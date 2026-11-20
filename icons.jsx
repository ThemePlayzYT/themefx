/* Small inline SVG icon set. Icons inherit color from the parent via currentColor. */

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function MenuIcon(props) {
  return <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h10" /></svg>;
}

export function SearchIcon(props) {
  return <svg {...base} {...props}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>;
}

export function UserIcon(props) {
  return <svg {...base} {...props}><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c1.6-3.4 4.2-5 7.5-5s5.9 1.6 7.5 5" /></svg>;
}

export function GridIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function DownloadIcon(props) {
  return <svg {...base} strokeWidth={2} {...props}><path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" /></svg>;
}

export function PlayIcon(props) {
  return <svg {...base} fill="currentColor" stroke="none" {...props}><path d="M8 5.5v13l10-6.5z" /></svg>;
}

export function PauseIcon(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <rect x="6.5" y="5.5" width="4" height="13" rx="1" />
      <rect x="13.5" y="5.5" width="4" height="13" rx="1" />
    </svg>
  );
}

export function VolumeIcon(props) {
  return <svg {...base} {...props}><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" /><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /></svg>;
}

export function MuteIcon(props) {
  return <svg {...base} {...props}><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" /><path d="M16 9.5l5 5M21 9.5l-5 5" /></svg>;
}
