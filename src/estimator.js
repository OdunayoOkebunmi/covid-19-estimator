// const inputData = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };
const getFactor = (timeToElapse, periodType) => {
  let numberOfDays = timeToElapse;
  switch (periodType) {
    case 'days':
      return Math.trunc(numberOfDays / 3);
    case 'weeks':
      numberOfDays = timeToElapse * 7;
      return Math.trunc(numberOfDays / 3);
    case 'months':
      numberOfDays = timeToElapse * 30;
      return Math.trunc(numberOfDays / 3);
    default:
      numberOfDays = timeToElapse * 7;
      return Math.trunc(numberOfDays / 3);
  }
};

const impactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;
  const currentlyInfected = reportedCases * 10;
  const factor = getFactor(timeToElapse, periodType);
  const infectionsByRequestedTime = (currentlyInfected * 2 ** factor);
  const impact = {
    currentlyInfected,
    infectionsByRequestedTime
  };
  return impact;
};
const severeImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;
  const currentlyInfected = reportedCases * 50;
  const factor = getFactor(timeToElapse, periodType);
  const infectionsByRequestedTime = (currentlyInfected * 2 ** factor);
  const impact = {
    currentlyInfected,
    infectionsByRequestedTime
  };
  return impact;
};
const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactEstimator(data),
  severeImpact: severeImpactEstimator(data)
});
// console.log(covid19ImpactEstimator(inputData));
export default covid19ImpactEstimator;
