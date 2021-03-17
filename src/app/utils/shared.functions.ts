import { LocalStorageKey } from './app.constants';
import { AuthorizeUserResponse } from '../store/models/imagen.model';

//? LocalStorage methods
export const getLocalStorageValues = (key: LocalStorageKey = LocalStorageKey.IMAGEN): any => {
  return JSON.parse(localStorage.getItem(key));
}

export const getUsername = (): string => {
  const lsStorage: any = getLocalStorageValues();
  if (lsStorage) {
    const parsedJson = JSON.parse(localStorage.getItem(LocalStorageKey.IMAGEN));
    const { Username } = parsedJson.Imagen;
    return Username;
  }
}

export const getToken = (): string => {
  const lsStorage: any = getLocalStorageValues();
  if (lsStorage) {
    const parsedJson = JSON.parse(localStorage.getItem(LocalStorageKey.IMAGEN));
    const { Token } = parsedJson.Imagen;
    return Token;
  }
}

export const setToLocalStorage = (key: string, value: any): void => {
  const initialValue: any = {
    Imagen: {}
  };
  const existingLocalStorageValue: any = getLocalStorageValues() || initialValue;
  existingLocalStorageValue.Imagen[key] = value;

  localStorage.setItem(
    LocalStorageKey.IMAGEN,
    JSON.stringify(existingLocalStorageValue)
  );
}

export const setUserDataToLocalStorage = (data: AuthorizeUserResponse): void => {
  const initialValue: any = {
    Imagen: {}
  };
  const existingLocalStorageValue: any = getLocalStorageValues() || initialValue;
  existingLocalStorageValue.Imagen = data;
  localStorage.setItem(
    LocalStorageKey.IMAGEN,
    JSON.stringify(existingLocalStorageValue)
  );
}

export const clearLocalStorage = () => localStorage.removeItem(LocalStorageKey.IMAGEN);

export const checkTokenExpiration = () => {
  const rawToken = getToken();
  let returnValue: boolean = false;
  if (rawToken) {
    //const parsedTokenExpiryDate = parseInt(JSON.parse(rawToken)["expiry_date"]);
    const tokenArray: any = rawToken.split(",");
    const expiryDate = tokenArray[tokenArray.length - 1];
    const expiryDateSlice = expiryDate.split(":");
    const parsedTokenExpiryDate = parseInt((expiryDateSlice[expiryDateSlice.length - 1] as string).replace("/\}/g", ""));
    if (Date.now() <= parsedTokenExpiryDate) {
      returnValue = true;
    }
  }
  return returnValue;
}

export const removeEscapeCharacters = (data: string) => data.replace(/\\/g, "").replace(/^\"/, "").replace(/\"$/, "");
