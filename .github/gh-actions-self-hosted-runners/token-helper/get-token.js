import { createAppAuth } from "@octokit/auth-app";
import fs from "fs";
import axios from "axios";

const privateKey = fs.readFileSync($PEM_FILE_PATH, 'utf-8')
const org = $ORG_NAME

// Create and app authentication
const auth = createAppAuth({
    appId: $APP_ID,
    privateKey: privateKey,
    clientId: $CLIENT_ID,
    clientSecret: $CLIENT_SECRET
  });

// Retrieve installation access token
const { token } = await auth({
    type: "installation",
    installationId: $INSTALLATION_ID
});

// Create axios instance
const api = axios.create({
    baseURL: "https://api.github.com/",
    timeout: 15000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

// Register the self-hosted runner
const { data } = await api.post(`orgs/${org}/actions/runners/registration-token`, {})
  .then(function (response) {
     return response;
  })
  .catch(function (error) {
    console.log(error);
    return { data: null }
});

console.log(data.token)
