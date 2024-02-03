import pytest

from base import accessData
from base import saveData
from base import doComputation

def testSaveData():
    result = saveData("input")
    assert(result == True)

def testAccessData():
    result = accessData("input")
    assert(result == "test")

def testDoComputation():
    result = doComputation("input1", "input2")
    assert(result == "input1")
