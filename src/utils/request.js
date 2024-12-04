const crypto = require("crypto");

function getSign(str) {
  const secretkey = "6862037DD24DD02DAB812CB702FC068A";
  return crypto
    .createHmac("sha256", Buffer.from(secretkey, "utf8"))
    .update(str, "utf8")
    .digest("base64");
}
function getTime() {
  return new Date().toISOString();
}

export function getLogin() {
  let timestamp = "" + Date.now() / 1000;
  let str = `${timestamp}GET/users/self/verify`;
  return {
    apiKey: "598b98ce-05be-4363-89e6-2a2314df9513",
    passphrase: "123456.Zzk",
    timestamp,
    sign: getSign(str),
  };
}

function getHeaders(url, method, data) {
  let timestamp = getTime();
  let sign;
  let str = `${timestamp}${method}${url}`;
  if (method === "GET") {
    const queryString = new URLSearchParams(data).toString();
    if (queryString) {
      str += "?" + queryString;
    }
    sign = getSign(str);
  } else {
    // 对于 POST 请求，构建请求体字符串
    const bodyStringifiedData = JSON.stringify(data);
    str += bodyStringifiedData;
    sign = getSign(str);
  }
  return {
    // Authorization:
    //   "OhBXNS4SHQN5FkYLGHYWUSRcQj40MBwTVVBeE0M7XUguEA9yNBYdFl4GKlBMPxYfY9W67qXR25-fzIGRo3gYBzRBRiIJF1FNBktTCA14QVYkQHcpMBZRTRIGAV9ANEB6MkZWNCUdB1UcUBFCRChaRCxXAWpiERIeXR0kABliBxx2ABBhcUNRWxIcBVxEeA4HpI6DttnJlvCfUEgTRihbUDF8Qj0lUUlV1f7e1LzN3bb_BsTq50FHVRxQBURVMmBMLFcBanFEQEUDQFEIEmsFFnFP",
    // "Content-Type": "application/json",
    // Accept: "application/json",
    "Content-Type": "application/json",
    "OK-ACCESS-KEY": "598b98ce-05be-4363-89e6-2a2314df9513",
    "OK-ACCESS-SIGN": sign,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": "123456.Zzk",
  };
}
export async function request({ url, method, params = {} }) {
  let apiUrl = url;
  const payload = {
    method,
    headers: getHeaders(url, method, params),
  };
  if (method == "GET") {
    const newParams = new URLSearchParams(params);
    const paramsStr = newParams.toString();
    if (paramsStr) {
      apiUrl = apiUrl + "?" + paramsStr;
    }
  } else {
    payload["body"] = JSON.stringify(params);
  }
  try {
    const response = await fetch(apiUrl, payload);
    if (!response.ok) {
      // 处理 HTTP 错误状态码
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
