import cheerio from "cheerio";

export const getVpnConnections = (ip, username, password) => {
  const url = `http://${ip}/Advanced_VPNClient_Content.asp`;
  const userpassascii = `${username}:${password}`;
  const authorization = `Basic ${btoa(userpassascii)}`;
  const init = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "text/plain",
      authorization
    }
  };

  return fetch(url, init).then(response => response.text()).then(body => {
    const $ = cheerio.load(body);
    const vpncClientList = $("input[name=vpnc_clientlist]").attr("value");
    return vpncClientList.split("<").map(str => {
      const values = str.split(">");

      return {
        name: values[0],
        protocol: values[1],
        server: values[2],
        username: values[3],
        password: values[4],
        type: "",
        autoConnect: 1
      };
    });
  });
};
