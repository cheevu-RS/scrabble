# Imports
import pprint
import json
import sys
import time
from string import ascii_uppercase

# Creating a pretty printer
pp = pprint.PrettyPrinter(indent = 4)

# Reading the file
wordFile = open("ScrabbleWords.txt", "r")
data = wordFile.read()

# Splitting them into sentences and discarding the first
words = data.splitlines()
words = words[2:]
size = len(words)
print("Number of words is ", size)

# Creating a helper function to create a node for the trie
def createNode():
    node = {}

    for letter in ascii_uppercase:
        node[letter] = {}
    
    node["isWord"] = False
    return node

# Splitting the words by their first alphabet
newWords = {}
for letter in ascii_uppercase:
    newWords[letter] = []

for word in words:
    letter = word[0]
    newWords[letter].append(word)

for letter in ascii_uppercase:
    print("Number of words for letter " + letter + " is ", len(newWords[letter]))

# Saving starting time
startTime = time.time()

# Iterating through the words and inserting them in the trie
for startLetter in ascii_uppercase:
    # Creating the trie
    trie = createNode()

    for index, word in enumerate(newWords[startLetter]):
        subRoot = trie     
        for letter in word:
            # If subroot is empty
            if(not bool(subRoot[letter])):
                subRoot[letter] = createNode()
    
            # Traversing to the next letter's node
            subRoot = subRoot[letter]
        
        # Marking it as a word
        subRoot["isWord"] = True
   
    # Converting to a json and saving to trie.json
    print("Created trie for letter ", startLetter)
    trieString = json.dumps(trie)
    trieFile = open("./Trie/trie_" + startLetter + ".json", "w")
    trieFile.write(trieString)
    del trie, trieString
 
# Saving end time
endTime = time.time()
print("Time elapsed : ", endTime - startTime)


