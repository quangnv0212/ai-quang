import { notifyError } from "src/infrastructure/common/components/toast/toast-message";
import Constants from "src/core/application/common/constants";
import moment from "moment";
import jwtDecode from "jwt-decode";
import LocalStorageService from "src/infrastructure/services/localStorage.service";

export type RulesReg = {
  pattern: any;
  message?: string;
};

// open - close left menu
export const setOpenMenuSessionStorage = (open: boolean) => {
  return sessionStorage.setItem(
    Constants.SessionStorage.LeftMenu,
    open ? "OPEN" : "CLOSE"
  );
};

export const getOpenMenuSessionStorage = () => {
  return sessionStorage?.getItem(Constants.SessionStorage.LeftMenu)
    ? sessionStorage?.getItem(Constants.SessionStorage.LeftMenu) === "OPEN"
    : true;
};

export function validateReg(value: any, rules: Array<RulesReg>) {
  for (let i = 0; i < rules.length; ++i) {
    if (rules[i].pattern !== undefined && !rules[i].pattern.test(value)) {
      return {
        error: true,
        message: rules[i].message || "",
      };
    }
  }
  return {
    error: false,
    message: "",
  };
}

//common function validate
export const validateFields = (props: {
  isImplicitChange: boolean;
  label: string;
  key: string;
  value: any;
  isRequired?: boolean;
  setError: any;
  error: any;
  rules?: Array<RulesReg>;
}) => {
  let message = {
    error: false,
    message: "",
  };

  if (props.rules && props.rules.length) {
    message = validateReg(props.value, props.rules);
  }

  if (props.isRequired) {
    if (props.value == null || !props.value?.length) {
      message = {
        error: true,
        message: _t("Please enter {0}", props.label), //`Please enter ${props.label}`
      };
    }
  }

  if (props.isImplicitChange) {
    props.error[props.key] = {
      isError: message.error,
      message: message.message,
    };
    return;
  }

  props.setError({
    ...props.error,
    [props.key]: {
      isError: message.error,
      message: message.message,
    },
  });
};

export function validateUploadFile(file: any, msg: any, msg2: any) {
  if (file.size > 4 * 1024 * 1024) {
    notifyError(null, msg2);
    return false;
  }
  if (
    !(
      file.name &&
      Constants.FileType.List.some(
        (it) => it === file.name.slice(file.name.lastIndexOf(".") + 1)
      )
    )
  ) {
    notifyError(null, msg);
    return false;
  }
  return true;
}

///prefix, suffix no space when submit data
export const refactorFormDataCommon = (data: any) => {
  let result: any = {};
  if (Object.keys(data)?.length) {
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") {
        result = {
          ...result,
          [key]: data[key]?.trim() || "",
        };
      } else {
        result = {
          ...result,
          [key]: data[key],
        };
      }
    });
  }
  return result;
};

export function getUrlParameter(name: string) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null ? "" : decodeURIComponent(results[1]);
}

export const convertDate = (date: any) => {
  if (date) {
    let dateFormat = new Date(date);
    return moment(dateFormat).format("DD/MM/YYYY hh:mm:ss");
  }
  return null;
};
export const convertDateOnly = (date: any) => {
  if (date) {
    let dateFormat = new Date(date);
    return moment(dateFormat).format("DD/MM/YYYY");
  }
  return null;
};

export const convertDateToISO = (date: any) => {
  if (date) {
    let dateFormat = new Date(date);
    return moment(dateFormat).toISOString();
  }
  return null;
};

export const convertMasterData = (data: any, type: any) => {
  let convert = [];
  if (data && data.length) {
    convert = data?.filter((it: any) => it.type === type);
  }
  return convert;
};

export const convertDataTable = (lst: any) => {
  let arr: any = [];

  if (lst && lst.length) {
    lst.map((it: any, idx: any) => {
      arr.push({
        ...it,
        idTable: Date.now() + idx,
      });
    });
  }
  return arr;
};

export const _t = (key: any, ...params: any[]) => {
  let localStorageService = new LocalStorageService();
  let languageSelected: any = localStorageService.readStorage(
    Constants.LANGUAGE_SELECTED_STORAGE
  );

  let languagesData: any = localStorageService.readStorage(
    Constants.LIST_DATA_TRANSLATE_STORAGE
  );
  let dataByKey: any =
    languageSelected && languagesData && languagesData[key]
      ? languagesData[key][languageSelected?.value]
      : null;

  // Find the key
  const rawTranslation = dataByKey;
  // Set the translation as the key as default, in case of not found
  let translation = key;
  // Set the translation as the found one
  if (rawTranslation) {
    translation = rawTranslation;
  }
  // parse the prams
  if (params != null && params.length > 0) {
    for (let i = 0; i < params.length; i++) {
      translation = translation.replace(`{${i}}`, params[i]);
    }
  }
  return translation;
};

export const getListRole = () => {
  const localStorageService = new LocalStorageService();

  let info = localStorageService.readStorage(Constants.API_TOKEN_STORAGE);
  if (info?.token) {
    info = jwtDecode(info?.token);
  }

  return info?.role != null ? [info.role] : [];
};

export const getUserLogin = () => {
  const localStorageService = new LocalStorageService();

  let info = localStorageService.readStorage(Constants.API_TOKEN_STORAGE);

  return info;
};

export const acceptFile = (file: string) => {
  let accpt = "";
  let typeFile = "";
  if (file) {
    typeFile = file.slice(file.lastIndexOf(".") + 1);
  }
  // png, jpeg, jpg, pdf, xlsx, xls, doc, docx, ppt, pptx, zip, rar and max file size is 5Mb per file.
  switch (typeFile.toLocaleLowerCase()) {
    case "png": {
      accpt = "image/png";
      break;
    }
    case "jpeg": {
      accpt = "image/jpg";
      break;
    }
    case "jpg": {
      accpt = "image/jpg";
      break;
    }

    default:
      accpt = "application/octet-stream";
  }
  return accpt;
};

export const stringNoSign = (str: string) => {
  if (str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
  }

  return str;
};

export const generateUUID = () => {
  let d = new Date().getTime();
  let d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
};

export const goBackPage = (navigate: any, goback: any) => {
  if (window.history.state && window.history.state.idx > 0) {
    navigate(-1);
  } else {
    goback();
  }
};

export const convertCharacter = (
  str: string,
  toChar = "*",
  lgNoConvert = 4
) => {
  let cv: string = str.replace(
    str.substr(2, str.length - lgNoConvert),
    str.substr(0, str.length - lgNoConvert).replace(/\S/g, toChar)
  );
  let result: string = "";
  for (let i = 0; i < cv.length; i++) {
    result += cv[i];
    if (i === 2 || cv.length - i == 4) {
      result += " ";
    }
  }
  return result;
};
