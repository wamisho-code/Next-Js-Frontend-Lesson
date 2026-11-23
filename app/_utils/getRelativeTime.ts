export const getRelativeTime = (date: string) => {
    const now = new Date();
    const past = new Date(date);

    const seconds = Math.floor((past.getTime() - now.getTime()) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 }
    ];

    const formatter = new Intl.RelativeTimeFormat("en", {
        numeric: "auto"
    });

    for (const interval of intervals) {
        const value = Math.trunc(seconds / interval.seconds);

        if (Math.abs(value) >= 1) {
            return formatter.format(value, interval.label as Intl.RelativeTimeFormatUnit);
        }
    }

    return "just now";
};