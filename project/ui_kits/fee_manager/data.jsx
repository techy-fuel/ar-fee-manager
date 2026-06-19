/* Al Rehman Fee Manager UI Kit — realistic mock data. */
(function () {
  const students = [
    { id: 'STU-1042', name: 'Ahmed Raza',     cls: 'Class 9-A',  fee: 3500, status: 'Active',   feeStatus: 'Paid',    parent: 'Raza Muhammad',  wa: '+92 300 1234567', avatar: null },
    { id: 'STU-1043', name: 'Fatima Bibi',    cls: 'Class 7-B',  fee: 3000, status: 'Active',   feeStatus: 'Pending', parent: 'Abdul Karim',    wa: '+92 301 7654321', avatar: null },
    { id: 'STU-1044', name: 'Usman Khan',     cls: 'Class 10-A', fee: 4000, status: 'Active',   feeStatus: 'Paid',    parent: 'Imran Khan',     wa: '+92 333 9988776', avatar: null },
    { id: 'STU-1045', name: 'Zainab Ali',     cls: 'Class 6-A',  fee: 2800, status: 'Active',   feeStatus: 'Overdue', parent: 'Ali Hassan',     wa: '+92 321 4567890', avatar: null },
    { id: 'STU-1046', name: 'Bilal Sheikh',   cls: 'Class 8-B',  fee: 3200, status: 'Inactive', feeStatus: 'Overdue', parent: 'Sheikh Tariq',   wa: '+92 345 1122334', avatar: null },
    { id: 'STU-1047', name: 'Ayesha Noor',    cls: 'Class 9-A',  fee: 3500, status: 'Active',   feeStatus: 'Paid',    parent: 'Noor ul Haq',    wa: '+92 300 5566778', avatar: null },
    { id: 'STU-1048', name: 'Hamza Yousaf',   cls: 'Class 7-A',  fee: 3000, status: 'Active',   feeStatus: 'Pending', parent: 'Yousaf Ali',     wa: '+92 302 6677889', avatar: null },
    { id: 'STU-1049', name: 'Mariam Iqbal',   cls: 'Class 10-B', fee: 4000, status: 'Active',   feeStatus: 'Paid',    parent: 'Iqbal Ahmed',    wa: '+92 311 2233445', avatar: null },
    { id: 'STU-1050', name: 'Saad Mahmood',   cls: 'Class 8-A',  fee: 3200, status: 'Active',   feeStatus: 'Pending', parent: 'Mahmood Hussain',wa: '+92 322 3344556', avatar: null },
    { id: 'STU-1051', name: 'Hira Aslam',     cls: 'Class 6-B',  fee: 2800, status: 'Active',   feeStatus: 'Paid',    parent: 'Aslam Pervez',   wa: '+92 334 4455667', avatar: null },
    { id: 'STU-1052', name: 'Talha Javed',    cls: 'Class 9-B',  fee: 3500, status: 'Active',   feeStatus: 'Overdue', parent: 'Javed Akhtar',   wa: '+92 300 5544332', avatar: null },
    { id: 'STU-1053', name: 'Komal Riaz',     cls: 'Class 7-B',  fee: 3000, status: 'Active',   feeStatus: 'Paid',    parent: 'Riaz Ahmed',     wa: '+92 301 9988771', avatar: null },
  ];

  // monthly collection (expected vs received), in thousands of Rs
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthly = [
    { m: 'Jan', expected: 412, received: 388 },
    { m: 'Feb', expected: 415, received: 401 },
    { m: 'Mar', expected: 418, received: 360 },
    { m: 'Apr', expected: 420, received: 408 },
    { m: 'May', expected: 422, received: 395 },
    { m: 'Jun', expected: 425, received: 372 },
    { m: 'Jul', expected: 428, received: 351 },
    { m: 'Aug', expected: 430, received: 412 },
    { m: 'Sep', expected: 432, received: 420 },
    { m: 'Oct', expected: 435, received: 398 },
    { m: 'Nov', expected: 438, received: 416 },
    { m: 'Dec', expected: 440, received: 405 },
  ];

  const yearly = [
    { y: '2021', revenue: 3.9 },
    { y: '2022', revenue: 4.3 },
    { y: '2023', revenue: 4.6 },
    { y: '2024', revenue: 4.9 },
    { y: '2025', revenue: 5.2 },
  ];

  const transactions = [
    { id: 'TXN-9F2A7C', student: 'Ahmed Raza',  cls: 'Class 9-A',  amount: 3500, month: 'July 2025', date: '12 Jul 2025', method: 'Bank Transfer', status: 'Verified' },
    { id: 'TXN-3B81D2', student: 'Usman Khan',  cls: 'Class 10-A', amount: 4000, month: 'July 2025', date: '11 Jul 2025', method: 'JazzCash',      status: 'Verified' },
    { id: 'TXN-7E44A9', student: 'Ayesha Noor', cls: 'Class 9-A',  amount: 3500, month: 'July 2025', date: '10 Jul 2025', method: 'EasyPaisa',     status: 'Verified' },
    { id: 'TXN-1C09F5', student: 'Mariam Iqbal',cls: 'Class 10-B', amount: 4000, month: 'July 2025', date: '09 Jul 2025', method: 'Bank Transfer', status: 'Pending' },
    { id: 'TXN-5A6E33', student: 'Hira Aslam',  cls: 'Class 6-B',  amount: 2800, month: 'July 2025', date: '08 Jul 2025', method: 'Cash',          status: 'Verified' },
  ];

  const pending = students.filter((s) => s.feeStatus !== 'Paid');

  const reminders = [
    { name: 'Zainab Ali',   cls: 'Class 6-A', amount: 2800, sent: '2 days ago',  channel: 'WhatsApp', status: 'Delivered' },
    { name: 'Bilal Sheikh', cls: 'Class 8-B', amount: 3200, sent: '2 days ago',  channel: 'WhatsApp', status: 'Read' },
    { name: 'Talha Javed',  cls: 'Class 9-B', amount: 3500, sent: '5 days ago',  channel: 'WhatsApp', status: 'Delivered' },
    { name: 'Fatima Bibi',  cls: 'Class 7-B', amount: 3000, sent: '6 days ago',  channel: 'WhatsApp', status: 'Failed' },
  ];

  const notifications = [
    { type: 'success', title: 'New fee received', body: 'Ahmed Raza paid Rs 3,500 for July via Bank Transfer.', time: '12 min ago' },
    { type: 'warning', title: 'Payment pending',  body: 'Hamza Yousaf has not paid the July fee of Rs 3,000.',   time: '1 hour ago' },
    { type: 'info',    title: 'Reminder sent',     body: 'WhatsApp reminder delivered to 14 parents.',           time: '3 hours ago' },
    { type: 'success', title: 'New fee received', body: 'Usman Khan paid Rs 4,000 for July via JazzCash.',       time: '5 hours ago' },
    { type: 'danger',  title: 'Fee overdue',       body: 'Zainab Ali is 12 days overdue for the July fee.',       time: 'Yesterday' },
  ];

  const stats = {
    totalStudents: 1284,
    expected: 428000,
    collected: 351000,
    pending: 77000,
    rate: 82,
  };

  window.DATA = { students, months, monthly, yearly, transactions, pending, reminders, notifications, stats };
  window.fmtRs = (n) => 'Rs ' + n.toLocaleString('en-PK');
  window.fmtK = (n) => 'Rs ' + (n / 1000).toFixed(0) + 'k';
})();
