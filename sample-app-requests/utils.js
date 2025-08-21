export function getRandomLogLevel() {
  const levels = ['info', 'warn', 'error', 'debug'];
  return levels[Math.floor(Math.random() * levels.length)];
}

export function getRandomMessage(level) {
  const messages = {
    info: ['User logged in', 'Payment successful', 'Page loaded'],
    warn: ['API took too long', 'Cache missed'],
    error: ['DB connection failed', 'Unhandled exception'],
    debug: ['Function x returned y', 'Cache key found']
  };
  const choices = messages[level] || ['Unknown event'];
  return choices[Math.floor(Math.random() * choices.length)];
}
