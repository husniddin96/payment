# Payment project

## Getting started

Install dependencies:

```bash
cd payment
npm/yarn install
```

Before requesting to API you need to:
- install mongodb
- add database payments
- add following data
  	[
	 {phone: "+998991234567", balance: 50000, status: 1, password: "secret1"}, 
	 {phone: "+998991234568", balance: 10000, status: 1, password: "secret2"}, 
	 {phone: "+998991234569", balance: 20000, status: 1, password: "secret3"} 
 	])

## Following requests are implemented in this project

!NOTE: Every request need to executed with Basic authorization. In our case phone:password is encrypted.
Data exchange format is JSON.

'verify' request:

```bash
curl -X POST \
  http://127.0.0.1:3000/payment/api/verify \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'Authorization: Basic Kzk5ODk5MTIzNDU2NzpzZWNyZXQx' \
  -d '{
	"phone":"+998991234568"
      }'
```

response:

```json
{
    "err": null,
    "msg": "Receiver user with this phone number is exists",
    "result": true
}
```

'pay' request:

```bash
curl -X POST \
  http://127.0.0.1:3000/payment/api/pay \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'Authorization: Basic Kzk5ODk5MTIzNDU2NzpzZWNyZXQx' \
  -d '{
	"phone":"+998991234568",
	"amount": 2300
      }'
```

response:

```json
{
    "err": null,
    "msg": "Successfully transferred!",
    "result": true
}
```

'cancel' request:

```bash
curl -X POST \
  http://127.0.0.1:3000/payment/api/cancel \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'Authorization: Basic Kzk5ODk5MTIzNDU2NzpzZWNyZXQx' \
  -d '{
	"transactionId": "5d4be18da89a054195387db9"
      }'
```

response:

```json
{
    "err": null,
    "msg": "Transaction successfully canceled",
    "result": true
}
```


'check' request:

```bash
curl -X GET \
  http://127.0.0.1:3000/payment/api/check \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'Authorization: Basic Kzk5ODk5MTIzNDU2NzpzZWNyZXQx' \
  -d "transactionId=5d4be3f16684ef4824058495"
```

response:

```json
{
    "err": null,
    "msg": "Transaction is found",
    "result": {
        "created": "2019-08-08T08:57:21.813Z",
        "_id": "5d4be3f16684ef4824058495",
        "sender": "5d4b35178c6327ab4d7cc0b7",
        "receiver": "5d4b35178c6327ab4d7cc0b8",
        "amount": 2300,
        "status": 1,
        "__v": 0
    }
}
```


