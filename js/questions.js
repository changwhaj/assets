// questions.js

// Define the associative array for question details
var questionDetails = {
    'CISM-Q': { qLength: 1041, qDirectory: 'isaca/CISM' },
    'CISA-Q': { qLength: 1390, qDirectory: 'isaca/CISA' },

    'ANS-Q': { qLength: 167, qDirectory: 'aws/ANS_C01' },
    'CLF2-Q': { qLength: 377, qDirectory: 'aws/CLF_C02' },
    'DAS-Q': { qLength: 164, qDirectory: 'aws/DAS_C01' },
    'DBS-Q': { qLength: 347, qDirectory: 'aws/DBS' },
    'DVA2-Q': { qLength: 254, qDirectory: 'aws/DVA_C02' },
    'DOP2-Q': { qLength: 208, qDirectory: 'aws/DOP_C02' },
    'MLS-Q': { qLength: 287, qDirectory: 'aws/MLS_C01' },
    'SCS2-Q': { qLength: 115, qDirectory: 'aws/SCS_C02' },
    'SAA3-Q': { qLength: 798, qDirectory: 'aws/SAA_C03' },
    'SAP2-Q': { qLength: 442, qDirectory: 'aws/SAP_C02' },
    'SOA2-Q': { qLength: 420, qDirectory: 'aws/SOA_C02' },

    'DVA-Q': { qLength: 443, qDirectory: 'aws/DVA' },
    'SAA2-Q': { qLength: 822, qDirectory: 'aws/SAA_C02' },
    'SAP-Q': { qLength: 1019, qDirectory: 'aws/SAP' },

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
