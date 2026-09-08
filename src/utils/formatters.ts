export function formatTimeAgo(timestamp?: number): string {
  if (!timestamp) return 'Baru saja';
  const diff = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (diff < 60) return `${diff}d yang lalu`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins}m yang lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}j yang lalu`;
  const days = Math.floor(hours / 24);
  return `${days}h yang lalu`;
}

export function formatShortAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
