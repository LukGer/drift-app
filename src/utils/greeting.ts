export const getGreeting = (time: Date, name: string) => {
  const hour = time.getHours();

  const isMorning = hour >= 5 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 17;
  const isEvening = hour >= 17 && hour < 22;
  const isNight = hour >= 22 || hour < 5;

  const morningGreetings = [
    `Morning, ${name}!`,
    `Track early. Save big.`,
    `Coffee & cash check.`,
    `New day, new budget.`,
    `Hey ${name}, spend smart.`,
  ];

  const afternoonGreetings = [
    `Hey ${name}, all good?`,
    `Log that lunch 🍔`,
    `Still on budget?`,
    `Keep it tight.`,
    `Midday money check.`,
  ];

  const eveningGreetings = [
    `Evening, ${name}.`,
    `Daily review time.`,
    `Did you overspend?`,
    `Check your expenses.`,
    `Wallet still okay?`,
  ];

  const nightGreetings = [
    `Late night, ${name}.`,
    `Budget dreams ahead.`,
    `Log & sleep 😴`,
    `Midnight check-in.`,
    `Spend. Track. Sleep.`,
  ];

  const greetings = isMorning
    ? morningGreetings
    : isAfternoon
    ? afternoonGreetings
    : isEvening
    ? eveningGreetings
    : nightGreetings;

  return greetings[Math.floor(Math.random() * greetings.length)];
};
