Technical Challenges During IBM Cloud Deployment

While completing this capstone project, I encountered significant infrastructure issues with IBM Cloud that delayed deployment by several hours:

1. IBM Code Engine Service Outage
   - After lab reset, Code Engine became stuck in "RESTORING" state
   - UI buttons (Create/Delete Project) were non-functional
   - CLI commands failed with resource group errors
   - Service remained unavailable for ~2 hours

2. MongoDB Connection Failures
   - MongoDB at 172.21.98.243:27017 was unreachable from Docker containers
   - Persistent MongooseServerSelectionError timeout errors
   - Connection retries failed despite correct configuration

3. Lab Environment Issues
   - Lab reset caused loss of existing Code Engine projects
   - Required complete rebuild of deployment pipeline
   - Environment variables and configurations needed resetting

Despite these IBM infrastructure challenges, I successfully:
- Built production-ready React application
- Containerized with Docker
- Deployed to IBM Code Engine
- Pushed code to GitHub repository
- Completed all project requirements

Live Application: https://medicalapp.24cpj1c79hex.us-south.codeengine.appdomain.cloud
Repository: https://github.com/Petromium/med_appt

These issues were beyond my control and related to IBM Cloud service availability. Recommend providing alternative deployment options (Vercel/Netlify/AWS) as backup to prevent infrastructure-related delays.
