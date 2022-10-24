import time

from selenium import webdriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.common.action_chains import ActionChains

from bs4 import BeautifulSoup

from random import *
from pathlib import Path
    
from ArraySAP import ArraySAP

def open_exam(driver, pageno):
    exam_url = 'http://webcache.googleusercontent.com/search?q=cache:' + \
                'https://www.examtopics.com/exams/amazon/aws-certified-solutions-architect-professional/view/' + str(pageno) + '/'
    # discuss_url = 'https://www.examtopics.com/ajax/discussion/load-complete/?discussion-id=35981'
    page = driver.get(exam_url)
    time.sleep(randint(1, 10))
    return

def remove_element(driver, pageno):
    driver.execute_script("return document.getElementsByClassName('btn btn-success')[0].setAttribute('href','exam/aws/SAP/SAP-P" + str(pageno - 1) + ".html');")
    driver.execute_script("return document.getElementsByClassName('btn btn-success pull-right')[0].setAttribute('href','exam/aws/SAP/SAP-P" + str(pageno + 1) + ".html');")
    for i in range(10):
        driver.execute_script("return document.getElementsByClassName('btn btn-secondary question-discussion-button d-print-none')[" + str(i) + "].setAttribute('href','exam/aws/SAP/SAP-Q" + ('%03d' % ((pageno-1)*10 + i + 1)) + ".html');")

    driver.execute_script("""
        function getElementByXpath(path) {
            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }
        function removeElement(element) {
            if (element !== undefined) {
                element.remove();
            }
        }
        removeElement(document.getElementById('bN015htcoyT__google-cache-hdr'));
        removeElement(getElementByXpath("/html/head/style"));
        removeElement(document.getElementsByClassName('full-width-header')[0]);
        removeElement(document.getElementById('rs-footer'));
        getElementByXpath("/html/head/base").setAttribute('href','https://changwhaj.github.io/assets/');
        getElementByXpath("/html").removeAttribute("class");
        // document.getElementsByClassName('btn btn-success')[0].setAttribute('href','/exam/AWS/SAP/SAP-P1.html');
        // document.getElementsByClassName('btn btn-success pull-right')[0].setAttribute('href','/exam/AWS/SAP/SAP-P3.html');

        removeElement(document.getElementsByClassName('exam-view-header')[0]);
        removeElement(document.getElementsByClassName('row')[0]);
        // removeElement(document.getElementsByClassName('page-navigation-bar')[0]);
        removeElement(document.getElementById('engagement-modal'));
        removeElement(document.getElementsByClassName('modal-backdrop show')[1]);
        removeElement(document.getElementsByClassName('modal-backdrop show')[0]);

        return;
    """)

def save_html(driver, fname):
    html = driver.page_source
    bs = BeautifulSoup(html, 'html.parser')
    print(fname)
    with open(fname, "w", encoding='utf-8') as file:
        file.write(str(bs))

if __name__ == "__main__":
    driver = webdriver.Chrome('c:/temp/chromedriver.exe')

    for i in range(83)[82:83]:
        pageno = i + 1
        fname = 'SAP/page/SAP-P' + str(pageno) + '.html'
        print(fname)

        my_file = Path(fname)
        if my_file.is_file():
            # file exists
            continue

        try:
            open_exam(driver, pageno)
            driver.switch_to.window(driver.window_handles[0])
            print(driver.title)
            if (driver.title == 'Error 404 (Not Found)!!1'):
                with open(fname, "w", encoding='utf-8') as file:
                    file.write('Error 404 (Not Found)')
                continue

            remove_element(driver, pageno)

        except:
            time.sleep(randint(1, 20))
            pass

        finally:
            save_html(driver, fname)
        
    driver.quit()
