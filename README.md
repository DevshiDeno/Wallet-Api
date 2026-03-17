# Wallet Transaction API

A simple wallet backend service that allows account creation, deposits, and transfers while recording transactions.


Node.js  
Express  
SQLite  

## Setup

Clone the repository

git clone https://github.com/DevshiDeno/Wallet-Api

Install dependencies

npm install

Run the server

npm run dev

Server runs on:

http://localhost:3000

## API Endpoints

Create account

POST /accounts

Example:

{
  "name": "Dennis"
}

Deposit money

POST /transactions/deposit

{
  "accountId": "ACCOUNT_ID",
  "amount": 500
}

Transfer money

POST /transactions/transfer

{
  "senderId": "ACCOUNT_ID",
  "receiverId": "ACCOUNT_ID",
  "amount": 100
}

Get account

GET /accounts/:id
