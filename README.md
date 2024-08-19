# Microservice GeoIP

Get GeoLite2 data over HTTP

## Requirements

- Node.js v20.x (LTS)
- [MaxMind account](https://www.maxmind.com/en/account/login) for API Keys to download GeoLite2 databases
- IMPORTANT NOTE: While free, redistribution of these database files is not allowed by the [MaxMind GeoLite2 license](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data/#license). You must download the database files yourself and abide by the license terms

## Usage

- Run `npm install`
- Run the update process described below
- Run `npm start`

## Updating GeoLite2 Database

```bash
cd ./node_modules/geoip-lite/;
rm -r ./data/;
npm run-script updatedb license_key="YOUR_LICENSE_KEY_HERE";
```

You may wish to backup the downloaded and processed data in `./node_modules/geoip-lite/data` directory

## Usage Examples

Only IPv4 is supported at this time.  
If you want to limit access, host internally and ensure your firewall is correctly configured.

```bash
curl -v http://localhost:8080/v0/geoip?ipv4=[IPv4 STRING HERE];
```
