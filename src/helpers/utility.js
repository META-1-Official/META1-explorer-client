export const localizeNumber = (number, locale = 'en') => {
  return Number(number).toLocaleString(locale);
};

export function httpResponseDecorator(fn) {
  return async function () {
    try {
      const {data} = await fn.apply(this, arguments);
      return [data, null];
    } catch (error) {
      const {response} = error;
      return [
        null,
        {
          status: response?.status,
          message: response?.data?.error || response?.data?.message,
        },
      ];
    }
  };
}
