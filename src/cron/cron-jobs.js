const cron = require('node-cron');
const ipdExpenseSummary = require('./ipd-expense-summary');

(async () => {
  await ipdExpenseSummary();
})();

// cron.schedule('*/10 * * * * *', async () => {
//   console.log(new Date().toLocaleString());
//   // await ipdExpenseSummary();
// });

// cron.schedule('*/15 * * * * *', () => {
//   console.log(new Date().toLocaleString());

// });
