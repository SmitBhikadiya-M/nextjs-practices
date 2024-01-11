// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var regexes = {
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
};

function not(func) {
  return function () {
    return !func.apply(null, Array.prototype.slice.call(arguments));
  };
}

function existy(value) {
  return value != null;
}

function ip(value) {
  return existy(value) && regexes.ipv4.test(value) || regexes.ipv6.test(value);
}

function object(value) {
  return Object(value) === value;
}

function string(value) {
  return Object.prototype.toString.call(value) === '[object String]';
}

var is = {
  existy: existy,
  ip: ip,
  object: object,
  string: string,
  not: {
    existy: not(existy),
    ip: not(ip),
    object: not(object),
    string: not(string)
  }
};

function getClientIpFromXForwardedFor(value) {
  if (!is.existy(value)) {
    return null;
  }

  if (is.not.string(value)) {
    throw new TypeError("Expected a string, got \"".concat(_typeof(value), "\""));
  }

  var forwardedIps = value.split(',').map(function (e) {
    var ip = e.trim();

    if (ip.includes(':')) {
      var splitted = ip.split(':');

      if (splitted.length === 2) {
        return splitted[0];
      }
    }

    return ip;
  });

  for (var i = 0; i < forwardedIps.length; i++) {
    if (is.ip(forwardedIps[i])) {
      return forwardedIps[i];
    }
  }

  return null;
}

function getClientIp(req) {
  if (req.headers) {
    if (is.ip(req.headers['x-client-ip'])) {
      return req.headers['x-client-ip'];
    }

    var xForwardedFor = getClientIpFromXForwardedFor(req.headers['x-forwarded-for']);

    if (is.ip(xForwardedFor)) {
      return xForwardedFor;
    }

    if (is.ip(req.headers['cf-connecting-ip'])) {
      return req.headers['cf-connecting-ip'];
    }

    if (is.ip(req.headers['fastly-client-ip'])) {
      return req.headers['fastly-client-ip'];
    }

    if (is.ip(req.headers['true-client-ip'])) {
      return req.headers['true-client-ip'];
    }

    if (is.ip(req.headers['x-real-ip'])) {
      return req.headers['x-real-ip'];
    }

    if (is.ip(req.headers['x-cluster-client-ip'])) {
      return req.headers['x-cluster-client-ip'];
    }

    if (is.ip(req.headers['x-forwarded'])) {
      return req.headers['x-forwarded'];
    }

    if (is.ip(req.headers['forwarded-for'])) {
      return req.headers['forwarded-for'];
    }

    if (is.ip(req.headers.forwarded)) {
      return req.headers.forwarded;
    }

    if (is.ip(req.headers['x-appengine-user-ip'])) {
      return req.headers['x-appengine-user-ip'];
    }
  }

  if (is.existy(req.connection)) {
    if (is.ip(req.connection.remoteAddress)) {
      return req.connection.remoteAddress;
    }

    if (is.existy(req.connection.socket) && is.ip(req.connection.socket.remoteAddress)) {
      return req.connection.socket.remoteAddress;
    }
  }

  if (is.existy(req.socket) && is.ip(req.socket.remoteAddress)) {
    return req.socket.remoteAddress;
  }

  if (is.existy(req.info) && is.ip(req.info.remoteAddress)) {
    return req.info.remoteAddress;
  }

  if (is.existy(req.requestContext) && is.existy(req.requestContext.identity) && is.ip(req.requestContext.identity.sourceIp)) {
    return req.requestContext.identity.sourceIp;
  }

  if (req.headers) {
    if (is.ip(req.headers['Cf-Pseudo-IPv4'])) {
      return req.headers['Cf-Pseudo-IPv4'];
    }
  }

  if (is.existy(req.raw)) {
    return getClientIp(req.raw);
  }

  return null;
}

export default function handler(req, res) {

  let ip;
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  console.log(ip, getClientIp(req));


  res.status(200).json({
    name: 'John Doe',
    xForwarded: req.headers['x-forwarded-for'],
    xReal: req.headers['x-real-ip'],
    remoteADD: req.connection.remoteAddress,
    userAgen: req.headers['user-agent'],
    localADD: req.socket.localAddress,
    ip,
    getClientIp: getClientIp(req),
    vatsal: req.client._peername
  })

}
