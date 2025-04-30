import { useEffect, useState } from "react";

function ReleaseTimer() {
    const nextReleaseString = "01:53:00 07 May 2025"; // Human-readable input
    const [displayTime, setDisplayTime] = useState("");

    useEffect(() => {
        if (!nextReleaseString) return;

        const parseToTimestamp = (timeString) => {
            const [timePart, day, monthName, year] = timeString.split(" ");
            const [hours, minutes, seconds] = timePart.split(":").map(Number);

            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const monthIndex = monthNames.indexOf(monthName);

            if (monthIndex === -1) {
                throw new Error("Invalid month name");
            }

            const dateObj = new Date(
                parseInt(year, 10),
                monthIndex,
                parseInt(day, 10),
                hours,
                minutes,
                seconds
            );

            return dateObj.getTime(); 
        };

        let releaseTimestamp;
        try {
            releaseTimestamp = parseToTimestamp(nextReleaseString);
        } catch (error) {
            console.error(error);
            setDisplayTime("Invalid release date format");
            return;
        }

        const updateTimer = () => {
            const currentTime = Date.now();
            const diff = releaseTimestamp - currentTime;

            if (diff <= 0) {
                setDisplayTime("Release time passed");
                window.location.href = '/under-maintenance'
                return;
            }

            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days >= 30) {
                const releaseDate = new Date(releaseTimestamp);
                const options = { year: "numeric", month: "long", day: "numeric" };
                const formattedDate = releaseDate.toLocaleDateString("en-US", options);
                setDisplayTime(`Scheduled on ${formattedDate}`);
            } else if (days >= 1) {
                setDisplayTime(`${days} day(s) left`);
            } else if (hours >= 1) {
                setDisplayTime(`${hours} hour(s) left`);
            } else if (minutes >= 1) {
                setDisplayTime(`${minutes} minute(s) left`);
            } else {
                setDisplayTime(`${seconds} second(s) left`);
            }
        };

        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [nextReleaseString]);

    return (
        <div className="release-timer-container">
            <p><b>Time left for next release:</b></p>
            <p>{displayTime}</p>
        </div>
    );
}

export default ReleaseTimer;
