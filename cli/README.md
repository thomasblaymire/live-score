# CLI Package
The CLI package deails with everything AWS along with building both the Client Application and the API folder. 


## Reasoning

AWS for a project of this size is generally overkill and something such as Vercel would suffice for the frontend hosting along with using Raleway for the DB and a standard NodeJS hosting solution such as Heroku for the backend. 

However AWS in the long run will work out better cost wise along with sending emails for password resets and registrations will be a fraction of the cost of using MailChimp etc. 

## Commands

To strt the CLI package will contain two commands build and deploy. One will compile the client and api the second will deal with auto-deploying to via Github actions / AWS. 


## AWS Infrastructure

- S3
- Route 53 (Currently on livescores.click)
- AWS Cert Manager for SSL
- Cloudfront CDN & Deployment Cache Invalidation
- OIA (Limit S3 Access to Cloudfront)
- Custom CI Pipeline with AWS CLI 
- Deployments via Github Actions
- Lambda Edge
