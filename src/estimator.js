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
      return numberOfDays;
  }
};
const getAvailableBed = (infectionsByRequestedTime, totalHospitalBeds) => {
  const severeCasesByRequestedTime = (infectionsByRequestedTime * 0.15);
  const availableHospitalBeds = totalHospitalBeds * 0.35;
  const hospitalBedsByRequestedTime = availableHospitalBeds - severeCasesByRequestedTime;
  return [Math.round(severeCasesByRequestedTime), Math.trunc(hospitalBedsByRequestedTime)];
};
const getDollarsInFlight = (periodType, timeToElapse,
  avgDailyIncomeInUSD, avgDailyIncomePopulation) => {
  let numberOfDays = timeToElapse;
  switch (periodType) {
    case 'days':
      return (avgDailyIncomeInUSD * avgDailyIncomePopulation) / timeToElapse;
    case 'weeks':
      numberOfDays = timeToElapse * 7;
      return (avgDailyIncomeInUSD * avgDailyIncomePopulation) / numberOfDays;
    case 'months':
      numberOfDays = timeToElapse * 30;
      return (avgDailyIncomeInUSD * avgDailyIncomePopulation) / numberOfDays;
    default:
      return numberOfDays;
  }
};
const impactEstimator = (data, rate) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
  } = data;
  const currentlyInfected = reportedCases * rate;
  const factor = getFactor(timeToElapse, periodType);
  const infectionsByRequestedTime = (currentlyInfected * 2 ** factor);
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const [severeCasesByRequestedTime, hospitalBedsByRequestedTime] = getAvailableBed(
    infectionsByRequestedTime, totalHospitalBeds
  );
  const dollarsInFlight = getDollarsInFlight(periodType, timeToElapse,
    avgDailyIncomeInUSD, avgDailyIncomePopulation);
  const impact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight: Math.trunc(dollarsInFlight * infectionsByRequestedTime)
  };
  return impact;
};
const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactEstimator(data, 10),
  severeImpact: impactEstimator(data, 50)
});
// console.log(covid19ImpactEstimator(inputData));
export default covid19ImpactEstimator;
