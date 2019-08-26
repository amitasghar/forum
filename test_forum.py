# Unit testing with pytest
# Functional test suite created in Postman

from forum import echo

def test_echo_word():
    testword = "hi"
    word = echo(testword)
    assert word[0] == {'msg': testword}
    assert word[1] == 200

def test_echo_symbols():
    testword = "hi#$_ 2*&JDS<)("
    word = echo(testword)
    assert word[0] == {'msg': testword}
    assert word[1] == 200

def test_echo_empty():
    word = echo("")
    assert word[0] == {'msg': ''}