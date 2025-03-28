export function formattedTimeFromSeconds(seconds: number, shortFormat = false): string {
    if (seconds <= 0) return "just now";
    const now = new Date();
    const diff = (now.getTime() - seconds) / 1000;
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
  
    if (shortFormat) {
      if (days > 0) return `${days}d ${hours % 24}h`;
      if (hours > 0) return `${hours}h ${minutes % 60}m`;
      return `${minutes}m`;
    }
  
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ${hours % 24} hour${hours % 24 !== 1 ? "s" : ""}`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes % 60} minute${minutes % 60 !== 1 ? "s" : ""}`;
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
  