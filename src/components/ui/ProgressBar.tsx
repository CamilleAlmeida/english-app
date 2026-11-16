interface Props {
  value: number;
  color?: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
  size?: 'sm' | 'md';
}

const COLOR_MAP: Record<string, string> = {
  green: 'bg-success',
  yellow: 'bg-warning',
  red: 'bg-danger',
  blue: 'bg-primary',
  purple: 'bg-info',
};

const SIZE_MAP: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

export default function ProgressBar({ value, color = 'blue', size = 'md' }: Props) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-surface-2 ${SIZE_MAP[size]}`}>
      <div
        className={`${SIZE_MAP[size]} rounded-full ${COLOR_MAP[color]} transition-all`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
