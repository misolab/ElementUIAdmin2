import localKey from './localKey'

const devApiUrl = 'http://127.0.0.1:8080';
const proApiUrl = 'http://127.0.0.1:8080';


const nodeDevEnv = process.env.NODE_ENV == 'development' ? true : false;

export default {
  nodeDevEnv: nodeDevEnv,
  apiUrl: nodeDevEnv ? devApiUrl : proApiUrl,
  siteName: 'FC Helper',
  minSiteMame: 'FCH',
  apiPrefix: "",
  timeout: 5000,
  cookiesExpires: 7,
  requestRetry: 4,
  requestRetryDelay: 800,
  tokenKey: 'ACCESS_TOKEN',
  userInfoKey: 'USER_INFO',
  gitHub: 'https://github.com/misolab/ElementUIAdmin2',
  ...localKey
}
