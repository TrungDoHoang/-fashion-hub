export const getCookie = (name: string) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (cookieValue) {
    return cookieValue.split('=')[1];
  }

  return null;
};

export const setCookie = (name: string, value: any, days: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};
