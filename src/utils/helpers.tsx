export const setCookie = (
  name: string,
  value: string | number | boolean,
  days: number
) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;

  document.cookie = cookieValue;
};

export const getCookie = (name: string) => {
  const cookieName = `${encodeURIComponent(name)}=`;
  const cookieList = document.cookie.split(";");

  for (let i = 0; i < cookieList.length; i++) {
    let cookie = cookieList[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(
        cookie.substring(cookieName.length, cookie.length)
      );
    }
  }

  return null;
};
