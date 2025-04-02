export const getGreeting = (time: Date, name: string) => {
  const hour = time.getHours();
  const day = time.getDay();

  const isMorning = hour >= 5 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 17;
  const isEvening = hour >= 17 && hour < 22;

  const dailyGreetings = {
    morning: [
      "Rise and shine!",
      `Monday start, ${name}!`,
      "Tuesday vibes!",
      `Midweek ${name}!`,
      "Thursday focus!",
      `TGIF ${name}!`,
      "Weekend mode!",
    ],
    afternoon: [
      `Sunday lunch, ${name}?`,
      "Keep going!",
      `Steady ${name}!`,
      "Halfway there!",
      `Strong ${name}!`,
      "Weekend soon!",
      "Saturday vibes!",
    ],
    evening: [
      "Sunday wind-down.",
      `Day done ${name}!`,
      "Nice work!",
      `Wrapping up ${name}?`,
      "Almost Friday!",
      `Weekend time ${name}!`,
      "Time to chill!",
    ],
    night: [
      `Night ${name}!`,
      "Sweet dreams!",
      `Rest up ${name}!`,
      "Sleep tight!",
      `Goodnight ${name}!`,
      "Weekend dreams!",
      "Night night!",
    ],
  };

  const timeOfDay = isMorning
    ? "morning"
    : isAfternoon
    ? "afternoon"
    : isEvening
    ? "evening"
    : "night";

  return dailyGreetings[timeOfDay][day];
};
