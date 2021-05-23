# Xmart-Shopping

## Mern Stack + WSO2 Enterprise Integrator

### Youtube video :movie_camera::boom: : https://youtu.be/tztfJ2cpj5Y 
<br></br>
## Students Contribution

### 1. Manuka Yasas
1. Product service to search (Full text), filter and perform all crud operations.
2. Shopping cart management.
3. Dummy credit card payment gateway service.
4. Dummy mobile payment gateway service using Twilio.
5. Place orders with multiple products.
6. Track orders.
7. Using WSO2 EI (Enterprise Integration – ESB) to integrate services at the
backend and expose a common web API.
8. Route the payment to either the banking payment gateway or the mobile
operator, based on some parameter of the payment request message.
9. Frontend of Delivery service.

### 2. Nethmi Divya https://github.com/NethmiDivyaT/Backend-item
1. Seller service where sellers can add/update/delete items.

### 3. Harini https://github.com/Rane1998/ds_auth
1. JWT authentication service to perform role based authentication.
2. Delivery service to deliver orders.

<br></br>

## High Level Diagram

![High level Diagram](https://user-images.githubusercontent.com/63389716/119252085-d9afdf80-bbc7-11eb-88d7-3641b9592f3e.png)

### Technologies

1. Node, Express, JWT, Passport.
2. React and Redux.
3. Mongo database.
4. Twilio to send SMS.
5. Node mail - Gmail SMTP to send emails.
6. WSO2 Enterprise Integrator.

## Authentication and Security Mechanism adopted with system

### User Authentication
Json web token based authentication mechanism is used to verify user identity by returning a unique
token. Guest have to verify the credential once and in return they will get a unique token which is
allowed to access for 10 minutes. The token will have user’s basic details and role details.
When registering a user and resetting a password the password entered is encrypted (using bcrypt) and
stored in the database. Even when querying we can get only the highest version of the password unless
specially quarried for the real password.
User can request to reset the password then a hashed reset token will be generated and an email will be
sent to the user’s email address along with the reset URL. Once user visit the reset URL, server checks
the validity of the reset token and allows to change the password.

### Service Authentication
Since the authentication is developed as a service, the buyer service and the seller service requires to be
authenticated externally. For this the buyer service and the seller service will be using a middleware to
send a request to the authentication service to validate the bearer token sent in request headers
through the WSO2 EI (ESB).
“Authenticate” middleware in the buyer/seller service is used to validate the response that is returned
after requesting the authentication service with authorization token in request headers. If the response
sent from the authentication service has a user, it will be added to the request object and the next
function will be invoke. </br>
Function “getAuthUserFromBearerToken” is used in the buyer/seller service to request the
authentication service with the authorization token(JWT) and return back the response. The request will
be sent through the ESB.</br>
Function “validate token” is used in the Authentication service to validate the token sent in the request
body and if the token is verified, user will be retrieved and returned.</br>
If the token is valid then the user will be added to the request object in the Buyer and Seller service.
Since the role “seller” must be validated in the seller service another middleware is used to validate the
role in the request user.

### Payment Security
In order to provide extra security when making a payment through credit card gateway or mobile
payment gateway, order details along with the transfer amount will be hashed.
When the user is paying through credit card / mobile then a request will be sent to the gateway with
transfer amount and order id. Since these data could be changed, another parameter is sent which is a
hashed value generated using the order id, transfer amount and order secret key. Order secret key will
be saved in environment configurations in both the services. The payment gateway will hash the data
received (transfer amount and order id) with the order secret and generate a hashed value. If this value
and the hashed parameter sent along with the data matches then the payment is secure and can be
made.
(In real scenario payment gateways will use the Client User ID and Secret received when registering to
the gateway)
Also after completing the payment, gateway will send a request to the buyer service with the data such
as order id, transfer amount and payment hash code. Payment hash code is generated using the order
id, transfer amount and payment secret key. Payment secret key will be saved in environment
configurations in both the services. Then the buyer service will validate and compare a payment hash
codes and if valid the order payment will be updated as paid and notifications will be sent through mail
and SMS.

### User Interfaces :camera:

![2localhost_3000_products](https://user-images.githubusercontent.com/63389716/117570727-2cc66480-b0e9-11eb-9bff-7ca63e29ba4a.png)
![3localhost_3000_search_perfumes](https://user-images.githubusercontent.com/63389716/117570760-5a131280-b0e9-11eb-91f7-676ad62e7aec.png)
![4localhost_3000_ product](https://user-images.githubusercontent.com/63389716/117570794-7dd65880-b0e9-11eb-896e-e617255f7ee8.png)
![5localhost_3000_ cart_add](https://user-images.githubusercontent.com/63389716/117570827-95154600-b0e9-11eb-9a60-74708789b68f.png)
![6localhost_3000_cart](https://user-images.githubusercontent.com/63389716/117570842-a3fbf880-b0e9-11eb-853d-c006770d4e51.png)
![7localhost_3000_order_details](https://user-images.githubusercontent.com/63389716/117570855-b413d800-b0e9-11eb-9c90-3a64b6a9de71.png)
![8localhost_3000_order_payment_card](https://user-images.githubusercontent.com/63389716/117570870-c9890200-b0e9-11eb-9e7d-14a60a926095.png)
![9localhost_3000_order_payment_mobile](https://user-images.githubusercontent.com/63389716/117570872-d0b01000-b0e9-11eb-8191-dedf3d0537ef.png)
![10localhost_3000_order_mobile_validator](https://user-images.githubusercontent.com/63389716/117570874-d3ab0080-b0e9-11eb-97bc-7929902c7e4c.png)
![11localhost_3000_order_payment_cod](https://user-images.githubusercontent.com/63389716/117570888-defe2c00-b0e9-11eb-88c8-47eeee3f59ff.png)
![12localhost_3000_order_success](https://user-images.githubusercontent.com/63389716/117570891-e0c7ef80-b0e9-11eb-8453-ffa57e4c3d4e.png)
![13temp-mail org_fa_view](https://user-images.githubusercontent.com/63389716/117570896-e9b8c100-b0e9-11eb-9ebb-5ba3516a224b.png)
![14Screenshot_20210505_012211_com google android apps messaging](https://user-images.githubusercontent.com/63389716/117570920-094fe980-b0ea-11eb-88ef-c8e576e182a2.jpg)
![15localhost_3000_track-order](https://user-images.githubusercontent.com/63389716/117570927-140a7e80-b0ea-11eb-94af-d256979615f5.png)
![16localhost_3000_login](https://user-images.githubusercontent.com/63389716/117570930-18cf3280-b0ea-11eb-937a-825a91ed2929.png)
![17localhost_3000_register](https://user-images.githubusercontent.com/63389716/117570935-1bca2300-b0ea-11eb-98ca-6831a42825a3.png)

