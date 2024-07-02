let ipv4 = {
  random: function(subnet, mask) {
    // generate random address (integer)
    // if the mask is 20, then it's an integer between
    // 1 and 2^(32-20)
    let randomIp = Math.floor(Math.random() * Math.pow(2, 32 - mask)) + 1;

    return this.lon2ip(this.ip2lon(subnet) | randomIp);
  },
  ip2lon: function(address) {
    let result = 0;

    address.split('.').forEach(function(octet) {
      result <<= 8;
      result += parseInt(octet, 10);
    });

    return result >>> 0;
  },
  lon2ip: function(lon) {
    return [lon >>> 24, lon >> 16 & 255, lon >> 8 & 255, lon & 255].join('.');
  }
};

async function getPerf(ip) {
  try {
    const respsone = await fetch('https://' + ip + ':8443' + '/Annotation 2019-06-19 163156.png', {
      signal: AbortSignal.timeout(2000)
    })
    if (respsone) {
      console.log(await respsone.text())
    }
  } catch (error) {
    console.log(error)
  }
}
export {
  getPerf,
  ipv4
}
