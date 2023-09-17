// questions.js

// Define the associative array for question details
var questionDetails = {
    'CISM-Q': { qLength: 913, qDirectory: 'isaca/CISM' },
    'CISA-Q': { qLength: 1188, qDirectory: 'isaca/CISA' },

    'ANS-Q': { qLength: 167, qDirectory: 'aws/ANS_C01' },
    'DAS-Q': { qLength: 164, qDirectory: 'aws/DAS_C01' },
    'DBS-Q': { qLength: 327, qDirectory: 'aws/DBS' },
    'DVA-Q': { qLength: 443, qDirectory: 'aws/DVA' },
    'DVA2-Q': { qLength: 142, qDirectory: 'aws/DVA_C02' },
    'DOP2-Q': { qLength: 137, qDirectory: 'aws/DOP_C02' },
    'SAA2-Q': { qLength: 822, qDirectory: 'aws/SAA_C02' },
    'SAA3-Q': { qLength: 599, qDirectory: 'aws/SAA_C03' },
    'SAP-Q': { qLength: 1019, qDirectory: 'aws/SAP' },
    'SAP2-Q': { qLength: 298, qDirectory: 'aws/SAP_C02' },
    'SOA2-Q': { qLength: 379, qDirectory: 'aws/SOA_C02' },
    'MLS-Q': { qLength: 0, qDirectory: 'aws/MLS_C01' },
    'SES-Q': { qLength: 0, qDirectory: 'aws/SES' },
    'DOP-Q': { qLength: 0, qDirectory: 'aws/DOP_C01' },
};

function getQuestionLength(questionName) {
    return questionDetails[questionName].qLength;
}

function getCurrentPageName() {
    var currentPagePath = window.location.pathname; // Get the current page's path
    var pageName = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1); // Extract the page name
    return pageName;
}

// Function to extract the current page number from the URL
function getCurrentPageNumber(pageName) {
    var pageArr = pageName.match(/.+-Q(\d+)\.html/)
    var pageNumber = (pageArr && parseInt(pageArr[1])) || 1
    return pageNumber;
}

function getCurrentPageDir(pageName) {
    var currentPagePath = window.location.pathname; // Get the current page's path
    var pathArr = currentPagePath.replace(pageName, '').match(/((\/[^/]+){4}\/$)/)
    var pageDirectory = (pathArr && pathArr[1]) || '/';
    return pageDirectory;
}

function getCurrentPagePrefix(pageName) {
    var pageArr = pageName.match(/(.+-Q)\d+\.html/)
    var pagePrefix = (pageArr && pageArr[1]) || '';
    // var pagePrefix = pageName.match(/(.+-Q)\d+\.html/)[1];
    return pagePrefix;
}
