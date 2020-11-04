require('dotenv').config()

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
    API_BASE_URL: process.env.API_BASE_URL,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: 'true' },
          { key: "Access-Control-Allow-Origin", value: process.env.FRONTEND_DOMAIN },
          { key: "Access-Control-Allow-Methods", value: '*' },
          { key: "Access-Control-Allow-Headers", value: '*' },
        ]
      }
    ]
  }
}