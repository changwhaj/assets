// questions.js

// Define the associative array for question details
var questionDetails = {
    'CISM-Q': { qLength: 1016, qDirectory: 'isaca/CISM' },
    'CISA-Q': { qLength: 1188, qDirectory: 'isaca/CISA' },

    'ANS-Q': { qLength: 167, qDirectory: 'aws/ANS_C01' },
    'DAS-Q': { qLength: 164, qDirectory: 'aws/DAS_C01' },
    'DBS-Q': { qLength: 327, qDirectory: 'aws/DBS' },
    'DVA-Q': { qLength: 443, qDirectory: 'aws/DVA' },
    'DVA2-Q': { qLength: 254, qDirectory: 'aws/DVA_C02' },
    'DOP2-Q': { qLength: 137, qDirectory: 'aws/DOP_C02' },
    'SAA2-Q': { qLength: 822, qDirectory: 'aws/SAA_C02' },
    'SAA3-Q': { qLength: 669, qDirectory: 'aws/SAA_C03' },
    'SAP-Q': { qLength: 1019, qDirectory: 'aws/SAP' },
    'SAP2-Q': { qLength: 410, qDirectory: 'aws/SAP_C02' },
    'SOA2-Q': { qLength: 379, qDirectory: 'aws/SOA_C02' },
    'MLS-Q': { qLength: 0, qDirectory: 'aws/MLS_C01' },
    'SES-Q': { qLength: 0, qDirectory: 'aws/SES' },
    'DOP-Q': { qLength: 0, qDirectory: 'aws/DOP_C01' },
};

function getQuestionLength(questionName) {
    return questionDetails[questionName].qLength;
}

// Function to extract the current page number from the URL
function getCurrentPageNumber(pageName) {
    var pageArr = pageName.match(/.+-Q(\d+)\.html/)
    var pageNumber = (pageArr && parseInt(pageArr[1])) || 1
    return pageNumber;
}

function getCurrentPagePrefix(pageName) {
    var pageArr = pageName.match(/(.+-Q)\d+\.html/)
    var pagePrefix = (pageArr && pageArr[1]) || '';
    return pagePrefix;
}

var pathSegments = window.location.pathname.split("/");
var curPageName = pathSegments.pop();
var curPageDir = pathSegments.join("/");

var curPageNo = getCurrentPageNumber(curPageName);
var pagePrefix = getCurrentPagePrefix(curPageName);
var totalPages = getQuestionLength(pagePrefix);

var prevPageNo = curPageNo - 1;
var nextPageNo = curPageNo + 1;

var prevLink = document.getElementById('prevLink');
var pageSelect = document.getElementById('pageSelect');
var nextLink = document.getElementById('nextLink');
var pageInfo = document.getElementById('page-indicator');

if (prevPageNo >= 1) {
    prevLink.href = curPageDir + "/" + pagePrefix + prevPageNo.toString().padStart(4, '0') + '.html';
} else {
    prevLink.style.display = 'none';
}

if (nextPageNo <= totalPages) {
    nextLink.href = curPageDir + "/" + pagePrefix + nextPageNo.toString().padStart(4, '0') + '.html';
} else {
    nextLink.style.display = 'none';
}

// Display current page number and total page count
pageInfo.textContent = 'Q# ' + curPageNo + ' of ' + totalPages;

// Dynamically populate the page selection dropdown
for (var i = 1; i <= totalPages; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    pageSelect.appendChild(option);
}

// Set the default selected option
pageSelect.value = curPageNo;

// Event listener for page selection
pageSelect.addEventListener('change', function() {
    var selectedPage = parseInt(this.value);
    window.location.href = curPageDir + "/" + pagePrefix + selectedPage.toString().padStart(4, '0') + '.html';
});
