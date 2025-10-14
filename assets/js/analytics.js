// Simple local analytics tracker (to integrate with Firebase later)
(function () {
  const analyticsKey = "techAI_visits";
  const currentPage = window.location.pathname;
  const visits = JSON.parse(localStorage.getItem(analyticsKey)) || {};

  if (!visits[currentPage]) {
    visits[currentPage] = 0;
  }

  visits[currentPage] += 1;
  localStorage.setItem(analyticsKey, JSON.stringify(visits));

  console.log(`📊 Page "${currentPage}" viewed ${visits[currentPage]} times.`);
})();
