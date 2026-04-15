// ── NAVBAR HTML ──
function renderNav(){
  document.getElementById('navbar').innerHTML=`
<nav class="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="../index.html" class="nav-logo">
        <div class="nav-logo-icon">PC</div>
        <span class="nav-logo-text">Paisa<span>Clarity</span></span>
      </a>
      <div class="nav-links" id="navLinks">
        <a href="../pages/payslip.html">Payslip Scanner</a>
        <a href="../pages/emi.html">EMI Truth</a>
        <a href="../pages/itr.html">ITR Saathi</a>
        <a href="../pages/invest.html">Investments</a>
        <a href="../pages/ask.html">Ask AI</a>
        <a href="../pages/pricing.html">Pricing</a>
      </div>
      <div class="nav-cta">
        <a href="../pages/pricing.html" class="btn btn-outline btn-sm">Go Pro ₹299</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>`;
}

// ── FOOTER HTML ──
function renderFooter(){
  document.getElementById('footer').innerHTML=`
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo-icon">PC</div>
        <span class="footer-logo-text">Paisa<span>Clarity</span></span>
        <p>India's most trusted financial clarity platform. Understand your salary, loans, and taxes — in plain language.</p>
      </div>
      <div class="footer-col">
        <h5>Payslip Tools</h5>
        <a href="../pages/payslip.html">Payslip Explainer</a>
        <a href="../pages/payslip.html#hra">HRA Calculator</a>
        <a href="../pages/payslip.html#pf">PF Calculator</a>
        <a href="../pages/payslip.html#takehome">Take-Home Salary</a>
        <a href="../pages/payslip.html#regime">New vs Old Regime</a>
      </div>
      <div class="footer-col">
        <h5>EMI & Loans</h5>
        <a href="../pages/emi.html">EMI Calculator</a>
        <a href="../pages/emi.html#compare">Lender Comparison</a>
        <a href="../pages/emi.html#prepay">Prepayment Planner</a>
        <a href="../pages/emi.html#eligibility">Loan Eligibility</a>
        <a href="../pages/emi.html#guides">Loan Guides</a>
      </div>
      <div class="footer-col">
        <h5>ITR & Taxes</h5>
        <a href="../pages/itr.html">Which ITR Form?</a>
        <a href="../pages/itr.html#80c">80C Deductions</a>
        <a href="../pages/itr.html#refund">Refund Estimator</a>
        <a href="../pages/itr.html#capital">Capital Gains</a>
        <a href="../pages/itr.html#freelancer">Freelancer Taxes</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 PaisaClarity. For educational purposes only. Not financial advice.</p>
      <p>🇮🇳 Made for India</p>
    </div>
  </div>
</footer>
<button id="scrollTop" title="Back to top">↑</button>`;
}

// ── ROOT-RELATIVE NAVBAR (for index.html) ──
function renderNavRoot(){
  document.getElementById('navbar').innerHTML=`
<nav class="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-icon">PC</div>
        <span class="nav-logo-text">Paisa<span>Clarity</span></span>
      </a>
      <div class="nav-links" id="navLinks">
        <a href="pages/payslip.html">Payslip Scanner</a>
        <a href="pages/emi.html">EMI Truth</a>
        <a href="pages/itr.html">ITR Saathi</a>
        <a href="pages/invest.html">Investments</a>
        <a href="pages/ask.html">Ask AI</a>
        <a href="pages/pricing.html">Pricing</a>
      </div>
      <div class="nav-cta">
        <a href="pages/pricing.html" class="btn btn-outline btn-sm">Go Pro ₹299</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>`;
}

function renderFooterRoot(){
  document.getElementById('footer').innerHTML=`
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo-icon">PC</div>
        <span class="footer-logo-text">Paisa<span>Clarity</span></span>
        <p>India's most trusted financial clarity platform. Understand your salary, loans, and taxes — in plain language.</p>
      </div>
      <div class="footer-col">
        <h5>Payslip Tools</h5>
        <a href="pages/payslip.html">Payslip Explainer</a>
        <a href="pages/payslip.html#hra">HRA Calculator</a>
        <a href="pages/payslip.html#pf">PF Calculator</a>
        <a href="pages/payslip.html#takehome">Take-Home Salary</a>
        <a href="pages/payslip.html#regime">New vs Old Regime</a>
      </div>
      <div class="footer-col">
        <h5>EMI & Loans</h5>
        <a href="pages/emi.html">EMI Calculator</a>
        <a href="pages/emi.html#compare">Lender Comparison</a>
        <a href="pages/emi.html#prepay">Prepayment Planner</a>
        <a href="pages/emi.html#eligibility">Loan Eligibility</a>
        <a href="pages/emi.html#guides">Loan Guides</a>
      </div>
      <div class="footer-col">
        <h5>ITR & Taxes</h5>
        <a href="pages/itr.html">Which ITR Form?</a>
        <a href="pages/itr.html#80c">80C Deductions</a>
        <a href="pages/itr.html#refund">Refund Estimator</a>
        <a href="pages/itr.html#capital">Capital Gains</a>
        <a href="pages/itr.html#freelancer">Freelancer Taxes</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 PaisaClarity. For educational purposes only. Not financial advice.</p>
      <p>🇮🇳 Made for India</p>
    </div>
  </div>
</footer>
<button id="scrollTop" title="Back to top">↑</button>`;
}
