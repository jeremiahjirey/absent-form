
# AWS Deployment Guide

This guide outlines the steps needed to deploy this application on AWS using RDS (MariaDB), Lambda, and API Gateway.

## 1. Database Setup (RDS)

1. **Create an RDS MariaDB instance**:
   - Go to the AWS Console > RDS
   - Click "Create database"
   - Choose "MariaDB"
   - Configure the instance settings (db.t3.micro is sufficient for testing)
   - Set your database credentials (remember these for environment variables)
   - Set the DB name, e.g., "attendance_db"
   - Configure additional settings as needed and create the database

2. **Set up database schema**:
   - Connect to your RDS instance using a MySQL client
   - Run the SQL script in `lambda/setup-database.sql` to create the table and sample data

## 2. Lambda Function Setup

1. **Create a Lambda function**:
   - Go to AWS Lambda in the AWS Console
   - Click "Create function"
   - Choose "Author from scratch"
   - Name your function (e.g., "student-attendance-api")
   - Select Node.js runtime (14.x or later)
   - Create the function

2. **Upload function code**:
   - In your local environment, navigate to the `lambda` directory
   - Run `npm install` to install dependencies
   - Zip the contents of the `lambda` directory
   - Upload the zip file to your Lambda function

3. **Configure environment variables**:
   - Add the following environment variables to your Lambda function:
     - DB_HOST: Your RDS endpoint
     - DB_USERNAME: Your database username
     - DB_PASSWORD: Your database password
     - DB_NAME: Your database name
     - DB_PORT: Database port (typically 3306 for MariaDB)

4. **Configure Lambda VPC**:
   - Edit the Lambda function's VPC settings to place it in the same VPC as your RDS instance
   - Select the appropriate subnets and security groups
   - Make sure the security group allows access to your RDS instance

## 3. API Gateway Setup

1. **Create a new API**:
   - Go to API Gateway in the AWS Console
   - Click "Create API"
   - Choose "REST API" and click "Build"
   - Create a new API with a name (e.g., "student-attendance-api")

2. **Create Resources and Methods**:

   Create the `/students` resource:
   - Click "Create Resource"
   - Resource Path: `/students`
   - Enable CORS

   Add GET method to `/students`:
   - Select the resource and click "Create Method"
   - Choose GET
   - Integration type: Lambda Function
   - Select your Lambda function

   Add POST method to `/students`:
   - Similar to GET, but choose POST
   - Integration type: Lambda Function
   - Select your Lambda function

   Create the `/students/{id}` resource:
   - Click "Create Resource"
   - Resource Path: `{id}`
   - Enable CORS

   Add GET, PUT, DELETE methods to `/students/{id}`:
   - For each method, choose the appropriate HTTP method
   - Integration type: Lambda Function
   - Select your Lambda function

3. **Deploy the API**:
   - Click "Deploy API"
   - Create a new stage (e.g., "dev")
   - Note the Invoke URL, which will be your API endpoint

## 4. Frontend Configuration

1. **Create a .env file**:
   - Copy `.env.example` to `.env`
   - Set `VITE_API_GATEWAY_URL` to your API Gateway URL (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com/dev`)
   - The database credentials are only needed on the Lambda function, not in the frontend

2. **Build and deploy the frontend**:
   - Run `npm run build` to create a production build
   - Deploy the contents of the `dist` folder to a hosting service of your choice (S3, Amplify, Vercel, etc.)

## Security Considerations

1. **CORS Configuration**: Ensure your API Gateway has proper CORS configuration for your frontend domain.

2. **API Authentication**: Consider adding authentication to your API (e.g., API keys, Cognito, etc.).

3. **Database Security**: Ensure your RDS instance is properly secured with VPC, security groups, and strong credentials.

4. **Environment Variables**: Never commit `.env` files to version control. Use secrets management services for production.
