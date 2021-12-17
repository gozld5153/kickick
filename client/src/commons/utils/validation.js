export const validation = (part, value) => {
  let num = value.search(/[0-9]/g);
  let eng = value.search(/[a-z]/gi);
  let spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  let emailValid =
    value.search(/\s/) === -1 &&
    value.includes("@") &&
    value.split("@")[0] &&
    value.split("@")[1].includes(".") &&
    value.split("@")[1].split(".")[0] &&
    value.split("@")[1].split(".")[1]
      ? "pass"
      : value.search(/\s/) !== -1
      ? "blank check"
      : !value.includes("@")
      ? "check @"
      : 3;
  
  let passwordVaild =
    value.length > 7 &&
    value.length <= 20 &&
    value.search(/\s/) === -1 &&
    num !== -1 &&
    eng !== -1 &&
    spe !== -1
      ? "pass"
      : value.length <= 7 || value.length > 20
      ? "length check"
      : value.search(/\s/) !== -1
      ? "blank check"
      : num === -1 || eng === -1 || spe === -1 ? 4 : 5;
  
  let vaild =
    value.search(/\s/) === -1 && value.length >= 4 && value.length <= 15
      ? "pass"
      : value.search(/\s/) !== -1
      ? "blank check"
      : value.length < 4 || value.length > 15
      ? "length check"
      : "fail";
  
  if (part === "email") {
    switch (emailValid) {
      case "pass":
        return { message: "pass", isValid: true };
      case "blank check":
        return { message: "공백이 존재해서는 안됩니다", isValid: false };
      case "check @":
        return { message: "@가 포함되어있지 않습니다", isValid: false };
      default:
        return { message: "email형식이 올바르지 않습니다", isValid: false };
    }
  }
  if (part === "password") {
    switch (passwordVaild) {
      case "pass":
        return { message: "pass", isValid: true };
      case "length check":
        return {
          message: "비밀번호의 길이는 8자리이상 20자리이하 입니다",
          isValid: false,
        };
      case "blank check":
        return { message: "공백이 존재해서는 안됩니다", isValid: false };
      case 4:
        return {
          message: "특수문자,영문,숫자가 모두 포함되어야 합니다",
          isValid: false,
        };
      default:
        return { message: "양식이 올바르지 않습니다", isValid: false };
    }
  }
  if (part === "username") {
    switch (vaild) {
      case "pass":
        return { message: "pass", isValid: true };
      case "length check":
        return {
          message: "ID의 길이는 4자리이상 15자리 이하입니다",
          isValid: false,
        };
      case "blank check":
        return { message: "공백이 존재해서는 안됩니다", isValid: false };
      default:
        return { message: "양식이 올바르지 않습니다", isValid: false };
    }
  }
};