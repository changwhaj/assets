import time

from selenium import webdriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.common.action_chains import ActionChains

from random import *

from bs4 import BeautifulSoup

def open_exam_page(driver, pageno):
    exam_url = 'https://webcache.googleusercontent.com/search?q=cache:' + \
               'https://www.examtopics.com/exams/amazon/aws-certified-solutions-architect-professional/view/' + str(pageno) + '/'
    exam_url = 'https://www.examtopics.com/exams/amazon/aws-certified-solutions-architect-professional/view/' + str(pageno) + '/'
    # time.sleep(1.5)
    page = driver.get(exam_url)
    time.sleep(randint(1, 10))

    bs = BeautifulSoup(driver.page_source, 'html.parser')
    div_discuss = bs.find_all("div", {"class": "questions-container"})
    while (len(div_discuss) <= 0):
        print("Waiting...")
        time.sleep(randint(1, 5))
        bs = BeautifulSoup(driver.page_source, 'html.parser')
        div_discuss = bs.find_all("div", {"class": "questions-container"})
        if (driver.title == 'Error 404 (Not Found)!!1'):
            break
    
    return

def print_discuss_url(driver, pageno):
    open_exam_page(driver, pageno)
    driver.switch_to.window(driver.window_handles[0])
    
    print(driver.title)
    
    html = driver.page_source
    bs = BeautifulSoup(html, 'html.parser')
    div_discuss = bs.find_all("a", {"class": "btn btn-secondary question-discussion-button d-print-none"})

    i = 0
    for a in div_discuss:
        i = i+1
        examno = (pageno-1)*10 + i
        href = a.attrs['href']
        print(str(examno), ":", href)

if __name__ == "__main__":

    for i in range(89)[84:]:

        driver = webdriver.Chrome('c:/temp/chromedriver.exe')
        print_discuss_url(driver, i)

        driver.quit()
