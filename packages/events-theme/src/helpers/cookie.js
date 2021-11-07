export const handleSetCookie = ({ name, value, exDays }) => {
  // setting defaults
  let expires = "",
    cookieName = "cookie",
    cookieValue = "🍪 value not set!",
    cookieExDays = 1;
  if (name) cookieName = name;
  if (value) cookieValue = value;
  if (exDays) cookieExDays = exDays;

  if (cookieExDays) {
    const date = new Date();
    date.setTime(date.getTime() + cookieExDays * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  const cookie = cookieName + "=" + cookieValue + ";" + expires + "; path=/";
  document.cookie = cookie;
  console.log("🍪  set to: ", cookie); // debug
};

export const handleGetCookie = ({ name }) => {
  // setting defaults
  let cookieName = "";
  if (name) cookieName = name;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  console.log(parts.length);
  if (parts.length >= 2) {
    console.log("🍪 value: ", parts.pop().split(";").shift());
    return parts.pop().split(";").shift();
  } else {
    console.log("🍪 not found");
    return null;
  }
};
