http://172.16.3.201:4001/market

POST http://172.16.3.201:4001/market/offer
POST http://172.16.3.201:4001/market/demand

JSON:
{
    "price": 50,
    "date": 1518134400,
    "capacity": 2,
    "travel_time": 10,
    "from": "Munich",
    "to": "Berlin"
}

WS:
http://172.16.3.201:4001/socket
channel: new_mined_tx_everyone
