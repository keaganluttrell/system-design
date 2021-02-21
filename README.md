# System Design for Cart

<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/><img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/><img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/><img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img alt="Webpack" src="https://img.shields.io/badge/webpack%20-%238DD6F9.svg?&style=for-the-badge&logo=webpack&logoColor=black" /><img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/><img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/><img alt="GitHub" src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/><img alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/><img alt="AWS" src="https://img.shields.io/badge/AWS%20-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/><img alt="Docker" src="https://img.shields.io/badge/docker%20-%230db7ed.svg?&style=for-the-badge&logo=docker&logoColor=white"/><img alt="Nginx" src="https://img.shields.io/badge/nginx%20-%23009639.svg?&style=for-the-badge&logo=nginx&logoColor=white"/>
<br></br>

![visitors](https://visitor-badge.glitch.me/badge?page_id=keaganluttrell.system-design)


<a href="https://www.linkedin.com/in/keaganluttrell" target="_blank">
  <img alt="Keagan Luttrell" src="https://img.shields.io/badge/-Keagan%20Luttrell-blue?&style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>


## Contents:
- [System Design for Cart Service](#system-design-for-cart-service)
- [About](#about)
- [Installation](#installation)
- [Screenshots](#screenshots)

# System Design for Cart Service

## About

### Challenge
I took on a legacy code base a needed to scale it to meet the needs of a production level e-commerce site.  I scaled the shopping cart service on
the product item page and needed to get some benchmarks to get an idea of what I needed to scale to. This codebase was an Etsy clone, so I found
some monthly traffic from Etsy.  Etsy receives about <a href="https://www.similarweb.com/website/etsy.com/">400 million visitors</a> a month or
roughly 10,000 visitors per minute. According to the same <a href="https://www.similarweb.com/website/etsy.com/">source</a> there is an average
of 6.7 page visits every 6.25 minutes, so a 1:1. I took 10,000 times 3 to give some buffer room to meet a small spike in requests for the product
item page.

#### Goals to hit
* Serve 30,000 requests per minute
* Keep latency under 1 second
* Keep Costs to a minimum

### Action
I chose to go with a Postgres Database, which replaced the original Mongo Database.  Postgres offered a NoSQL option with its JSONB support that
is an excellent replacement for Mongo with the added features of possibly migrating or adding more columns for a Relational Database down the road
if the need arises.

For hosting, I went with AWS. AWS offered several things for this project. S3, which was used to host images, stylesheets, and other static files.
This freed up the server in each service instance, as Node was found early on to be a bottleneck. Secondly, EC2 from AWS was used to containerize
the service, database, and the proxy server. I used the free tier T2 micros from AWS to keep costs to a minimum.

For the proxy, I went with Nginx. Nginx afforded me load-balancing, a full-reverse proxy, and the ability to serve my index page.

CLIENT ---> PROXY ---> SERVICE(S) ---> POSTGRES

### Results
With 1 NginX load-balancer, 1 service, and 1 database I was able to get 32k requests per minute, under .1 seconds latency, and 0% error rate.
To see what a maximal load would look like I took the liberty to add more services as needed. The free tier T2 micros only have 1 GB of RAM, so
I needed to scale this database. I was able to keep a single Nginx instance and have 8 service instances with 2 databases. I was able to handle
around 270k requests per minute, under 1 % error rate and under a quarter of a second latency.

### Conclusion
I was able to meet the goal of 30k requests per minute while keeping costs down and also able to scale the database to meet the needs of a high
volume day. I however did not manage to set up auto scaling at this point in time. In fact, it is something that I would do differently if I were
to scale again. I also think setting up continuous integration / continuous delivery (CI/CD) would be something I would take the time to set up.
Lastly, if I were to vertically scale anything, it would be my database. I believe having more that 1GB of RAM on tap for handling thousands of
requests would be handy as well as only updating one location.

## Installation

To get started install the packages!

```
npm install
```

then seed the database

```
npm run seed
```

**NOTE** You will need an API Key from Bing Maps. more info https://www.bingmapsportal.com/<br></br>
Place key on Line 10 of client/Cart.jsx

then to bundle this application run:

```
npm run watch
```

then start the server!

```
npm start
```

Navigate to http://localhost:3003/ to see the page in action

