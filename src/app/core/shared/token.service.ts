import { Injectable } from "@angular/core";

// const KEY = "authToken";

@Injectable({ providedIn: "root" })
export class TokenService {
  constructor() {}

  hasToken(key) {
    return !!this.getToken(key);
  }

  setToken(key, token) {
    window.localStorage.setItem(key, token);
  }

  getToken(key) {
    return window.localStorage.getItem(key);
  }

  removeToken(key) {
    window.localStorage.removeItem(key);
  }
}
