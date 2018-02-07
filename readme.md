# Pioneers Hackathon

## Idea
* Mobility Marketplace

## Wording
* trip: a way to get from A to B via one or more trip segments and potentially multiple ways of transport
* trip segment: a part of a trip offered by one mobility provider
* ticket: the proof of possession of a trip segment

## Actors
* Mobility providers: train company, airline, ferry, carsharing, car rentals, car pooling, taxi, local public transport
* Customer: A person wanting to make a trip
* Agents: Travel Agencies, AIs (???)

## User stories
* As a customer I want to go on holiday to Iceland in summer and want to go there as cheap as possible, the exact date doesn't matter.
* As a customer I need to go to Munich with two colleagues, have to be there on 06.02.2018 by 4pm and want to spend as little time as possible.
* As a customer I want to be able to book my travel as easy as possible.
* As a customer I want to be able to make specific requirements for my trip if needed.
* As a customer I want to be sure I made a good deal.
* As a customer I want to publish my travel demands and want mobility providers and or agents to offer me matching trips.
* As a customer I want to be able to react quickly to changes in my travel plan without doing much work/searching myself.
* As a mobility provider I want to offer tickets for my trip segments to my customers.
* As a mobility provider I want to be able to check if a customer owns a ticket.
* As a mobility provider I want to be able to see detailed usage statistics about my service to be able to allocate my resources in the best way possible.

## Possible Questions
* **Q: What happens if an owned trip segment is canceled?**
* A: The provider locks an amount with offering a trip segment as an insurance. If a trip segment is canceled (e.g. checked by an oracle) the owner of the trip gets the insurance.
* **Q: I don't have a drivers license, can I prevent the system from booking rental cars?**
* A: It's a matter of filtering.
* **Q: As a mobility provider, how can I check if the customer has a ticket?**
* A:
* **Q: As a customer, how can I be sure the trip takes place?**
* A: He can't be with the current system either. You basically trust the providers and with this market you can even check past trips by a provider.
* **Q: Is there protection against people bulk buying tickets just for reselling them for double the price? Since all or most of tickets were sold, a customer is forced to buy the overpriced ticket.**
* A:
* **Q: Can tickets without a specific start and destination be bought via this platform? (e.g. dayticket for local public transport, car rental)**
* A:
* **Q: The taxi to the airport didn't show so I missed my flight to Iceland. Who pays the missed flight? Can I get another flight?**
* A: You could re-sell the ticket the moment you realize you are not going to make it (probably won't work for the same price)
* **Q: As an airline I don't want to start a flight where only 5 seats are booked. What can I do?**
* A: The airline can buy tickets of other airlines (or any other mobility provider) and transfer ownership to the customer.
* **Q: As a customer I want to see the reputation of the mobility provider. Is this possible?**
* A: You can check the history of a provider. How many trips were offered/sold and whats the % on canceled trips?
* **Q: I lost the key I bought the trip with. Can I still travel or get my money back?**
* A: Mechanism for key recovery like recovery delegates which can be persons like family members or institutions.
* **Q: How much data of my travels is public? How can I prevent someone from building a extensive profile of me? (e.g. find out where I live by taxi or bus stop and when I'll be on holiday?)**
* A:
