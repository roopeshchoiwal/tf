const RegexCheck = {};

RegexCheck.URL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
RegexCheck.EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
RegexCheck.OBJECTID = /^[a-fA-F0-9]{24}$/i;
RegexCheck.JWT = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
RegexCheck.TEXT = /^[,. a-zA-Z0-9]+$/;
RegexCheck.TEXTQ = /^[,.? a-zA-Z0-9]+[?]$/;
RegexCheck.TEXTS = /^[,.=;:\[\]\{\} a-zA=Z0-9]+$/;
const check = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;

export default RegexCheck;