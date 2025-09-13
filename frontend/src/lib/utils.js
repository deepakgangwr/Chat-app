export function formatMessageTime(date) {
  const messageDate = new Date(date);
  const now = new Date();
  const isToday = messageDate.toDateString() === now.toDateString();
  const isYesterday = messageDate.toDateString() === new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString();
  
  if (isToday) {
    return messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else if (isYesterday) {
    return `Yesterday ${messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  } else {
    return messageDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }) + " " + messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
}
