# Payment project

## Getting started

Install dependencies:

```bash
cd payment
npm/yarn install
```
``
Before requesting to API you need to:
- install mongodb
- add database payments
- add following data
  db.users.insert([
	 {phone: "+998991234567", balance: 50000, status: 1, password: "secret1"}, 
	 {phone: "+998991234568", balance: 10000, status: 1, password: "secret2"}, 
	 {phone: "+998991234569", balance: 20000, status: 1, password: "secret3"} 
 	])

## Following requests are implemented in this project

#!NOTE: Every request need to executed with Basic authorization. In our case phone:password is encrypted.
Data exchange format is JSON.

Request:

```bash
curl -X POST \
  http://127.0.0.1:3000/payment/api/verify \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'Authorization: Basic Kzk5ODk5MTIzNDU2NzpzZWNyZXQx' \
  -d '{
	"phone":"+998991234568",
	"amount": 2300
      }'
```

Response:

```json
{
    "err": null,
    "msg": "Successfully transferred!",
    "result": true
}```