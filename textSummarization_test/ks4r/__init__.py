#useless
from ks4r import Summarizer
import sys

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import os
import random
import math
import copy
import gc
from tqdm import tqdm
from glob import glob
from konlpy.tag import Mecab

import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader

import warnings
warnings.filterwarnings(action='ignore')

summarizer = Summarizer(k=3
                      , useful_tags=['Noun', 'Verb', 'Adjective', 'Determiner', 'Adverb', 'Conjunction', 'Josa', 'PreEomi', 'Eomi', 'Suffix', 'Alpha', 'Number']
                      , stopwords=None
	          , delimiter='\.|\\n|\.\\n|\!'
                      , spell_check=True
                      , return_all=False)
# summarizer = Summarizer(text)   #여러 리뷰들을 하나의 String으로 만들어 넣으시면 됩니다.
# k=3 #반환할 요약 문장의 갯수 입니다
# useful_tags=['Noun', 'Verb', 'Adjective', 'Determiner', 'Adverb', 'Conjunction', 'Josa', 'PreEomi', 'Eomi', 'Suffix', 'Alpha', 'Number'] #가중치 계산에 사용할 형태소입니다.
# stopwords=stopwords #리뷰 분석에 불필요한 불용어 목록입니다. 리뷰에 맞추어 list형식으로 만들어 적용하시면 됩니다. 기본은 쇼핑몰 리뷰에 맞추어져있습니다.
# delimiter='\.|\\n|\.\\n|\!' #문장 구분자를 입력합니다.
# spell_check=True #네이버 맞춤법 검사기를 사용합니다. 성능이 좋아지지만 시간이 오래걸립니다.
# return_all=False #True인 경우 k에 상관없이 들어간 모든 리뷰의 문장들을 pagerank score가 높은순으로 반환합니다.

# ------
# [테스트]
# DIR = "./data"
# TEST_SOURCE = os.path.join(DIR, "test.json")

# with open(TEST_SOURCE) as f:
#     TEST_DATA = json.loads(f.read())

# text = ''

# test = pd.DataFrame(columns=['uid', 'title', 'region', 'context'])
# for i, data in enumerate(TEST_DATA):
#     if i == 1: break
#     for agenda in data['context'].keys():
#         for line in data['context'][agenda]:
#             text += data['context'][agenda][line] + ' '
# # print(text.rstrip())

# summary = summarizer.summarize(text.rstrip())
# for index, line in enumerate(summary):
#     print(str(index+1) + '. ' + line + '.')

# ------
# [with stt]
def summarization(content):
  summary = summarizer.summarize(content)
  for index, line in enumerate(summary):
    print(str(index+1) + '. ' + line + '.')

if __name__ == '__main__':
  summarization(sys.argv[1])