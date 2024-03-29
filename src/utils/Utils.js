

export default class Utils {
    static isValueValid(value) {
      return (
        this.isNotNull(value) &&
        this.isNotEmpty(value) &&
        this.isNotArrayEmpty(value) &&
        this.isTrue(value) &&
        this.isNotObjectEmpty(value)
      );
    }
  
    static isNotObjectEmpty(value) {
      return value instanceof Object ? Object.keys(value).length > 0 : true;
    }
  
    static isFunction(value) {
      return value instanceof Function ? true : false;
    }
  
    static isTrue(value) {
      return value instanceof Boolean ? Boolean(value) === true : true;
    }
  
    static isNotNull(value) {
      return value !== null && value !== undefined && Utils.trim(value) !== "";
    }
  
    static isNotEmpty(value) {
      return value instanceof String ? String(value).length > 0 : true;
    }
  
    static isNotArrayEmpty(value) {
      return value instanceof Array ? Array.from(value).length > 0 : true;
    }
  
    static isArrayNotEmpty(value) {
      let valid = this.isValueValid(value);
      if (valid) {
        let array = Array.from(value);
        return array.length > 0;
      }
      return false;
    }
  
    static replaceAll(string, value, replaceValue) {
      return String(string).split(value).join(replaceValue);
    }
  
  
  
    // Utilizar como ids de components gerados dinamicamente
    static uuidString(prefix = "", sufix = "") {
      return prefix
        .concat(
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 10)
        )
        .concat(sufix);
    }
  
    static refreshPage(time = 0) {
      setTimeout(() => {
        window.location.reload();
      }, time);
    }
  
    static groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = item[keyGetter];
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    }
  
    static sort(list, keySort) {
      return Array.from(list).sort((a, b) => {
        return a[keySort] < b[keySort] ? -1 : a[keySort] > b[keySort] ? 1 : 0;
      });
    }
  
    static sortReverse(list, keySort) {
      return Array.from(list).sort((a, b) => {
        return a[keySort] > b[keySort] ? -1 : a[keySort] > b[keySort] ? 1 : 0;
      });
    }
  
    static quebrarArray(base, max) {
      var res = [];
      //[1,2,3,4,5,6,7,8,9,10,11,12,13]
      // 6
  
      for (var i = 0; i < base.length; i = i + max) {
        res.push(base.slice(i, i + max));
      }
      // res[res.length - 1].push(base[0]);
      return res;
    }
  
    static capitalize(str) {
      str = str.split(" ");
  
      for (var i = 0, x = str.length; i < x; i++) {
        if (Utils.isValueValid(str[i][0])) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1).toLowerCase();
        }
      }
  
      return str.join(" ");
    }
  
    static uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }
    static scrollTop() {
      window.scrollTo(0, 0);
    }
  
    static trim(str) {
      let newValue = String(str);
      return Utils.replaceAll(newValue, " ", "");
    }
  }