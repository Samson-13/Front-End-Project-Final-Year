import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// My Hotspot
// const api = axios.create({ baseURL: 'http://192.168.235.240:8000' });
// const api = axios.create({ baseURL: 'http://192.168.216.240:8000' });
// const api = axios.create({ baseURL: 'http://192.168.0.240:8000' });

// Sep Wifi
// const api = axios.create({ baseURL: 'http://192.168.29.125:8000' });

// Samson Wifi 192.168.0.107
const api = axios.create({ baseURL: 'http://192.168.0.107:9000' });
// const api = axios.create({ baseURL: 'http://192.168.0.107:8000' });

// Zuala Wifi 192.168.0.179
// const api = axios.create({ baseURL: 'http://192.168.0.179:8000' });
// const api = axios.create({ baseURL: 'http:// 192.168.0.1:8000' });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
