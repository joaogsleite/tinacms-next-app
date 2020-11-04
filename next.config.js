require('dotenv').config()

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: 'true' },
          { key: "Access-Control-Allow-Origin", value: process.env.API_BASE_URL.split('://')[1] },
          { key: "Access-Control-Allow-Methods", value: '*' },
          { key: "Access-Control-Allow-Headers", value: '*' },
        ]
      }
    ]
  }
}