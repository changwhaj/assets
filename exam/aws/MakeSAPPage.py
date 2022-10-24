import time

from selenium import webdriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.common.action_chains import ActionChains

from bs4 import BeautifulSoup

from random import *
from pathlib import Path

QID = "SAP"
QUESTIONS_PER_PAGE = 10
QUESTIONS_TOTAL = 946
PAGE_COUNTS = round(QUESTIONS_TOTAL / QUESTIONS_PER_PAGE + 0.5)

def set_chrome_driver():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
    driver = webdriver.Chrome('c:/temp/chromedriver.exe', options=chrome_options)
    # driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    return driver

def sleepsec(maxsec):
    sec = randint(1, maxsec)
    for i in range(sec):
        print("%3d\r\r\r" % (sec-i), end='')
        time.sleep(1)
    print("")    

def open_exam_cache(driver, pageno):
    exam_url = 'http://webcache.googleusercontent.com/search?q=cache:' + \
               'https://www.examtopics.com/exams/amazon/aws-certified-solutions-architect-professional/view/' + str(pageno) + '/'
    page = driver.get(exam_url)
    sleepsec(10)

    bs = BeautifulSoup(driver.page_source, 'html.parser')
    div_questions = bs.find_all("div", {"class": "card exam-question-card"})
    while (len(div_questions) <= 0):
        print("Waiting...")
        sleepsec(5)
        bs = BeautifulSoup(driver.page_source, 'html.parser')
        div_questions = bs.find_all("div", {"class": "card exam-question-card"})
        if (driver.title == 'Error 404 (Not Found)!!1'):
            break
        if (driver.title == 'ExamTopics - Authentication Required'):
            break

    if (len(div_questions) < QUESTIONS_PER_PAGE):
        return # open_exam_site(driver, pageno)

    return

def open_exam_site(driver, pageno):
    exam_url = 'https://www.examtopics.com/exams/amazon/aws-certified-solutions-architect-professional/view/' + str(pageno) + '/'
    # discuss_url = 'https://www.examtopics.com/ajax/discussion/load-complete/?discussion-id=35981'
    page = driver.get(exam_url)
    sleepsec(10)

    bs = BeautifulSoup(driver.page_source, 'html.parser')
    div_questions = bs.find_all("div", {"class": "card exam-question-card"})
    while (len(div_questions) <= 0):
        print("Waiting...")
        sleepsec(5)
        bs = BeautifulSoup(driver.page_source, 'html.parser')
        div_questions = bs.find_all("div", {"class": "card exam-question-card"})
        if (driver.title == 'Error 404 (Not Found)!!1'):
            break
        if (driver.title == 'ExamTopics - Authentication Required'):
            break

    return

def remove_element(driver, pageno):
    try:
        driver.execute_script("return document.getElementsByClassName('btn btn-success')[0].setAttribute('href','exam/aws/" + QID + "/page/" + QID + "-P" + str(pageno - 1) + ".html');")
    except:
        pass
    try:
        driver.execute_script("return document.getElementsByClassName('btn btn-success pull-right')[0].setAttribute('href','exam/aws/" + QID + "/page/" + QID + "-P" + str(pageno + 1) + ".html');")
    except:
        pass

    bs = BeautifulSoup(driver.page_source, 'html.parser')
    div_questions = bs.find_all("div", {"class": "card exam-question-card"})
    for i in range(len(div_questions)):
        driver.execute_script("return document.getElementsByClassName('btn btn-secondary question-discussion-button d-print-none')[" + str(i) + "].setAttribute('href','exam/aws/" + QID + "/" + QID + "-Q" + ('%03d' % ((pageno-1)*QUESTIONS_PER_PAGE + i + 1)) + ".html');")

    driver.execute_script("""
        function getElementByXpath(path) {
            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }
        function removeElement(element) {
            if (element !== undefined) {
                element.remove();
            }
        }
        function removeElemAttr(element, attr) {
            if (element !== undefined && element !== null) {
                element.removeAttribute(attr);
            }
        }
        try {
            removeElement(document.getElementById('bN015htcoyT__google-cache-hdr'));
        } catch(err) {
            console.log(err);
        }
        try {
            removeElement(getElementByXpath("/html/head/style"));
            removeElement(document.getElementsByClassName('full-width-header')[0]);
            removeElement(document.getElementsByClassName('exam-view-header')[0]);
            removeElement(document.getElementsByClassName('row')[0]);
            removeElement(document.getElementById('rs-footer'));
            getElementByXpath("/html/head/base").setAttribute('href','https://changwhaj.github.io/assets/');
            getElementByXpath("/html").removeAttribute("class");
        } catch(err) {
            console.log(err);
        }

        // removeElement(document.getElementsByClassName('page-navigation-bar')[0]);
        removeElement(document.getElementById('engagement-modal'));
        removeElement(document.getElementsByClassName('modal-backdrop show')[1]);
        removeElement(document.getElementsByClassName('modal-backdrop show')[0]);
        getElementByXpath("/html/body/base").removeAttribute("href");
        return;
    """)

def save_html(driver, fname):
    html = driver.page_source
    bs = BeautifulSoup(html, 'html.parser')
    nav_page = """<div class="col-12">
<div class="page-navigation-line">
<script type="text/javascript">
var row = "";
var div = document.getElementsByClassName('page-navigation-line')[0]
for (var i = 1; i <= """ + str(PAGE_COUNTS) + """; i++) {
    row = row + "<a class='btn-success' href='exam/aws/""" + str(QID) + """/page/""" + str(QID) + """-P" + i + ".html'><i class='fa'></i> " + i + "</a> "
}
div.innerHTML = row 
</script>
</div>"""

    with open(fname, "w", encoding='utf-8') as file:
        file.write('<!DOCTYPE html>\n' + str(bs).replace('<div class="col-12">', nav_page))

if __name__ == "__main__":
    #driver = webdriver.Chrome('c:/temp/chromedriver.exe')
    driver = set_chrome_driver()

    for i in range(PAGE_COUNTS)[:]:
        pageno = i + 1
        fname = QID + '/page/' + QID + '-P' + str(pageno) + '.html'
        print(fname)

        my_file = Path(fname)
        if my_file.is_file():
            # file exists
            continue

        try:
            open_exam_cache(driver, pageno)
            driver.switch_to.window(driver.window_handles[0])
            if (driver.title == 'Error 404 (Not Found)!!1'):
                open_exam_site(driver, pageno)
                driver.switch_to.window(driver.window_handles[0])

            print(driver.title)
            if (driver.title == 'Error 404 (Not Found)!!1'):
                with open(fname, "w", encoding='utf-8') as file:
                    file.write('Error 404 (Not Found)')
                continue
            if (driver.title == 'ExamTopics - Authentication Required'):
                with open(fname, "w", encoding='utf-8') as file:
                    file.write('Error 404 (Not Found)')
                continue

            remove_element(driver, pageno)

        except:
            pass

        finally:
            if (driver.title != 'ExamTopics - Authentication Required'):
                save_html(driver, fname)
        
    driver.quit()
