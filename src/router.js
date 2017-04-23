import cheerio from "cheerio";

const createRouterRequest = (
  ip,
  username,
  password,
  method,
  path,
  headers = {},
  body = ""
) => {
  const url = `http://${ip}/${path}`;
  const userpassascii = `${username}:${password}`;
  const authorization = `Basic ${btoa(userpassascii)}`;
  const init = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization,
      ...headers
    },
    body
  };

  return new Request(url, init);
};

export const fetchVpnConnections = (ip, username, password) => {
  const request = createRouterRequest(
    ip,
    username,
    password,
    "GET",
    "Advanced_VPNClient_Content.asp"
  );

  return fetch(request).then(response => response.text()).then(body => {
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
        type: "PPTP",
        autoConnect: 1
      };
    });
  });
};

export const vpnConnect = (
  routerIp,
  routerUsername,
  routerPassword,
  { server, username, password, protocol, type, autoConnect }
) => {
  const body = [
    "action_mode=apply",
    "action_script=restart_vpncall",
    `vpnc_pppoe_username=${username}`,
    `vpnc_pppoe_passwd=${password}`,
    `vpnc_heartbeat_x=${server}`,
    `vpnc_proto=${protocol}`,
    `vpnc_type=${type}`
  ];

  const request = createRouterRequest(
    routerIp,
    routerUsername,
    routerPassword,
    "POST",
    "start_apply.htm",
    {},
    body.join("&")
  );

  return fetch(request);
};