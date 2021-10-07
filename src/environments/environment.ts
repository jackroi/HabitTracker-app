import Environment from "./type";


const productionEnvironment: Environment = {
  API_PROTOCOL: 'https',
  API_HOST: 'rosin-habit-tracker.herokuapp.com',
  API_PORT: 443,
  API_VERSION: '1.0.0'
};

const developmentEnvironment: Environment = {
  API_PROTOCOL: 'http',
  API_HOST: '192.168.1.14',
  API_PORT: 8000,
  API_VERSION: '1.0.0'
};

export default productionEnvironment;
