import Utils from "../Utils";
import moment from "moment";

export default class Mask {
  static maskPhone(event) {
    event.target.value = Mask.getValueMaskPhone(event.target.value);
  }

  static maskValuePhone(value) {
    return Mask.getValueMaskPhone(value);
  }

  static getValueMaskPhone(value) {
    if (Utils.isValueValid(value)) {
      let x = String(value)
      .replace(/\D/g, "")
      .match(value.length > 14 ? /(\d{0,2})(\d{0,5})(\d{0,4})/ : /(\d{0,2})(\d{0,4})(\d{0,4})/);
      return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    }
    return "";
  }

  static maskCpfCnpj(event) {
    event.target.value = Mask.getValueMaskCpfCnpj(event.target.value);
  }

  static maskValueCpfCnpj(value) {
    return Mask.getValueMaskCpfCnpj(value);
  }

  static getValueMaskCpfCnpj(value) {
    let cpfCnpj = String(value)
      .replace(".", "")
      .replace(".", "")
      .replace("-", "")
      .replace("/", "");
    if (cpfCnpj.length <= 11) {
      return cpfCnpj
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    } else {
      return cpfCnpj
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }
  }

  static maskCep(event) {
    event.target.value = Mask.getValueMaskCep(event.target.value);
  }

  static maskValueCep(value) {
    return Mask.getValueMaskCep(value);
  }

  static getValueMaskCep(value) {
    return String(value)
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  }

  static clearMask(value) {
    let valueClear = Utils.replaceAll(value, ".", "");
    valueClear = Utils.replaceAll(valueClear, "/", "");
    valueClear = Utils.replaceAll(valueClear, "(", "");
    valueClear = Utils.replaceAll(valueClear, ")", "");
    valueClear = Utils.replaceAll(valueClear, "-", "");

    return String(valueClear).trim();
  }

  static maskNumberInteger(event) {
    event.target.value = Mask.getValueMaskNumberInteger(event.target.value);
  }

  static maskValueNumberInteger(value) {
    return Mask.getValueMaskNumberInteger(value);
  }

  static getValueMaskNumberInteger(value) {
    return String(value).replace(/\D/g, "");
  }

  static maskDate(campo, e) {
    var kC = e.keyCode;
    var data = campo.value;

    if (kC !== 8 && kC !== 46) {
      if (data.length === 2) {
        campo.value = data += "/";
      } else if (data.length === 5) {
        campo.value = data += "/";
      } else campo.value = data;
    }

    return campo;
  }

  static maskDateBr(dateString) {
    let dateTime = Date.parse(dateString);
    if (!isNaN(dateTime)) {
      return moment(dateString).format("DD/MM/YYYY HH:MM:SS");
    } else {
      return dateString;
    }
  }

  static maskDateBrSemHoras(dateString) {
    let dateTime = Date.parse(dateString);
    if (!isNaN(dateTime)) {
      return moment(dateString).format("DD/MM/YYYY");
    } else {
      return dateString;
    }
  }

  static maskDatePattern(dateString, pattern) {
    let dateTime = Date.parse(dateString);
    if (!isNaN(dateTime)) {
      return moment(dateString).format(pattern);
    } else {
      return dateString;
    }
  }

  static convertNumberBr(number) {
    let numero = Number(number);
    return isNaN(numero)
      ? Number(0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
      : numero.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  }

  static convertNumberDecimal(number) {
    return String(number).replace(".", "").replace(",", ".").replace("R$", "").trim();
  }

  static maskNumberDecimal(number) {
    let numberString = String(number).replace(",", "").replace("R$", "").trim();
    return numberString.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  }

  static clearNumber(number) {
    return parseInt(
      String(number).replace(",", "").replace(".", "").replace("R$", "").trim(),
      10
    );
  }

  static formatBR(value, decimais = 2) {
    decimais = decimais || 2;
    let mi = value.length - parseInt(decimais);
    let sm = parseInt(mi / 3);
    let regx = "",
      repl = "";

    for (let i = 0; i < sm; i++) {
      regx = regx.concat("([0-9]{3})");
      repl = repl.concat(".$" + (i + 1));
    }

    regx = regx.concat("([0-9]{" + decimais + "})") + "$";
    repl = repl.concat(",$" + (sm + 1));

    value = value.toString().replace(new RegExp(regx, "g"), repl);

    return mi % 3 === 0 ? value.substr(1) : value;
  }

  static formatValueBr(value, toFixed = 2) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: toFixed,
    });
  }

  static clearMaskBr(value) {
    let valueString = String(value)
      .replace(",", "")
      .replace(".", "")
      .replace("R$", "")
      .replace(/^0+/, "")
      .trim();

    let valueNumber = parseInt(valueString, 10);
    return valueNumber.toString();
  }   


}